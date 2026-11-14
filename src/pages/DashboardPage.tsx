import { useState } from 'react'
import { DashboardLayout, type DashboardDestination } from '../components/layout/DashboardLayout'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { Icon } from '../components/ui/Icon'
import { StatCard } from '../components/ui/StatCard'
import { WorkoutCard } from '../components/ui/WorkoutCard'
import { WorkoutFormModal } from '../components/ui/WorkoutFormModal'
import { useWorkouts } from '../hooks/useWorkouts'
import { WorkoutDetailPage } from './WorkoutDetailPage'
import { SettingsPage } from './SettingsPage'
import { ExerciseLibraryPage } from './ExerciseLibraryPage'
import type { Workout } from '../types/workout'

export function DashboardPage() {
  const { workouts, loading, error, createWorkout, renameWorkout, deleteWorkout, addExercise, updateExercise, deleteExercise } = useWorkouts()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [dashboardDestination, setDashboardDestination] = useState<DashboardDestination>('overview')
  const [modalWorkout, setModalWorkout] = useState<Workout | null>(null)
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const exerciseCount = workouts.reduce((total, workout) => total + workout.exercises.length, 0)
  const selectedWorkout = workouts.find((workout) => workout.id === selectedWorkoutId)
  const libraryView = (
    <div className={libraryOpen ? '' : 'hidden'}>
      <ExerciseLibraryPage
        workouts={workouts}
        workoutsLoading={loading}
        onAddExercise={addExercise}
        onSettingsClick={openSettings}
        onNavigateDashboard={navigateToDashboard}
      />
    </div>
  )

  function navigateToDashboard(destination: DashboardDestination) {
    setSettingsOpen(false)
    setSelectedWorkoutId(null)
    if (destination === 'library') {
      setLibraryOpen(true)
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      return
    }
    setLibraryOpen(false)
    setDashboardDestination(destination)
    const targetId = destination === 'overview' ? 'inicio' : 'treinos'
    window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  function openSettings() {
    setLibraryOpen(false)
    setSelectedWorkoutId(null)
    setSettingsOpen(true)
  }

  function openCreateModal() {
    setModalWorkout(null)
    setActionError(null)
    setModalOpen(true)
  }

  function openEditModal(workout: Workout) {
    setModalWorkout(workout)
    setActionError(null)
    setModalOpen(true)
  }

  async function saveWorkout(name: string) {
    setSaving(true)
    try {
      if (modalWorkout?.id !== undefined) await renameWorkout(modalWorkout.id, name)
      else await createWorkout(name)
      setModalOpen(false)
      setModalWorkout(null)
    } catch (saveError) {
      setActionError(saveError instanceof Error ? saveError.message : 'Não foi possível salvar o treino.')
      throw saveError
    } finally {
      setSaving(false)
    }
  }

  async function confirmDelete(workout: Workout) {
    if (workout.id === undefined) return
    const confirmed = window.confirm(`Excluir o treino "${workout.name}"? Esta ação não pode ser desfeita.`)
    if (!confirmed) return
    setActionError(null)
    try {
      await deleteWorkout(workout.id)
    } catch (deleteError) {
      setActionError(deleteError instanceof Error ? deleteError.message : 'Não foi possível excluir o treino.')
    }
  }

  if (settingsOpen) return <>{libraryView}<SettingsPage workoutCount={workouts.length} onBack={() => navigateToDashboard('overview')} onSettingsClick={openSettings} onNavigateDashboard={navigateToDashboard} /></>

  if (libraryOpen) return <>{libraryView}</>

  if (selectedWorkoutId !== null && selectedWorkout) {
    return <>{libraryView}<WorkoutDetailPage
      workout={selectedWorkout}
      workoutCount={workouts.length}
      onBack={() => navigateToDashboard('workouts')}
      onSettingsClick={openSettings}
      onNavigateDashboard={navigateToDashboard}
      onAddExercise={(exercise) => selectedWorkout.id === undefined ? Promise.reject(new Error('O treino não foi encontrado.')) : addExercise(selectedWorkout.id, exercise)}
      onUpdateExercise={(exerciseId, exercise) => selectedWorkout.id === undefined ? Promise.reject(new Error('O treino não foi encontrado.')) : updateExercise(selectedWorkout.id, exerciseId, exercise)}
      onDeleteExercise={(exerciseId) => selectedWorkout.id === undefined ? Promise.reject(new Error('O treino não foi encontrado.')) : deleteExercise(selectedWorkout.id, exerciseId)}
    />
    </>
  }

  return (
    <>
    {libraryView}
    <DashboardLayout workoutCount={workouts.length} activeSection={dashboardDestination} onSettingsClick={openSettings} onNavigateDashboard={navigateToDashboard}>
      <header className="flex items-center justify-between gap-4 border-b border-zinc-800/70 pb-5 lg:hidden">
        <a href="#inicio" className="flex items-center gap-2.5"><span className="flex size-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)]"><Icon name="dumbbell" className="size-[18px]" /></span><span className="text-sm font-bold text-white">my<span className="text-[var(--accent)]">workout</span></span></a>
        <span className="flex size-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400"><Icon name="activity" className="size-5" /></span>
      </header>

      <main id="inicio" className="pt-8 sm:pt-10 lg:pt-2">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1.5 text-[11px] font-medium text-[var(--accent-hover)]"><span className="size-1.5 rounded-full bg-[var(--accent)]" />Seu espaço, seu ritmo</div>
            <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-[34px]">Meu espaço de treino</h1>
            <p className="mt-2 text-sm text-zinc-500 sm:text-[15px]">Organize seus treinos em um só lugar.</p>
          </div>
          <Button icon="plus" className="w-full sm:w-auto" onClick={openCreateModal}>Novo treino</Button>
        </div>

        <section aria-label="Estatísticas dos treinos" className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2">
          <StatCard label="Treinos criados" value={workouts.length} detail="no total" icon="dumbbell" />
          <StatCard label="Exercícios" value={exerciseCount} detail="no total" icon="activity" />
        </section>

        <section id="treinos" className="mt-10 scroll-mt-6 sm:mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-600">Sua biblioteca</p><h2 className="mt-1.5 text-xl font-semibold tracking-tight text-white">Meus treinos</h2></div>
            <span className="rounded-lg border border-zinc-800 bg-zinc-900/70 px-2.5 py-1.5 text-xs text-zinc-500">{workouts.length} {workouts.length === 1 ? 'treino' : 'treinos'}</span>
          </div>
          {actionError && <p role="alert" className="mb-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">{actionError}</p>}
          {error && <p role="alert" className="mb-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">Não foi possível carregar os treinos: {error}</p>}
          <div className="overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/65">
            {loading ? <div role="status" className="flex min-h-[300px] items-center justify-center text-sm text-zinc-500">Carregando treinos…</div> : workouts.length === 0 ? <EmptyState onCreate={openCreateModal} /> : <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">{workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} onOpen={(item) => setSelectedWorkoutId(item.id ?? null)} onEdit={openEditModal} onDelete={confirmDelete} />)}</div>}
          </div>
        </section>
        <footer className="mt-8 hidden items-center justify-between border-t border-zinc-800/60 pt-5 text-[11px] text-zinc-700 lg:flex"><span>MY WORKOUT <span className="mx-1.5">·</span> CONSISTÊNCIA EM MOVIMENTO</span><span className="flex items-center gap-1.5"><Icon name="activity" className="size-3.5 text-[var(--accent)]/70" />Um passo de cada vez</span></footer>
      </main>
      {modalOpen && <WorkoutFormModal workout={modalWorkout} saving={saving} onClose={() => { setModalOpen(false); setModalWorkout(null) }} onSubmit={saveWorkout} />}
    </DashboardLayout>
    </>
  )
}
