import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'default' | 'inverse' | 'success'
  className?: string
}

const TONE_STYLE: Record<NonNullable<BadgeProps['tone']>, React.CSSProperties> = {
  default: { background: 'var(--secondary)', color: 'var(--primary)' },
  inverse: { background: 'rgba(255,255,255,0.12)', color: 'white' },
  success: { background: '#e8f7ee', color: '#1a7a43' },
}

/** Pill-shaped tag, used for beneficiary categories (SC/ST/OBC/EWS), scheme tags, and status labels. */
export default function Badge({ children, tone = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`text-xs font-sans-ui font-medium px-2.5 py-0.5 rounded-full inline-block ${className}`}
      style={TONE_STYLE[tone]}
    >
      {children}
    </span>
  )
}
