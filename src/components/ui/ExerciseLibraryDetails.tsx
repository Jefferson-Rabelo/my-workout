import { useEffect, useRef, useState } from 'react'
import { MUSCLE_GROUP_NAMES, type CatalogExercise } from '../../types/exerciseCatalog'
import { Icon } from './Icon'
import { WorkoutPickerModal } from './WorkoutPickerModal'
import type { ExerciseInput, Workout } from '../../types/workout'

type ExerciseLibraryDetailsProps = {
  exercise: CatalogExercise
  workouts: Workout[]
  workoutsLoading: boolean
  onAddExercise: (workoutId: number, exercise: ExerciseInput) => Promise<void>
  onClose: () => void
}

export function ExerciseLibraryDetails({ exercise, workouts, workoutsLoading, onAddExercise, onClose }: ExerciseLibraryDetailsProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeButtonRef.current?.focus()

    return () => {
      if (openerRef.current?.isConnected) openerRef.current.focus()
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (pickerOpen) return

      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return
      const dialog = dialogRef.current
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      if (focusable.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeElement = document.activeElement
      if (!dialog.contains(activeElement) || (event.shiftKey && (activeElement === first || activeElement === dialog))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (activeElement === last || activeElement === dialog)) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [pickerOpen])

  const muscleGroups = [exercise.primaryMuscleGroup, ...exercise.secondaryMuscleGroups]

  async function addToWorkout(workoutId: number) {
    await onAddExercise(workoutId, {
      name: exercise.name,
      sets: exercise.suggestedSets,
      reps: exercise.suggestedReps,
    })
    setPickerOpen(false)
    setFeedback('Exercício adicionado ao treino com sucesso.')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exercise-details-title"
        tabIndex={-1}
        className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-zinc-800 bg-[#18181b] p-5 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="inline-flex rounded-lg border border-lime-400/15 bg-lime-400/[0.07] px-2.5 py-1 text-xs font-medium text-lime-300">
              {exercise.category === 'compound' ? 'Exercício composto' : 'Exercício de isolamento'}
            </span>
            <h2 id="exercise-details-title" className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{exercise.name}</h2>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Fechar detalhes" className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-zinc-700 text-zinc-400 transition hover:border-zinc-600 hover:text-white focus-visible:outline-2 focus-visible:outline-lime-400">
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600">Séries sugeridas</p>
            <p className="mt-2 text-lg font-semibold text-white">{exercise.suggestedSets} <span className="text-sm font-normal text-zinc-500">séries</span></p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600">Repetições sugeridas</p>
            <p className="mt-2 text-lg font-semibold text-white">{exercise.suggestedReps}</p>
          </div>
        </div>

        <div className="mt-7">
          <h3 className="text-sm font-semibold text-white">Músculos envolvidos</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {muscleGroups.map((group, index) => (
              <span key={group} className={`rounded-lg px-3 py-1.5 text-xs ${index === 0 ? 'border border-lime-400/20 bg-lime-400/[0.08] text-lime-300' : 'border border-zinc-800 bg-zinc-900 text-zinc-400'}`}>
                {MUSCLE_GROUP_NAMES[group]}{index === 0 ? ' · principal' : ''}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <h3 className="text-sm font-semibold text-white">Equipamentos</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {exercise.equipment.map((item) => <span key={item} className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400">{item}</span>)}
          </div>
        </div>

        <div className="mt-7">
          <h3 className="text-sm font-semibold text-white">Como executar</h3>
          <ol className="mt-3 space-y-3">
            {exercise.instructions.map((instruction, index) => (
              <li key={`${index}-${instruction}`} className="flex gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3.5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-lime-400/10 text-xs font-semibold text-lime-300">{index + 1}</span>
                <span className="pt-0.5 text-sm leading-6 text-zinc-300">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>

        {feedback && <p role="status" className="mt-6 rounded-xl border border-lime-400/20 bg-lime-400/[0.06] px-4 py-3 text-sm text-lime-300">{feedback}</p>}

        <button type="button" onClick={() => { setFeedback(null); setPickerOpen(true) }} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400">
          <Icon name="plus" className="size-[18px]" />Adicionar ao treino
        </button>

        <p className="mt-4 text-xs leading-5 text-zinc-600">As séries e repetições são sugestões gerais para referência, não uma prescrição individual.</p>
      </section>
      {pickerOpen && <WorkoutPickerModal exerciseName={exercise.name} workouts={workouts} loading={workoutsLoading} onClose={() => setPickerOpen(false)} onConfirm={addToWorkout} />}
    </div>
  )
}


