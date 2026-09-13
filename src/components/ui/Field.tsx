import { type ReactNode } from 'react'

interface FieldProps {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}

/**
 * Shared labeled-field wrapper for forms. Consolidates what was previously
 * duplicated as `Field` (SearchScheme) and `CalcField` (Calculator).
 * Styles any nested <input>/<select>/<textarea> consistently.
 */
export default function Field({ label, required, hint, children }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>
        {label}
        {required && (
          <span className="ml-0.5" style={{ color: '#c0392b' }}>
            *
          </span>
        )}
      </label>
      {hint && (
        <p className="text-xs font-sans-ui mb-1.5" style={{ color: 'var(--muted-foreground)' }}>
          {hint}
        </p>
      )}
      <div
        className="[&_select]:w-full [&_select]:px-3 [&_select]:py-2.5 [&_select]:rounded [&_select]:border [&_select]:border-[color:var(--border)] [&_select]:text-sm [&_select]:font-sans-ui
                   [&_input]:w-full [&_input]:px-3 [&_input]:py-2.5 [&_input]:rounded [&_input]:border [&_input]:border-[color:var(--border)] [&_input]:text-sm [&_input]:font-sans-ui
                   [&_select]:block [&_input]:block"
        style={{ ['--tw-ring-color' as string]: 'var(--accent)' }}
      >
        {children}
      </div>
    </div>
  )
}
