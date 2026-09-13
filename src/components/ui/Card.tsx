import { type ReactNode, type CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Padding preset. Use 'none' when the card manages its own header/body padding (e.g. header band + body). */
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const PADDING: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

/** Standard SAFI card: white background, themed border, rounded corners. */
export default function Card({ children, className = '', style, padding = 'md' }: CardProps) {
  return (
    <div
      className={`rounded-lg border bg-white ${PADDING[padding]} ${className}`}
      style={{ borderColor: 'var(--border)', ...style }}
    >
      {children}
    </div>
  )
}

/** Colored header band used at the top of scheme/result cards (e.g. Recommendations, SchemesList). */
export function CardHeaderBand({
  children,
  background = 'var(--primary)',
  className = '',
}: {
  children: ReactNode
  background?: string
  className?: string
}) {
  return (
    <div className={`px-6 py-4 ${className}`} style={{ background }}>
      {children}
    </div>
  )
}
