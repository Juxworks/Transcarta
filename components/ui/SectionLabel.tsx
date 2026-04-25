type Props = { children: React.ReactNode }

export function SectionLabel({ children }: Props) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[3px] text-blue-brand">
      <span className="inline-block h-[2px] w-5 bg-blue-brand" />
      {children}
    </div>
  )
}
