import { Icon } from './Icon'
import type { Exercise } from '../../types/workout'

type ExerciseCardProps = {
  exercise: Exercise
  index: number
  onEdit: () => void
  onDelete: () => void
}

export function ExerciseCard({ exercise, index, onEdit, onDelete }: ExerciseCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-sm font-semibold tabular-nums text-lime-300">{String(index + 1).padStart(2, '0')}</span>
        <div className="min-w-0 flex-1 pt-0.5"><h3 className="break-words text-base font-semibold text-zinc-100">{exercise.name}</h3><p className="mt-1.5 text-sm text-zinc-400">{exercise.sets} {exercise.sets === 1 ? 'série' : 'séries'} <span className="mx-1 text-zinc-700">·</span> {String(exercise.reps)} repetições{exercise.weight !== undefined && <><span className="mx-1 text-zinc-700">·</span>{exercise.weight} kg</>}</p></div>
        <div className="flex shrink-0 gap-1"><button type="button" onClick={onEdit} aria-label={`Editar ${exercise.name}`} className="flex size-10 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"><Icon name="edit" className="size-[17px]" /></button><button type="button" onClick={onDelete} aria-label={`Excluir ${exercise.name}`} className="flex size-10 items-center justify-center rounded-lg text-zinc-500 hover:bg-red-400/10 hover:text-red-400"><Icon name="trash" className="size-[17px]" /></button></div>
      </div>
      {exercise.notes && <p className="ml-[52px] mt-2 border-l border-zinc-700 pl-3 text-sm leading-5 text-zinc-500">{exercise.notes}</p>}
    </article>
  )
}
