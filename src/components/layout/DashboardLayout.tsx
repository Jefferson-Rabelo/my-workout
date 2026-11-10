import type { ReactNode } from 'react'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'

export type DashboardDestination = 'overview' | 'workouts' | 'library'
export type DashboardSection = DashboardDestination | 'settings'

type DashboardLayoutProps = {
  children: ReactNode
  workoutCount: number
  activeSection?: DashboardSection
  onSettingsClick?: () => void
  onNavigateDashboard?: (destination: DashboardDestination) => void
}

export function DashboardLayout({ children, workoutCount, activeSection = 'overview', onSettingsClick = () => {}, onNavigateDashboard = () => {} }: DashboardLayoutProps) {
  return <div className="min-h-screen bg-[#09090b] text-zinc-100"><Sidebar workoutCount={workoutCount} activeSection={activeSection} onSettingsClick={onSettingsClick} onNavigateDashboard={onNavigateDashboard} /><div className="min-h-screen lg:pl-[252px]"><div className="mx-auto min-h-screen w-full max-w-[1440px] px-5 pb-28 pt-5 sm:px-8 sm:pb-28 sm:pt-7 lg:px-12 lg:pb-12 lg:pt-9">{children}</div></div><MobileNav activeSection={activeSection} onSettingsClick={onSettingsClick} onNavigateDashboard={onNavigateDashboard} /></div>
}
