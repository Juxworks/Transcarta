import Link from 'next/link'

type Variant = 'primary' | 'outline-blue' | 'white'

type Props = {
  variant?: Variant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
}

const styles: Record<Variant, string> = {
  primary:
    'bg-green-primary text-white hover:bg-green-dark shadow-[0_4px_14px_rgba(5,150,105,0.35)]',
  'outline-blue':
    'border-2 border-blue-brand text-blue-brand bg-transparent hover:bg-blue-tint',
  white:
    'bg-white text-green-dark hover:bg-green-mint',
}

const base =
  'inline-flex items-center gap-2 rounded-[6px] px-7 py-3 font-heading text-sm font-semibold transition-all duration-200 cursor-pointer'

export function Button({ variant = 'primary', href, onClick, children, className = '', type = 'button' }: Props) {
  const cls = `${base} ${styles[variant]} ${className}`
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button type={type} onClick={onClick} className={cls}>{children}</button>
}
