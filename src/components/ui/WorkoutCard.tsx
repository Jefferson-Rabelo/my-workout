import { Icon } from './Icon'
import type { Workout } from '../../types/workout'

type WorkoutCardProps = {
  workout: Workout
  onOpen: (workout: Workout) => void
  onEdit: (workout: Workout) => void
  onDelete: (workout: Workout) => void
}

export function WorkoutCard({ workout, onOpen, onEdit, onDelete }: WorkoutCardProps) {
  const exerciseCount = workout.exercises.length
  return (
    <article className="group rounded-2xl border border-zinc-800/90 bg-zinc-900/80 p-5 transition-colors hover:border-zinc-700 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <button type="button" onClick={() => onOpen(workout)} className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-hover)]"><Icon name="dumbbell" className="size-5" /></span>
          <span className="sr-only">Abrir detalhes do treino </span>
          <Icon name="arrow" className="ml-auto size-4 shrink-0 text-zinc-600 opacity-0 transition group-hover:opacity-100" />
        </button>
        <div className="flex gap-1 opacity-100 transition sm:opacity-70 sm:group-hover:opacity-100">
          <button type="button" aria-label={`Editar ${workout.name}`} onClick={() => onEdit(workout)} className="flex size-10 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"><Icon name="edit" className="size-[17px]" /></button>
          <button type="button" aria-label={`Excluir ${workout.name}`} onClick={() => onDelete(workout)} className="flex size-10 items-center justify-center rounded-lg text-zinc-500 hover:bg-red-400/10 hover:text-red-400"><Icon name="trash" className="size-[17px]" /></button>
        </div>
      </div>
      <button type="button" onClick={() => onOpen(workout)} className="mt-5 block w-full rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
        <span className="block truncate text-base font-semibold text-zinc-100" title={workout.name}>{workout.name}</span>
        <span className="mt-2 flex items-center gap-2 text-xs text-zinc-500"><Icon name="activity" className="size-4 text-zinc-600" />{exerciseCount} {exerciseCount === 1 ? 'exercício' : 'exercícios'}</span>
        <span className="sr-only">Abrir detalhes do treino</span>
      </button>
    </article>
  )
}
