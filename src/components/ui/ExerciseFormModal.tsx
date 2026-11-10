import { useEffect, useState, type FormEvent } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'
import type { Exercise, ExerciseInput } from '../../types/workout'

type ExerciseFormModalProps = {
  exercise: Exercise | null
  saving: boolean
  onClose: () => void
  onSubmit: (exercise: ExerciseInput) => Promise<void>
}

export function ExerciseFormModal({ exercise, saving, onClose, onSubmit }: ExerciseFormModalProps) {
  const [name, setName] = useState(exercise?.name ?? '')
  const [sets, setSets] = useState(exercise ? String(exercise.sets) : '3')
  const [reps, setReps] = useState(exercise ? String(exercise.reps) : '10-12')
  const [weight, setWeight] = useState(exercise?.weight === undefined ? '' : String(exercise.weight))
  const [notes, setNotes] = useState(exercise?.notes ?? '')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !saving) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, saving])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const exerciseName = name.trim()
    const setCount = Number(sets)
    if (!exerciseName) {
      setError('Informe o nome do exercício.')
      return
    }
    if (!Number.isInteger(setCount) || setCount < 1) {
      setError('Informe uma quantidade inteira de séries maior que zero.')
      return
    }
    if (!reps.trim()) {
      setError('Informe as repetições.')
      return
    }
    const parsedWeight = weight.trim() === '' ? undefined : Number(weight)
    if (parsedWeight !== undefined && (!Number.isFinite(parsedWeight) || parsedWeight < 0)) {
      setError('Informe uma carga válida em kg.')
      return
    }

    setError(null)
    try {
      await onSubmit({ name: exerciseName, sets: setCount, reps: reps.trim(), weight: parsedWeight, notes: notes.trim() || undefined })
    } catch {
      setError('Não foi possível salvar o exercício. Tente novamente.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) onClose() }}>
      <section role="dialog" aria-modal="true" aria-labelledby="exercise-modal-title" className="max-h-[94dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div><div className="flex size-10 items-center justify-center rounded-xl bg-lime-400/10 text-lime-300"><Icon name="activity" className="size-5" /></div><h2 id="exercise-modal-title" className="mt-4 text-xl font-semibold text-white">{exercise ? 'Editar exercício' : 'Adicionar exercício'}</h2><p className="mt-1 text-sm text-zinc-500">Registre os detalhes para sua próxima sessão.</p></div>
          <button type="button" onClick={onClose} disabled={saving} aria-label="Fechar" className="flex size-10 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-white disabled:opacity-50"><Icon name="close" className="size-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div><label htmlFor="exercise-name" className="mb-2 block text-xs font-medium text-zinc-300">Nome do exercício <span className="text-lime-400">*</span></label><input autoFocus id="exercise-name" required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Supino reto" className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/70 focus:ring-2 focus:ring-lime-400/10" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label htmlFor="exercise-sets" className="mb-2 block text-xs font-medium text-zinc-300">Séries</label><input id="exercise-sets" type="number" required min="1" step="1" inputMode="numeric" value={sets} onChange={(event) => setSets(event.target.value)} className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-sm text-white outline-none focus:border-lime-400/70 focus:ring-2 focus:ring-lime-400/10" /></div>
            <div><label htmlFor="exercise-reps" className="mb-2 block text-xs font-medium text-zinc-300">Repetições</label><input id="exercise-reps" type="text" required value={reps} onChange={(event) => setReps(event.target.value)} placeholder="12, 10-12, até a falha" className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/70 focus:ring-2 focus:ring-lime-400/10" /></div>
          </div>
          <div><label htmlFor="exercise-weight" className="mb-2 block text-xs font-medium text-zinc-300">Carga <span className="text-zinc-600">(kg, opcional)</span></label><div className="relative"><input id="exercise-weight" type="number" min="0" step="any" inputMode="decimal" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="0" className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 pr-12 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/70 focus:ring-2 focus:ring-lime-400/10" /><span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs text-zinc-600">kg</span></div></div>
          <div><label htmlFor="exercise-notes" className="mb-2 block text-xs font-medium text-zinc-300">Observações <span className="text-zinc-600">(opcional)</span></label><textarea id="exercise-notes" rows={3} maxLength={500} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Anotações para lembrar durante o treino" className="w-full resize-y rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/70 focus:ring-2 focus:ring-lime-400/10" /></div>
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={onClose} disabled={saving}>Cancelar</Button><Button type="submit" disabled={saving}>{saving ? 'Salvando…' : exercise ? 'Salvar alterações' : 'Adicionar exercício'}</Button></div>
        </form>
      </section>
    </div>
  )
}
