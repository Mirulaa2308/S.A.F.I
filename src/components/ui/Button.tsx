import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const SIZE_CLS: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm',
}

/**
 * Shared SAFI button. Keep variant usage consistent across pages:
 * - primary: main call-to-action (gradient fill)
 * - secondary: filled with theme secondary color, lower emphasis than primary
 * - outline: bordered, transparent background
 * - ghost: text-only, for tertiary actions
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  children,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded font-sans-ui font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed'

  const variantStyle: Record<Variant, React.CSSProperties> = {
    primary: { background: 'linear-gradient(90deg, #0077b6, #00a8e0)', color: 'white' },
    secondary: { background: 'var(--secondary)', color: 'var(--primary)' },
    outline: { background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)' },
    ghost: { background: 'transparent', color: 'var(--accent)' },
  }

  const hoverCls = variant === 'primary' ? 'hover:brightness-110 active:scale-95' : 'hover:opacity-90'

  return (
    <button
      className={`${base} ${SIZE_CLS[size]} ${hoverCls} ${className}`}
      style={{ ...variantStyle[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  )
}
