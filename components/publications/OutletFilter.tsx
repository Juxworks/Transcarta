'use client'
type Props = { outlets: string[]; active: string; onChange: (o: string) => void }

export function OutletFilter({ outlets, active, onChange }: Props) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {outlets.map(outlet => (
        <button
          key={outlet}
          onClick={() => onChange(outlet)}
          className={`rounded-full px-4 py-1.5 font-body text-xs font-semibold transition ${
            active === outlet
              ? 'bg-blue-brand text-white'
              : 'border border-border bg-white text-muted hover:border-blue-brand hover:text-blue-brand'
          }`}
        >
          {outlet}
        </button>
      ))}
    </div>
  )
}
