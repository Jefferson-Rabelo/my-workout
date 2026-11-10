import { Icon, type IconName } from './Icon'

type StatCardProps = {
  label: string
  value: number
  detail: string
  icon: IconName
}

export function StatCard({ label, value, detail, icon }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-800/90 bg-zinc-900/80 p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex size-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-300"><Icon name={icon} className="size-5" /></div>
        <span className="rounded-full border border-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-500">Visão geral</span>
      </div>
      <p className="mt-6 text-sm text-zinc-400">{label}</p>
      <div className="mt-1 flex items-baseline gap-2"><span className="text-3xl font-semibold tracking-tight text-white">{value}</span><span className="text-xs text-zinc-500">{detail}</span></div>
    </article>
  )
}
