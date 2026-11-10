import { Icon, type IconName } from '../ui/Icon'
import type { DashboardDestination, DashboardSection } from './DashboardLayout'

type NavItem = { label: string; icon: IconName; destination: DashboardDestination }
type SidebarProps = {
  workoutCount: number
  activeSection: DashboardSection
  onSettingsClick: () => void
  onNavigateDashboard: (destination: DashboardDestination) => void
}

const navItems: NavItem[] = [
  { label: 'Visão geral', icon: 'grid', destination: 'overview' },
  { label: 'Meus treinos', icon: 'dumbbell', destination: 'workouts' },
  { label: 'Biblioteca', icon: 'library', destination: 'library' },
]

export function Sidebar({ workoutCount, activeSection, onSettingsClick, onNavigateDashboard }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-[252px] flex-col border-r border-zinc-800/80 bg-zinc-950 px-5 py-7 lg:flex">
      <button type="button" onClick={() => onNavigateDashboard('overview')} className="flex items-center gap-3 px-2 text-left" aria-label="My Workout, início">
        <span className="flex size-10 items-center justify-center rounded-xl bg-lime-400 text-zinc-950"><Icon name="dumbbell" className="size-5" /></span>
        <span className="text-[15px] font-bold tracking-tight text-white">my<span className="text-lime-400">workout</span></span>
      </button>
      <p className="mb-3 mt-12 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">Menu</p>
      <nav className="space-y-1" aria-label="Navegação principal">
        {navItems.map((item) => <button key={item.label} type="button" onClick={() => onNavigateDashboard(item.destination)} aria-current={activeSection === item.destination ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-medium transition-colors ${activeSection === item.destination ? 'bg-zinc-900 text-lime-300' : 'text-zinc-500 hover:bg-zinc-900/70 hover:text-zinc-200'}`}><Icon name={item.icon} className="size-[18px]" />{item.label}{item.destination === 'workouts' && <span className="ml-auto rounded-md bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">{workoutCount}</span>}</button>)}
        <button type="button" onClick={onSettingsClick} aria-current={activeSection === 'settings' ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-medium transition-colors ${activeSection === 'settings' ? 'bg-zinc-900 text-lime-300' : 'text-zinc-500 hover:bg-zinc-900/70 hover:text-zinc-200'}`}><Icon name="settings" className="size-[18px]" />Configurações</button>
      </nav>
      <div className="mt-auto rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
        <div className="flex size-9 items-center justify-center rounded-xl bg-lime-400/10 text-lime-300"><Icon name="spark" className="size-[18px]" /></div>
        <p className="mt-3 text-sm font-semibold text-zinc-200">Feito para evoluir</p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">Um treino de cada vez. Mantenha o foco na sua jornada.</p>
      </div>
      <div className="mt-5 flex items-center gap-3 border-t border-zinc-800/80 px-2 pt-5">
        <div className="flex size-9 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-zinc-300">MW</div>
        <div><p className="text-xs font-medium text-zinc-200">Meu espaço</p><p className="mt-0.5 text-[11px] text-zinc-600">Treino pessoal</p></div>
        <Icon name="more" className="ml-auto size-5 text-zinc-600" />
      </div>
    </aside>
  )
}
