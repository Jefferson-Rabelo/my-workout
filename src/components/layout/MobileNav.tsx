import { Icon, type IconName } from '../ui/Icon'
import type { DashboardDestination } from './DashboardLayout'

type Item = { label: string; icon: IconName; destination: DashboardDestination }
type MobileNavProps = {
  onSettingsClick: () => void
  onNavigateDashboard: (destination: DashboardDestination) => void
  activeSection: 'dashboard' | 'settings'
}
const items: Item[] = [
  { label: 'Início', icon: 'grid', destination: 'overview' },
  { label: 'Treinos', icon: 'dumbbell', destination: 'workouts' },
  { label: 'Histórico', icon: 'calendar', destination: 'workouts' },
]

export function MobileNav({ onSettingsClick, onNavigateDashboard, activeSection }: MobileNavProps) {
  return <nav aria-label="Navegação mobile" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-zinc-800/90 bg-zinc-950/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-lg">{items.map((item, index) => <button key={item.label} type="button" onClick={() => onNavigateDashboard(item.destination)} aria-current={activeSection === 'dashboard' && index === 0 ? 'page' : undefined} className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-medium ${activeSection === 'dashboard' && index === 0 ? 'text-lime-300' : 'text-zinc-600'}`}><Icon name={item.icon} className="size-[19px]" />{item.label}</button>)}<button type="button" onClick={onSettingsClick} aria-current={activeSection === 'settings' ? 'page' : undefined} className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-medium ${activeSection === 'settings' ? 'text-lime-300' : 'text-zinc-600'}`}><Icon name="settings" className="size-[19px]" />Ajustes</button></nav>
}
