import { useState, useCallback } from 'react'
import { useLocation, Link } from 'react-router'
import { SCHEMES } from '../data/schemes'

function calcEMI(principal: number, ratePA: number, months: number): number {
  if (ratePA === 0) return principal / months
  const r = ratePA / 100 / 12
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

export default function Calculator() {
  const { state } = useLocation()
  const preloaded = state?.scheme

  const [schemeId, setSchemeId] = useState(preloaded?.id ?? '')
  const [principal, setPrincipal] = useState(preloaded ? '300000' : '')
  const [rateStr, setRateStr] = useState(preloaded ? preloaded.interest.split('%')[0] : '')
  const [tenureYears, setTenureYears] = useState('5')
  const [subsidy, setSubsidy] = useState('0')
  const [compare, setCompare] = useState(false)
  const [compare2Id, setCompare2Id] = useState('')

  const p = parseFloat(principal) || 0
  const r = parseFloat(rateStr) || 0
  const t = parseInt(tenureYears) * 12 || 60
  const s = parseFloat(subsidy) || 0
  const effectiveP = Math.max(0, p - s)

  const emi = calcEMI(effectiveP, r, t)
  const total = emi * t
  const interest = total - effectiveP

  const scheme2 = SCHEMES.find((sc) => sc.id === compare2Id)
  const r2 = scheme2 ? parseFloat(scheme2.interest.split('%')[0]) : 0
  const emi2 = calcEMI(effectiveP, r2, t)
  const total2 = emi2 * t
  const interest2 = total2 - effectiveP

  function onSchemeChange(id: string) {
    setSchemeId(id)
    const s = SCHEMES.find((sc) => sc.id === id)
    if (s) setRateStr(s.interest.split('%')[0].trim())
  }

  const fmt = (n: number) => isNaN(n) || !isFinite(n) ? '—' : `₹${Math.round(n).toLocaleString('en-IN')}`

  return (
    <div className="min-h-screen py-12 px-6" style={{ background: 'var(--muted)' }}>
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <div className="text-xs font-sans-ui font-medium mb-2 uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Financial Tools</div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>Financial Calculator</h1>
          <p className="text-sm font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>
            Compute EMI, total repayment, and interest outgo for any scheme. Compare two schemes side-by-side. Figures are indicative — actual terms are confirmed by the Channel Partner.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Input panel */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-lg border bg-white p-6" style={{ borderColor: 'var(--border)' }}>
              <h2 className="font-bold mb-5" style={{ color: 'var(--primary)' }}>Loan Parameters</h2>

              <div className="space-y-4">
                <CalcField label="Select Scheme (optional)">
                  <select value={schemeId} onChange={(e) => onSchemeChange(e.target.value)}>
                    <option value="">— Enter manually —</option>
                    {SCHEMES.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.ministry})</option>)}
                  </select>
                </CalcField>

                <CalcField label="Loan Amount (₹)" hint="Amount you intend to borrow">
                  <input type="number" min={0} placeholder="e.g. 300000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                </CalcField>

                <CalcField label="Annual Interest Rate (%)" hint="Pre-filled if scheme selected above">
                  <input type="number" min={0} max={30} step={0.1} placeholder="e.g. 6" value={rateStr} onChange={(e) => setRateStr(e.target.value)} />
                </CalcField>

                <CalcField label="Loan Tenure (Years)">
                  <input type="number" min={1} max={20} placeholder="e.g. 5" value={tenureYears} onChange={(e) => setTenureYears(e.target.value)} />
                </CalcField>

                <CalcField label="Subsidy / Grant (₹)" hint="Capital subsidy or government grant, if applicable">
                  <input type="number" min={0} placeholder="0" value={subsidy} onChange={(e) => setSubsidy(e.target.value)} />
                </CalcField>
              </div>
            </div>

            {/* Compare toggle */}
            <div className="rounded-lg border bg-white p-5" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm" style={{ color: 'var(--primary)' }}>Compare with another scheme</h3>
                <button
                  onClick={() => setCompare(!compare)}
                  className="text-xs font-sans-ui px-3 py-1 rounded border"
                  style={{ borderColor: 'var(--border)', color: compare ? 'var(--accent)' : 'var(--muted-foreground)' }}
                >
                  {compare ? 'On' : 'Off'}
                </button>
              </div>
              {compare && (
                <select
                  value={compare2Id}
                  onChange={(e) => setCompare2Id(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-sans-ui rounded border"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <option value="">Select scheme to compare</option>
                  {SCHEMES.filter((s) => s.id !== schemeId).map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.ministry})</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Results panel */}
          <div className="lg:col-span-3 space-y-5">

            {/* Primary result */}
            <div className="rounded-lg border bg-white overflow-hidden" style={{ borderColor: 'var(--border)' }}>
              <div className="px-6 py-4 border-b" style={{ background: 'var(--primary)', borderColor: 'transparent' }}>
                <div className="text-xs font-sans-ui mb-0.5" style={{ color: '#90bbea' }}>
                  {schemeId ? SCHEMES.find((s) => s.id === schemeId)?.name ?? 'Scheme A' : 'Scheme A'}
                </div>
                <div className="font-bold text-white">EMI &amp; Repayment Summary</div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <ResultStat label="Monthly EMI" value={fmt(emi)} highlight />
                  <ResultStat label="Total Repayment" value={fmt(total)} />
                  <ResultStat label="Total Interest" value={fmt(interest)} />
                </div>

                <div className="space-y-2">
                  {[
                    { label: 'Principal Amount', value: fmt(p) },
                    { label: 'Subsidy / Grant', value: fmt(s) },
                    { label: 'Effective Principal', value: fmt(effectiveP) },
                    { label: 'Rate of Interest', value: r ? `${r}% p.a.` : '—' },
                    { label: 'Tenure', value: tenureYears ? `${tenureYears} years (${t} months)` : '—' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm border-b py-2" style={{ borderColor: 'var(--muted)' }}>
                      <span className="font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>{row.label}</span>
                      <span className="font-sans-ui font-medium" style={{ color: 'var(--foreground)' }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Visual bar */}
                {p > 0 && (
                  <div className="mt-5">
                    <div className="flex justify-between text-xs font-sans-ui mb-1.5" style={{ color: 'var(--muted-foreground)' }}>
                      <span>Principal ({Math.round((effectiveP / (total || 1)) * 100)}%)</span>
                      <span>Interest ({Math.round((interest / (total || 1)) * 100)}%)</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, (effectiveP / (total || 1)) * 100)}%`,
                          background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Comparison result */}
            {compare && compare2Id && (
              <div className="rounded-lg border bg-white overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                <div className="px-6 py-4 border-b" style={{ background: '#2a4f7c', borderColor: 'transparent' }}>
                  <div className="text-xs font-sans-ui mb-0.5" style={{ color: '#90bbea' }}>
                    {scheme2?.name ?? 'Scheme B'} — Comparison
                  </div>
                  <div className="font-bold text-white">Side-by-Side Comparison</div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <ResultStat label="Monthly EMI" value={fmt(emi2)} highlight />
                    <ResultStat label="Total Repayment" value={fmt(total2)} />
                    <ResultStat label="Total Interest" value={fmt(interest2)} />
                  </div>
                  <div
                    className="rounded-lg px-4 py-3 text-sm font-sans-ui"
                    style={{ background: 'var(--secondary)', color: 'var(--foreground)' }}
                  >
                    {emi < emi2
                      ? `Scheme A saves ₹${Math.round(emi2 - emi).toLocaleString('en-IN')}/month (₹${Math.round(interest2 - interest).toLocaleString('en-IN')} in total interest).`
                      : emi > emi2
                      ? `Scheme B saves ₹${Math.round(emi - emi2).toLocaleString('en-IN')}/month (₹${Math.round(interest - interest2).toLocaleString('en-IN')} in total interest).`
                      : 'Both schemes result in the same EMI.'}
                  </div>
                </div>
              </div>
            )}

            <div
              className="rounded-lg px-5 py-3 text-xs font-sans-ui"
              style={{ background: 'white', border: '1px solid var(--border)', color: 'var(--muted-foreground)' }}
            >
              Figures are indicative estimates. Actual EMI may vary based on processing fees, insurance, and repayment schedule defined by the Channel Partner. Subsidy disbursement timelines vary by scheme.
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/recommendations" className="text-sm font-sans-ui px-4 py-2 rounded border" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                ← Back to Recommendations
              </Link>
              <Link to="/partners" className="text-sm font-sans-ui px-4 py-2 rounded" style={{ background: 'var(--primary)', color: 'white' }}>
                Find Channel Partner →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CalcField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>{label}</label>
      {hint && <p className="text-xs font-sans-ui mb-1" style={{ color: 'var(--muted-foreground)' }}>{hint}</p>}
      <div className="[&_select]:w-full [&_select]:px-3 [&_select]:py-2.5 [&_select]:rounded [&_select]:border [&_select]:text-sm [&_select]:font-sans-ui [&_input]:w-full [&_input]:px-3 [&_input]:py-2.5 [&_input]:rounded [&_input]:border [&_input]:text-sm [&_input]:font-sans-ui">
        {children}
      </div>
    </div>
  )
}

function ResultStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="text-center p-3 rounded-lg" style={{ background: 'var(--muted)' }}>
      <div className="text-xs font-sans-ui mb-1" style={{ color: 'var(--muted-foreground)' }}>{label}</div>
      <div className={`font-bold ${highlight ? 'text-xl' : 'text-base'}`} style={{ color: highlight ? 'var(--primary)' : 'var(--foreground)' }}>{value}</div>
    </div>
  )
}
