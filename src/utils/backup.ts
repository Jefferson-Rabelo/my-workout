import { db } from '../database/db'
import type { Exercise, Workout } from '../types/workout'

export const BACKUP_APP_NAME = 'My Workout'
export const BACKUP_FORMAT_VERSION = 1
export const LAST_BACKUP_STORAGE_KEY = 'my-workout:last-backup'

export type BackupExercise = Omit<Exercise, 'reps'> & { reps: string }
export type BackupWorkout = Omit<Workout, 'createdAt' | 'updatedAt' | 'exercises'> & {
  createdAt: string
  updatedAt: string
  exercises: BackupExercise[]
}

export type WorkoutBackup = {
  appName: typeof BACKUP_APP_NAME
  formatVersion: typeof BACKUP_FORMAT_VERSION
  exportedAt: string
  workouts: BackupWorkout[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isValidDateString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '' && Number.isFinite(Date.parse(value))
}

function validateExercise(value: unknown, workoutIndex: number, exerciseIndex: number): BackupExercise {
  const label = `Treino ${workoutIndex + 1}, exercício ${exerciseIndex + 1}`
  if (!isRecord(value)) throw new Error(`${label}: os dados do exercício são inválidos.`)
  if (typeof value.name !== 'string' || !value.name.trim()) throw new Error(`${label}: informe um nome válido.`)
  if (!Number.isInteger(value.sets) || Number(value.sets) < 1) throw new Error(`${label}: séries deve ser um inteiro maior que zero.`)
  const reps = typeof value.reps === 'number' && Number.isFinite(value.reps) ? String(value.reps) : value.reps
  if (typeof reps !== 'string' || !reps.trim()) throw new Error(`${label}: repetições deve ser um texto válido.`)
  if (value.weight !== undefined && (typeof value.weight !== 'number' || !Number.isFinite(value.weight) || value.weight < 0)) {
    throw new Error(`${label}: carga deve ser um número válido maior ou igual a zero.`)
  }
  if (value.notes !== undefined && typeof value.notes !== 'string') throw new Error(`${label}: observações devem ser texto.`)
  if (value.id !== undefined && (typeof value.id !== 'string' || !value.id.trim())) throw new Error(`${label}: identificador do exercício inválido.`)

  return {
    ...(typeof value.id === 'string' ? { id: value.id } : {}),
    name: value.name.trim(),
    sets: Number(value.sets),
    reps: reps.trim(),
    ...(typeof value.weight === 'number' ? { weight: value.weight } : {}),
    ...(typeof value.notes === 'string' && value.notes.trim() ? { notes: value.notes.trim() } : {}),
  }
}

function validateWorkout(value: unknown, index: number, usedIds: Set<number>): BackupWorkout {
  const label = `Treino ${index + 1}`
  if (!isRecord(value)) throw new Error(`${label}: os dados do treino são inválidos.`)
  if (value.id !== undefined) {
    if (!Number.isInteger(value.id) || Number(value.id) < 1 || usedIds.has(Number(value.id))) {
      throw new Error(`${label}: identificador inválido ou duplicado.`)
    }
    usedIds.add(Number(value.id))
  }
  if (typeof value.name !== 'string' || !value.name.trim()) throw new Error(`${label}: informe um nome válido.`)
  if (!isValidDateString(value.createdAt) || !isValidDateString(value.updatedAt)) throw new Error(`${label}: as datas de criação ou atualização são inválidas.`)
  if (!Array.isArray(value.exercises)) throw new Error(`${label}: a lista de exercícios é inválida.`)

  return {
    ...(typeof value.id === 'number' ? { id: value.id } : {}),
    name: value.name.trim(),
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
    exercises: value.exercises.map((exercise, exerciseIndex) => validateExercise(exercise, index, exerciseIndex)),
  }
}

export function parseWorkoutBackup(json: string): WorkoutBackup {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    throw new Error('O arquivo não contém um JSON válido.')
  }
  if (!isRecord(parsed)) throw new Error('Formato de backup inválido.')
  if (parsed.appName !== BACKUP_APP_NAME) throw new Error('Este arquivo não é um backup do My Workout.')
  if (parsed.formatVersion !== BACKUP_FORMAT_VERSION) throw new Error('A versão deste backup não é compatível com o aplicativo.')
  if (!isValidDateString(parsed.exportedAt)) throw new Error('A data de exportação do backup é inválida.')
  if (!Array.isArray(parsed.workouts)) throw new Error('A lista de treinos do backup é inválida.')

  const usedIds = new Set<number>()
  return {
    appName: BACKUP_APP_NAME,
    formatVersion: BACKUP_FORMAT_VERSION,
    exportedAt: parsed.exportedAt,
    workouts: parsed.workouts.map((workout, index) => validateWorkout(workout, index, usedIds)),
  }
}

export async function createWorkoutBackup(): Promise<WorkoutBackup> {
  const workouts = await db.workouts.toArray()
  return {
    appName: BACKUP_APP_NAME,
    formatVersion: BACKUP_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    workouts: workouts.map((workout) => ({
      ...(workout.id === undefined ? {} : { id: workout.id }),
      name: workout.name,
      createdAt: new Date(workout.createdAt).toISOString(),
      updatedAt: new Date(workout.updatedAt ?? workout.createdAt).toISOString(),
      exercises: workout.exercises.map((exercise) => ({
        ...(exercise.id ? { id: exercise.id } : {}),
        name: exercise.name,
        sets: exercise.sets,
        reps: String(exercise.reps),
        ...(exercise.weight === undefined ? {} : { weight: exercise.weight }),
        ...(exercise.notes ? { notes: exercise.notes } : {}),
      })),
    })),
  }
}

export async function replaceWorkoutsFromBackup(backup: WorkoutBackup): Promise<void> {
  const workouts: Workout[] = backup.workouts.map((workout) => ({
    ...(workout.id === undefined ? {} : { id: workout.id }),
    name: workout.name,
    createdAt: new Date(workout.createdAt),
    updatedAt: new Date(workout.updatedAt),
    exercises: workout.exercises.map((exercise) => ({ ...exercise })),
  }))

  await db.transaction('rw', db.workouts, async () => {
    await db.workouts.clear()
    await db.workouts.bulkAdd(workouts)
  })
}
