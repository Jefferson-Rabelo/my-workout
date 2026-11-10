/// <reference types="vite-plugin-pwa/client" />
import { useEffect, useRef, useState } from 'react'
import { registerSW } from 'virtual:pwa-register'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

type Notice = 'offline-ready' | 'update-ready' | null

export function PwaStatus() {
  const [notice, setNotice] = useState<Notice>(null)
  const [updating, setUpdating] = useState(false)
  const updateServiceWorker = useRef<((reloadPage?: boolean) => Promise<void>) | null>(null)

  useEffect(() => {
    updateServiceWorker.current = registerSW({
      immediate: true,
      onNeedRefresh: () => setNotice('update-ready'),
      onOfflineReady: () => setNotice('offline-ready'),
    })
  }, [])

  if (!notice) return null

  async function applyUpdate() {
    const update = updateServiceWorker.current
    if (!update) return
    setUpdating(true)
    await update(true)
  }

  return (
    <aside role="status" aria-live="polite" className="fixed bottom-24 left-4 right-4 z-[60] mx-auto max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-4 shadow-2xl sm:bottom-5 sm:left-auto sm:right-5">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-300"><Icon name={notice === 'update-ready' ? 'activity' : 'spark'} className="size-[18px]" /></span>
        <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-white">{notice === 'update-ready' ? 'Nova versão disponível' : 'My Workout pronto para uso offline'}</p><p className="mt-1 text-xs leading-5 text-zinc-400">{notice === 'update-ready' ? 'Atualize para carregar a versão mais recente.' : 'Os arquivos do aplicativo foram salvos neste dispositivo.'}</p>
          <div className="mt-3 flex flex-wrap gap-2">{notice === 'update-ready' && <Button type="button" className="min-h-10 px-3 text-xs" onClick={() => void applyUpdate()} disabled={updating}>{updating ? 'Atualizando…' : 'Atualizar agora'}</Button>}<Button type="button" variant="secondary" className="min-h-10 px-3 text-xs" onClick={() => setNotice(null)}>{notice === 'update-ready' ? 'Depois' : 'Entendi'}</Button></div>
        </div>
        <button type="button" aria-label="Fechar aviso" onClick={() => setNotice(null)} className="flex size-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-white"><Icon name="close" className="size-4" /></button>
      </div>
    </aside>
  )
}

