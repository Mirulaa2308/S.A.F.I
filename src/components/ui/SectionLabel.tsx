/** The small uppercase tracking-widest eyebrow label used above headings site-wide (e.g. "ELIGIBILITY CHECK"). */
export default function SectionLabel({
  children,
  color = 'var(--accent)',
  className = '',
}: {
  children: React.ReactNode
  color?: string
  className?: string
}) {
  return (
    <div
      className={`text-xs font-sans-ui font-medium mb-2 uppercase tracking-widest ${className}`}
      style={{ color }}
    >
      {children}
    </div>
  )
}
