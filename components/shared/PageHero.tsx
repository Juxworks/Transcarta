type Props = {
  label?: string
  heading: string
  sub?: string
}

export function PageHero({ label, heading, sub }: Props) {
  return (
    <div className="bg-green-mint px-14 py-16">
      <div className="mx-auto max-w-content">
        {label && (
          <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[3px] text-blue-brand">
            {label}
          </p>
        )}
        <h1 className="font-heading text-[clamp(28px,4vw,48px)] font-bold leading-tight text-green-dark">
          {heading}
        </h1>
        {sub && (
          <p className="mt-4 max-w-xl font-body text-[15px] leading-7 text-muted">{sub}</p>
        )}
      </div>
    </div>
  )
}
