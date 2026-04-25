type Variant = 'green' | 'blue'

type Props = { children: React.ReactNode; variant?: Variant }

export function Chip({ children, variant = 'green' }: Props) {
  const cls =
    variant === 'green'
      ? 'bg-green-mint text-green-dark border-emerald-200'
      : 'bg-blue-tint text-blue-brand border-blue-200'
  return (
    <span className={`mr-1 mt-1 inline-block rounded-full border px-3 py-1 text-[11px] font-semibold ${cls}`}>
      {children}
    </span>
  )
}
