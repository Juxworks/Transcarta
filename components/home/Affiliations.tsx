import { SectionLabel } from '@/components/ui/SectionLabel'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { affiliations } from '@/lib/data'

export function Affiliations() {
  return (
    <div className="bg-green-mint py-[70px]">
      <div className="mx-auto max-w-content px-14">
        <SectionLabel>Board Affiliations</SectionLabel>
        <h2 className="mb-8 font-heading text-[clamp(24px,3vw,36px)] font-bold leading-tight text-green-dark">
          Organisations We Serve
        </h2>
        <div className="flex flex-wrap gap-5">
          {affiliations.map(aff => (
            <div
              key={aff.id}
              className="flex min-w-[180px] flex-1 flex-col items-center gap-3 rounded-md border border-emerald-100 border-l-[3px] border-l-blue-brand bg-white p-6"
            >
              <ImagePlaceholder label="Logo" dimensions="200 × 80px" className="h-14 w-full rounded-[4px]" />
              <p className="text-center font-heading text-[13px] font-semibold text-green-dark">{aff.name}</p>
              <p className="text-center font-body text-[11px] text-muted">{aff.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
