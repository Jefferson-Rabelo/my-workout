import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  icon?: IconName
  variant?: 'primary' | 'secondary'
}

export function Button({ children, icon, variant = 'primary', className = '', ...props }: ButtonProps) {
  const styles = variant === 'primary'
    ? 'bg-lime-400 text-zinc-950 hover:bg-lime-300 shadow-[0_8px_28px_-12px_rgba(163,230,53,0.65)]'
    : 'border border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-600 hover:bg-zinc-800'

  return <button className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 ${styles} ${className}`} {...props}>{icon && <Icon name={icon} className="size-[18px]" />}{children}</button>
}
