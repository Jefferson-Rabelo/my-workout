import { MUSCLE_GROUP_NAMES, type CatalogExercise } from '../../types/exerciseCatalog'
import { Icon } from './Icon'

type ExerciseLibraryCardProps = {
  exercise: CatalogExercise
  onSelect: (exercise: CatalogExercise) => void
}

export function ExerciseLibraryCard({ exercise, onSelect }: ExerciseLibraryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(exercise)}
      className="group flex min-h-60 flex-col rounded-2xl border border-zinc-800 bg-[#18181b] p-5 text-left transition hover:border-lime-400/40 hover:bg-zinc-800/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
      aria-label={`Ver detalhes de ${exercise.name}`}
    >
      <div className="flex w-full items-start justify-between gap-3">
        <span className="inline-flex rounded-lg border border-lime-400/15 bg-lime-400/[0.07] px-2.5 py-1 text-xs font-medium text-lime-300">
          {MUSCLE_GROUP_NAMES[exercise.primaryMuscleGroup]}
        </span>
        <span className="shrink-0 rounded-lg border border-zinc-700/80 px-2.5 py-1 text-[11px] text-zinc-400">
          {exercise.category === 'compound' ? 'Composto' : 'Isolamento'}
        </span>
      </div>

      <h2 className="mt-5 text-lg font-semibold tracking-tight text-white group-hover:text-lime-100">{exercise.name}</h2>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {exercise.secondaryMuscleGroups.map((group) => (
          <span key={group} className="rounded-md bg-zinc-900 px-2 py-1 text-[11px] text-zinc-400">
            {MUSCLE_GROUP_NAMES[group]}
          </span>
        ))}
        {exercise.secondaryMuscleGroups.length === 0 && <span className="text-xs text-zinc-600">Sem grupo secundário</span>}
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Equipamentos</p>
          <p className="mt-1 line-clamp-1 text-xs text-zinc-400">{exercise.equipment.join(' · ')}</p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-zinc-700 text-zinc-500 transition group-hover:border-lime-400/30 group-hover:text-lime-300" aria-hidden="true">
          <Icon name="arrow" className="size-4" />
        </span>
      </div>
    </button>
  )
}
