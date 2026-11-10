import { useMemo, useState } from 'react'
import { ExerciseLibraryCard } from '../components/ui/ExerciseLibraryCard'
import { ExerciseLibraryDetails } from '../components/ui/ExerciseLibraryDetails'
import { DashboardLayout, type DashboardDestination } from '../components/layout/DashboardLayout'
import type { ExerciseInput, Workout } from '../types/workout'
import { exerciseCatalog } from '../data/exerciseCatalog'
import { MUSCLE_GROUP_NAMES, type CatalogExercise, type ExerciseCategory, type MuscleGroup } from '../types/exerciseCatalog'

const muscleGroups = Object.keys(MUSCLE_GROUP_NAMES) as MuscleGroup[]

type CategoryFilter = ExerciseCategory | 'all'

const selectClassName = 'min-h-12 w-full appearance-none rounded-xl border border-zinc-800 bg-[#18181b] px-4 pr-10 text-sm text-zinc-200 outline-none transition focus:border-lime-400/50 focus:ring-2 focus:ring-lime-400/10'

type ExerciseLibraryPageProps = {
  workouts: Workout[]
  workoutsLoading: boolean
  onAddExercise: (workoutId: number, exercise: ExerciseInput) => Promise<void>
  onSettingsClick: () => void
  onNavigateDashboard: (destination: DashboardDestination) => void
}

export function ExerciseLibraryPage({ workouts, workoutsLoading, onAddExercise, onSettingsClick, onNavigateDashboard }: ExerciseLibraryPageProps) {
  const [search, setSearch] = useState('')
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup | 'all'>('all')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [selectedExercise, setSelectedExercise] = useState<CatalogExercise | null>(null)

  const filteredExercises = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')

    return exerciseCatalog.filter((exercise) => {
      const matchesSearch = normalizedSearch === '' || exercise.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch)
      const matchesMuscle = muscleGroup === 'all'
        || exercise.primaryMuscleGroup === muscleGroup
        || exercise.secondaryMuscleGroups.includes(muscleGroup)
      const matchesCategory = category === 'all' || exercise.category === category
      return matchesSearch && matchesMuscle && matchesCategory
    })
  }, [search, muscleGroup, category])

  function resetFilters() {
    setSearch('')
    setMuscleGroup('all')
    setCategory('all')
  }

  return (
<DashboardLayout workoutCount={workouts.length} activeSection="library" onSettingsClick={onSettingsClick} onNavigateDashboard={onNavigateDashboard}>
    <main className="min-h-screen bg-[#09090b] px-4 pb-12 pt-7 text-zinc-100 sm:px-7 sm:pt-10 lg:px-12 lg:pt-12">
      <div className="mx-auto w-full max-w-[1180px]">
        <header className="border-b border-zinc-800/70 pb-7 sm:pb-9">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-lime-400/15 bg-lime-400/[0.06] px-3 py-1.5 text-[11px] font-medium text-lime-300">
            <span className="size-1.5 rounded-full bg-lime-400" />Catálogo de movimentos
          </div>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-[34px]">Biblioteca de exercícios</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500 sm:text-[15px]">Explore movimentos por grupo muscular e encontre orientações para a execução.</p>
            </div>
            <span className="w-fit rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-xs text-zinc-400">{exerciseCatalog.length} exercícios</span>
          </div>
        </header>

        <section aria-label="Pesquisar e filtrar exercícios" className="mt-6 rounded-2xl border border-zinc-800/90 bg-zinc-900/55 p-4 sm:mt-8 sm:p-5">
          <label htmlFor="exercise-search" className="mb-2 block text-xs font-medium text-zinc-400">Buscar por nome</label>
          <div className="relative">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-500">
              <circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" />
            </svg>
            <input
              id="exercise-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ex.: supino, agachamento..."
              className="min-h-12 w-full rounded-xl border border-zinc-800 bg-[#18181b] pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-lime-400/50 focus:ring-2 focus:ring-lime-400/10"
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="muscle-filter" className="mb-2 block text-xs font-medium text-zinc-400">Grupo muscular</label>
              <div className="relative">
                <select id="muscle-filter" value={muscleGroup} onChange={(event) => setMuscleGroup(event.target.value as MuscleGroup | 'all')} className={selectClassName}>
                  <option value="all">Todos os grupos</option>
                  {muscleGroups.map((group) => <option key={group} value={group}>{MUSCLE_GROUP_NAMES[group]}</option>)}
                </select>
                <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500">⌄</span>
              </div>
            </div>
            <div>
              <label htmlFor="category-filter" className="mb-2 block text-xs font-medium text-zinc-400">Categoria</label>
              <div className="relative">
                <select id="category-filter" value={category} onChange={(event) => setCategory(event.target.value as CategoryFilter)} className={selectClassName}>
                  <option value="all">Todas as categorias</option>
                  <option value="compound">Compostos</option>
                  <option value="isolation">Isolamento</option>
                </select>
                <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500">⌄</span>
              </div>
            </div>
          </div>
        </section>

        <section aria-live="polite" className="mt-7 sm:mt-9">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-500"><span className="font-semibold text-zinc-300">{filteredExercises.length}</span> {filteredExercises.length === 1 ? 'exercício encontrado' : 'exercícios encontrados'}</p>
            {(search || muscleGroup !== 'all' || category !== 'all') && (
              <button type="button" onClick={resetFilters} className="min-h-10 rounded-lg px-3 text-xs font-medium text-lime-300 transition hover:bg-lime-400/10 focus-visible:outline-2 focus-visible:outline-lime-400">Limpar filtros</button>
            )}
          </div>

          {filteredExercises.length > 0 ? (
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
              {filteredExercises.map((exercise) => <ExerciseLibraryCard key={exercise.id} exercise={exercise} onSelect={setSelectedExercise} />)}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-6 text-center">
              <span className="flex size-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-500" aria-hidden="true">⌕</span>
              <h2 className="mt-4 text-base font-semibold text-white">Nenhum exercício encontrado</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">Tente outro termo ou ajuste os filtros para explorar o catálogo.</p>
              <button type="button" onClick={resetFilters} className="mt-4 min-h-11 rounded-xl px-4 text-sm font-semibold text-lime-300 transition hover:bg-lime-400/10 focus-visible:outline-2 focus-visible:outline-lime-400">Limpar busca e filtros</button>
            </div>
          )}
        </section>

        <footer className="mt-9 border-t border-zinc-800/60 pt-5 text-center text-xs leading-5 text-zinc-600">As sugestões de séries e repetições são referências gerais, não uma prescrição individual.</footer>
      </div>

      {selectedExercise && <ExerciseLibraryDetails exercise={selectedExercise} workouts={workouts} workoutsLoading={workoutsLoading} onAddExercise={onAddExercise} onClose={() => setSelectedExercise(null)} />}
    </main>
    </DashboardLayout>
  )
}



