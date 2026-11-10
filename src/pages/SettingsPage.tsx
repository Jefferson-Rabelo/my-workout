import { useRef, useState } from 'react'
import { DashboardLayout, type DashboardDestination } from '../components/layout/DashboardLayout'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { LAST_BACKUP_STORAGE_KEY, createWorkoutBackup, parseWorkoutBackup, replaceWorkoutsFromBackup } from '../utils/backup'

type SettingsPageProps = {
  workoutCount: number
  onBack: () => void
  onSettingsClick: () => void
  onNavigateDashboard: (destination: DashboardDestination) => void
}

function readLastBackup(): string | null {
  try {
    return window.localStorage.getItem(LAST_BACKUP_STORAGE_KEY)
  } catch {
    return null
  }
}

function formatDate(value: string | null) {
  if (!value || !Number.isFinite(Date.parse(value))) return null
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(value))
}

export function SettingsPage({ workoutCount, onBack, onSettingsClick, onNavigateDashboard }: SettingsPageProps) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [lastBackup, setLastBackup] = useState(readLastBackup)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function exportBackup() {
    setBusy(true)
    setMessage(null)
    try {
      const backup = await createWorkoutBackup()
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `my-workout-backup-${backup.exportedAt.slice(0, 10)}.json`
      document.body.append(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      try {
        window.localStorage.setItem(LAST_BACKUP_STORAGE_KEY, backup.exportedAt)
      } catch {
        // The backup is downloaded even when browser storage is unavailable.
      }
      setLastBackup(backup.exportedAt)
      setMessage({ type: 'success', text: `Backup exportado com ${backup.workouts.length} ${backup.workouts.length === 1 ? 'treino' : 'treinos'}.` })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Não foi possível exportar o backup.' })
    } finally {
      setBusy(false)
    }
  }

  async function importBackup(file: File) {
    setBusy(true)
    setMessage(null)
    try {
      const backup = parseWorkoutBackup(await file.text())
      const confirmed = window.confirm(`Este backup contém ${backup.workouts.length} ${backup.workouts.length === 1 ? 'treino' : 'treinos'}. Ele substituirá os ${workoutCount} ${workoutCount === 1 ? 'treino atual' : 'treinos atuais'}. Deseja continuar?`)
      if (!confirmed) return
      await replaceWorkoutsFromBackup(backup)
      setMessage({ type: 'success', text: `Backup restaurado. ${backup.workouts.length} ${backup.workouts.length === 1 ? 'treino foi importado' : 'treinos foram importados'}.` })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Não foi possível importar o backup.' })
    } finally {
      setBusy(false)
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  return (
    <DashboardLayout workoutCount={workoutCount} activeSection="settings" onSettingsClick={onSettingsClick} onNavigateDashboard={onNavigateDashboard}>
      <main className="pt-2 sm:pt-4">
        <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"><Icon name="arrow-left" className="size-[18px]" />Voltar ao dashboard</button>
        <header className="mt-7 border-b border-zinc-800/80 pb-7"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">Preferências</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Configurações</h1><p className="mt-2 text-sm text-zinc-500">Gerencie uma cópia local dos seus treinos.</p></header>

        <section className="mt-7 max-w-3xl" aria-labelledby="backup-title">
          <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/70 p-5 sm:p-7">
            <div className="flex items-start gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-300"><Icon name="arrow" className="size-5" /></span><div><h2 id="backup-title" className="text-lg font-semibold text-white">Backup e restauração</h2><p className="mt-1 text-sm leading-6 text-zinc-500">Exporte seus treinos em um arquivo JSON ou restaure uma cópia salva anteriormente.</p></div></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button type="button" icon="arrow" onClick={() => void exportBackup()} disabled={busy} className="w-full">{busy ? 'Aguarde…' : 'Exportar backup'}</Button>
              <Button type="button" variant="secondary" icon="plus" onClick={() => fileInput.current?.click()} disabled={busy} className="w-full">Importar backup</Button>
              <input ref={fileInput} type="file" accept=".json,application/json" className="sr-only" aria-label="Selecionar arquivo de backup JSON" onChange={(event) => { const file = event.target.files?.[0]; if (file) void importBackup(file) }} />
            </div>
            <p className="mt-4 text-xs text-zinc-600">A restauração substitui todos os treinos atuais após confirmação.</p>
            <div className="mt-5 flex items-center gap-2 border-t border-zinc-800 pt-4 text-xs text-zinc-500"><Icon name="clock" className="size-4 text-zinc-600" />{formatDate(lastBackup) ? <>Último backup gerado neste navegador: <time dateTime={lastBackup ?? undefined}>{formatDate(lastBackup)}</time></> : 'Nenhum backup exportado neste navegador.'}</div>
            {message && <p role={message.type === 'error' ? 'alert' : 'status'} className={`mt-4 rounded-xl border px-4 py-3 text-sm ${message.type === 'success' ? 'border-lime-400/20 bg-lime-400/[0.06] text-lime-200' : 'border-red-400/20 bg-red-400/[0.06] text-red-300'}`}>{message.text}</p>}
          </div>
        </section>
      </main>
    </DashboardLayout>
  )
}
