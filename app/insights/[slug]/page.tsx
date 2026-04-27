import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { insights } from '@/lib/insights'
import { ContactCTA } from '@/components/home/ContactCTA'

export function generateStaticParams() {
  return insights.map(i => ({ slug: i.slug }))
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = insights.find(i => i.slug === slug)
  if (!article) notFound()

  return (
    <>
      <div className="mx-auto max-w-[760px] px-6 py-20">
        <Link href="/insights" className="mb-8 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-blue-brand hover:underline">
          ← Back to Insights
        </Link>

        <p className="mb-3 flex items-center gap-1.5 font-body text-[10px] font-bold uppercase tracking-[1.5px] text-blue-brand">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-brand" />
          {article.outlet} · {article.topic}
        </p>

        <h1 className="mb-4 font-heading text-[clamp(24px,4vw,40px)] font-bold leading-tight text-green-dark">
          {article.title}
        </h1>

        <p className="mb-8 font-body text-sm text-muted">{article.date}</p>

        <div className="relative mb-10 h-[360px] w-full overflow-hidden rounded-md">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-5">
          {article.content.map((block, i) =>
            block.type === 'heading' ? (
              <h2 key={i} className="pt-4 font-heading text-xl font-bold text-green-dark">
                {block.text}
              </h2>
            ) : (
              <p key={i} className="font-body text-[15px] leading-relaxed text-ink">
                {block.text}
              </p>
            )
          )}
        </div>
      </div>

      <ContactCTA />
    </>
  )
}
