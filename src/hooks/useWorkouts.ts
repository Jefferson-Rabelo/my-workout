import { useEffect, useState } from 'react'
import { liveQuery } from 'dexie'
import { db } from '../database/db'
import type { Exercise, ExerciseInput, NewWorkout, Workout } from '../types/workout'

type WorkoutsState = {
  workouts: Workout[]
  loading: boolean
  error: string | null
}

function createExerciseId() {
  return globalThis.crypto.randomUUID()
}

function hasMissingOrDuplicateExerciseIds(workouts: Workout[]) {
  return workouts.some((workout) => {
    const seen = new Set<string>()
    return workout.exercises.some((exercise) => {
      if (!exercise.id || seen.has(exercise.id)) return true
      seen.add(exercise.id)
      return false
    })
  })
}

async function ensureExerciseIds(workouts: Workout[]) {
  await db.transaction('rw', db.workouts, async () => {
    for (const workout of workouts) {
      if (workout.id === undefined) continue
      const currentWorkout = await db.workouts.get(workout.id)
      if (!currentWorkout) continue

      const seen = new Set<string>()
      let changed = false
      const exercises = currentWorkout.exercises.map((exercise) => {
        if (!exercise.id || seen.has(exercise.id)) {
          changed = true
          const id = createExerciseId()
          seen.add(id)
          return { ...exercise, id }
        }
        seen.add(exercise.id)
        return exercise
      })

      if (changed) await db.workouts.update(workout.id, { exercises })
    }
  })
}

export function useWorkouts() {
  const [state, setState] = useState<WorkoutsState>({ workouts: [], loading: true, error: null })

  useEffect(() => {
    let active = true
    const subscription = liveQuery(() => db.workouts.orderBy('createdAt').reverse().toArray()).subscribe({
      next: (workouts) => {
        if (hasMissingOrDuplicateExerciseIds(workouts)) {
          void ensureExerciseIds(workouts).catch((error: unknown) => {
            if (active) setState((current) => ({
              ...current,
              loading: false,
              error: error instanceof Error ? error.message : 'Não foi possível preparar os exercícios.',
            }))
          })
          return
        }
        if (active) setState({ workouts, loading: false, error: null })
      },
      error: (error: unknown) => setState((current) => ({
        ...current,
        loading: false,
        error: error instanceof Error ? error.message : 'Não foi possível carregar os treinos.',
      })),
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  async function createWorkout(name: string) {
    const now = new Date()
    const workout: NewWorkout = { name: name.trim(), exercises: [], createdAt: now, updatedAt: now }
    return db.workouts.add(workout)
  }

  async function renameWorkout(id: number, name: string) {
    await db.workouts.update(id, { name: name.trim(), updatedAt: new Date() })
  }

  async function deleteWorkout(id: number) {
    await db.workouts.delete(id)
  }

  async function addExercise(workoutId: number, exercise: ExerciseInput) {
    await db.transaction('rw', db.workouts, async () => {
      const workout = await db.workouts.get(workoutId)
      if (!workout) throw new Error('O treino não foi encontrado.')
      const newExercise: Exercise = { ...exercise, id: createExerciseId() }
      await db.workouts.update(workoutId, {
        exercises: [...workout.exercises, newExercise],
        updatedAt: new Date(),
      })
    })
  }

  async function updateExercise(workoutId: number, exerciseId: string, exercise: ExerciseInput) {
    await db.transaction('rw', db.workouts, async () => {
      const workout = await db.workouts.get(workoutId)
      if (!workout) throw new Error('O treino não foi encontrado.')
      const exerciseIndex = workout.exercises.findIndex((item) => item.id === exerciseId)
      if (exerciseIndex < 0) throw new Error('O exercício não foi encontrado.')

      const exercises = [...workout.exercises]
      exercises[exerciseIndex] = { ...exercise, id: exerciseId }
      await db.workouts.update(workoutId, { exercises, updatedAt: new Date() })
    })
  }

  async function deleteExercise(workoutId: number, exerciseId: string) {
    await db.transaction('rw', db.workouts, async () => {
      const workout = await db.workouts.get(workoutId)
      if (!workout) throw new Error('O treino não foi encontrado.')
      const exerciseIndex = workout.exercises.findIndex((item) => item.id === exerciseId)
      if (exerciseIndex < 0) throw new Error('O exercício não foi encontrado.')

      const exercises = workout.exercises.filter((_, index) => index !== exerciseIndex)
      await db.workouts.update(workoutId, { exercises, updatedAt: new Date() })
    })
  }

  return { ...state, createWorkout, renameWorkout, deleteWorkout, addExercise, updateExercise, deleteExercise }
}
