import { ImageIcon } from 'lucide-react'

type Props = {
  label: string
  dimensions: string
  className?: string
}

export function ImagePlaceholder({ label, dimensions, className = '' }: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-emerald-300 bg-green-mint p-5 text-center ${className}`}
    >
      <ImageIcon className="h-8 w-8 text-green-primary opacity-50" strokeWidth={1.5} />
      <span className="font-heading text-xs font-semibold text-green-dark">{label}</span>
      <span className="text-[10px] text-muted">
        Recommended: <span>{dimensions}</span>
      </span>
    </div>
  )
}
