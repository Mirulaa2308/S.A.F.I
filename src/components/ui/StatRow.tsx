/** Horizontal label/value row (used in Recommendations, SchemesList, SchemeDetails). */
export function StatRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-2 py-1.5 border-b" style={{ borderColor: 'var(--muted)' }}>
      <span className="text-xs font-sans-ui shrink-0" style={{ color: 'var(--muted-foreground)' }}>
        {label}
      </span>
      <span
        className="text-xs font-sans-ui text-right"
        style={{ color: highlight ? 'var(--accent)' : 'var(--foreground)', fontWeight: highlight ? 600 : 400 }}
      >
        {value}
      </span>
    </div>
  )
}

/** Centered stat block used in the Calculator results panel. */
export function StatBlock({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="text-center p-3 rounded-lg" style={{ background: 'var(--muted)' }}>
      <div className="text-xs font-sans-ui mb-1" style={{ color: 'var(--muted-foreground)' }}>
        {label}
      </div>
      <div
        className={`font-bold ${highlight ? 'text-xl' : 'text-base'}`}
        style={{ color: highlight ? 'var(--primary)' : 'var(--foreground)' }}
      >
        {value}
      </div>
    </div>
  )
}
