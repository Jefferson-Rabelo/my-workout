import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  icon?: IconName
  variant?: 'primary' | 'secondary'
}

export function Button({ children, icon, variant = 'primary', className = '', ...props }: ButtonProps) {
  const styles = variant === 'primary'
    ? 'bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] shadow-[0_8px_28px_-12px_var(--accent-border)]'
    : 'border border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-600 hover:bg-zinc-800'

  return <button className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${styles} ${className}`} {...props}>{icon && <Icon name={icon} className="size-[18px]" />}{children}</button>
}
