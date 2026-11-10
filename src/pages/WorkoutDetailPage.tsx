import { useState } from 'react'
import { DashboardLayout, type DashboardDestination } from '../components/layout/DashboardLayout'
import { Button } from '../components/ui/Button'
import { ExerciseCard } from '../components/ui/ExerciseCard'
import { ExerciseFormModal } from '../components/ui/ExerciseFormModal'
import { Icon } from '../components/ui/Icon'
import type { Exercise, ExerciseInput, Workout } from '../types/workout'

type WorkoutDetailPageProps = {
  workout: Workout
  workoutCount: number
  onBack: () => void
  onSettingsClick: () => void
  onNavigateDashboard: (destination: DashboardDestination) => void
  onAddExercise: (exercise: ExerciseInput) => Promise<void>
  onUpdateExercise: (exerciseId: string, exercise: ExerciseInput) => Promise<void>
  onDeleteExercise: (exerciseId: string) => Promise<void>
}

export function WorkoutDetailPage({ workout, workoutCount, onBack, onSettingsClick, onNavigateDashboard, onAddExercise, onUpdateExercise, onDeleteExercise }: WorkoutDetailPageProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const exerciseCount = workout.exercises.length
  const editingExercise: Exercise | null = editingExerciseId === null ? null : workout.exercises.find((exercise) => exercise.id === editingExerciseId) ?? null

  function openAddModal() {
    setEditingExerciseId(null)
    setError(null)
    setModalOpen(true)
  }

  function openEditModal(exercise: Exercise) {
    if (!exercise.id) {
      setError('Não foi possível identificar este exercício. Reabra o treino e tente novamente.')
      return
    }
    setEditingExerciseId(exercise.id)
    setError(null)
    setModalOpen(true)
  }

  async function saveExercise(exercise: ExerciseInput) {
    setSaving(true)
    setError(null)
    try {
      if (editingExerciseId === null) await onAddExercise(exercise)
      else await onUpdateExercise(editingExerciseId, exercise)
      setModalOpen(false)
      setEditingExerciseId(null)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Não foi possível salvar o exercício.')
      throw saveError
    } finally {
      setSaving(false)
    }
  }

  async function confirmDeleteExercise(exercise: Exercise) {
    if (!exercise.id) {
      setError('Não foi possível identificar este exercício. Reabra o treino e tente novamente.')
      return
    }
    if (!window.confirm(`Excluir o exercício "${exercise.name}"? Esta ação não pode ser desfeita.`)) return
    setError(null)
    try {
      await onDeleteExercise(exercise.id)
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Não foi possível excluir o exercício.')
    }
  }

  return (
    <DashboardLayout workoutCount={workoutCount} activeSection="workouts" onSettingsClick={onSettingsClick} onNavigateDashboard={onNavigateDashboard}>
      <main className="pt-2 sm:pt-4">
        <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"><Icon name="arrow-left" className="size-[18px]" />Voltar aos treinos</button>
        <header className="mt-7 flex flex-col justify-between gap-5 border-b border-zinc-800/80 pb-7 sm:flex-row sm:items-end">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">Detalhes do treino</p><h1 className="mt-2 break-words text-3xl font-semibold tracking-tight text-white sm:text-4xl">{workout.name}</h1><p className="mt-2 text-sm text-zinc-500">{exerciseCount} {exerciseCount === 1 ? 'exercício cadastrado' : 'exercícios cadastrados'}</p></div>
          <Button icon="plus" className="w-full sm:w-auto" onClick={openAddModal}>Adicionar exercício</Button>
        </header>
        <section aria-label="Exercícios do treino" className="mt-7">
          <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold text-zinc-100">Exercícios</h2><span className="rounded-lg border border-zinc-800 bg-zinc-900/70 px-2.5 py-1.5 text-xs tabular-nums text-zinc-500">{exerciseCount}</span></div>
          {error && <p role="alert" className="mb-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">{error}</p>}
          {exerciseCount === 0 ? <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-5 py-10 text-center"><span className="flex size-12 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-300"><Icon name="activity" className="size-6" /></span><h3 className="mt-4 text-base font-semibold text-zinc-200">Nenhum exercício por aqui</h3><p className="mt-1.5 max-w-sm text-sm leading-6 text-zinc-500">Adicione o primeiro exercício para consultar sua sequência durante o treino.</p><Button icon="plus" className="mt-5" onClick={openAddModal}>Adicionar exercício</Button></div> : <div className="grid gap-3">{workout.exercises.map((exercise, index) => <ExerciseCard key={exercise.id ?? `${workout.id}-${index}`} exercise={exercise} index={index} onEdit={() => openEditModal(exercise)} onDelete={() => void confirmDeleteExercise(exercise)} />)}</div>}
        </section>
      </main>
      {modalOpen && <ExerciseFormModal exercise={editingExercise} saving={saving} onClose={() => { setModalOpen(false); setEditingExerciseId(null) }} onSubmit={saveExercise} />}
    </DashboardLayout>
  )
}
