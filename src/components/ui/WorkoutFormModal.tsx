import { useEffect, useState, type FormEvent } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'
import type { Workout } from '../../types/workout'

type WorkoutFormModalProps = {
  workout: Workout | null
  saving: boolean
  onClose: () => void
  onSubmit: (name: string) => Promise<void>
}

export function WorkoutFormModal({ workout, saving, onClose, onSubmit }: WorkoutFormModalProps) {
  const [name, setName] = useState(workout?.name ?? '')
  const [error, setError] = useState<string | null>(null)
  const editing = workout !== null

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !saving) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, saving])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Digite um nome para o treino.')
      return
    }

    setError(null)
    try {
      await onSubmit(trimmedName)
    } catch {
      setError('Não foi possível salvar. Tente novamente.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) onClose() }}>
      <section role="dialog" aria-modal="true" aria-labelledby="workout-modal-title" className="w-full max-w-md rounded-t-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div><div className="flex size-10 items-center justify-center rounded-xl bg-lime-400/10 text-lime-300"><Icon name="dumbbell" className="size-5" /></div><h2 id="workout-modal-title" className="mt-4 text-xl font-semibold text-white">{editing ? 'Editar treino' : 'Novo treino'}</h2><p className="mt-1 text-sm text-zinc-500">{editing ? 'Atualize o nome do seu treino.' : 'Dê um nome para organizar sua rotina.'}</p></div>
          <button type="button" onClick={onClose} disabled={saving} aria-label="Fechar" className="flex size-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-white disabled:opacity-50"><Icon name="close" className="size-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="workout-name" className="mb-2 block text-xs font-medium text-zinc-300">Nome do treino</label>
          <input autoFocus id="workout-name" value={name} onChange={(event) => { setName(event.target.value); if (error) setError(null) }} maxLength={80} placeholder="Ex.: Treino de superiores" className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/70 focus:ring-2 focus:ring-lime-400/10" aria-invalid={Boolean(error)} aria-describedby={error ? 'workout-name-error' : undefined} />
          {error && <p id="workout-name-error" role="alert" className="mt-2 text-xs text-red-400">{error}</p>}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={onClose} disabled={saving}>Cancelar</Button><Button type="submit" disabled={saving}>{saving ? 'Salvando…' : editing ? 'Salvar alterações' : 'Criar treino'}</Button></div>
        </form>
      </section>
    </div>
  )
}
