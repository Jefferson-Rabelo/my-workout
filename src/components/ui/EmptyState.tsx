import { Icon } from './Icon'
import { Button } from './Button'

type EmptyStateProps = { onCreate: () => void }

export function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-5 py-12 text-center sm:min-h-[340px]">
      <div className="relative flex size-[72px] items-center justify-center rounded-[22px] border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent-hover)]">
        <Icon name="dumbbell" className="size-8" />
        <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full border-4 border-zinc-900 bg-[var(--accent)] text-[var(--accent-foreground)]"><Icon name="plus" className="size-3" /></span>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-zinc-100">Seu primeiro treino começa aqui</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">Monte sua rotina, acompanhe seus exercícios e deixe cada sessão mais organizada.</p>
      <Button icon="plus" className="mt-6" onClick={onCreate}>Novo treino</Button>
    </div>
  )
}
