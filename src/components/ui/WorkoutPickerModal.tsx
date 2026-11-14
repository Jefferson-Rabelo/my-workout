import { useEffect, useRef, useState } from 'react'
import type { Workout } from '../../types/workout'
import { Icon } from './Icon'

type WorkoutPickerModalProps = {
  exerciseName: string
  workouts: Workout[]
  loading: boolean
  onClose: () => void
  onConfirm: (workoutId: number) => Promise<void>
}

export function WorkoutPickerModal({ exerciseName, workouts, loading, onClose, onConfirm }: WorkoutPickerModalProps) {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  const availableWorkouts = workouts.filter((workout): workout is Workout & { id: number } => workout.id !== undefined)

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
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
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
  }, [])

  async function handleConfirm() {
    if (selectedWorkoutId === null || saving) return
    setSaving(true)
    setError(null)
    try {
      await onConfirm(selectedWorkoutId)
    } catch (operationError) {
      setError(operationError instanceof Error ? operationError.message : 'Não foi possível adicionar o exercício. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) onClose() }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="workout-picker-title" tabIndex={-1} className="w-full max-w-lg rounded-t-3xl border border-zinc-800 bg-[#18181b] p-5 shadow-2xl sm:rounded-3xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-hover)]">Adicionar exercício</p>
            <h2 id="workout-picker-title" className="mt-2 text-xl font-semibold text-white">Escolha um treino</h2>
            <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{exerciseName}</p>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} disabled={saving} aria-label="Fechar seleção de treino" className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700 text-zinc-400 transition hover:text-white disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-[var(--accent)]">
            <Icon name="close" className="size-5" />
          </button>
        </div>
        {loading ? (
          <div role="status" className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-8 text-center text-sm text-zinc-500">Carregando seus treinos...</div>
        ) : availableWorkouts.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 px-5 py-7 text-center">
            <p className="text-sm font-medium text-white">Você ainda não tem treinos</p>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-500">Crie um treino primeiro. Depois, volte à biblioteca para adicionar este exercício.</p>
          </div>
        ) : (
          <div className="mt-5 max-h-[42dvh] space-y-2 overflow-y-auto pr-1">
            {availableWorkouts.map((workout) => {
              const selected = selectedWorkoutId === workout.id
              return <button key={workout.id} type="button" onClick={() => { setSelectedWorkoutId(workout.id); setError(null) }} aria-pressed={selected} className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${selected ? 'border-[var(--accent)] bg-[var(--accent-soft)]' : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700'}`}>
                <span className={`min-w-0 truncate text-sm font-medium ${selected ? 'text-white' : 'text-zinc-300'}`}>{workout.name}</span>
                <span className="shrink-0 text-xs text-zinc-500">{workout.exercises.length} {workout.exercises.length === 1 ? 'exercício' : 'exercícios'}</span>
              </button>
            })}
          </div>
        )}
        {error && <p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">{error}</p>}
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} disabled={saving} className="min-h-12 rounded-xl border border-zinc-700 px-5 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-[var(--accent)]">Cancelar</button>
          {availableWorkouts.length > 0 && !loading && <button type="button" onClick={() => void handleConfirm()} disabled={selectedWorkoutId === null || saving} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-foreground)] transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">{saving ? 'Adicionando...' : 'Adicionar ao treino'}</button>}
        </div>
      </section>
    </div>
  )
}

