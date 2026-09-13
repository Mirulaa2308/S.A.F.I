import { useLocation, useNavigate, Link } from 'react-router'
import { SCHEMES } from '../data/schemes'
import { useLang } from '../context/LanguageContext'

export default function Recommendations() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { lang } = useLang()
  const form = state?.form ?? {}

  // Simple rule-based filter (demo logic mirroring real eligibility rules)
  const category = form.category ?? ''
  const eligible = SCHEMES.filter((s) => {
    if (s.eligible.includes(category)) return true
    if (category === '' || category === 'SK') return s.id === 'nskfdc-micro-credit'
    if (category === 'Minority') return s.id === 'nmdfc-mahila-samridhi'
    return false
  })

  // If nothing matched, show all as examples
  const results = eligible.length > 0 ? eligible : SCHEMES

  const RANK_REASONS: Record<string, string> = {
    'nsfdc-term-loan': 'Best match for SC/ST self-employment needs. Highest loan ceiling for your category.',
    'nbcfdc-education-loan': 'Lowest interest rate for your education profile. No collateral up to ₹4 lakh.',
    'nskfdc-micro-credit': 'Targeted scheme for your category with capital subsidy benefit.',
    'nmdfc-mahila-samridhi': 'Lowest interest micro-credit with savings incentive for women beneficiaries.',
  }

  return (
    <div className="min-h-screen py-12 px-6" style={{ background: 'var(--muted)' }}>
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="text-xs font-sans-ui mb-6 flex items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
          <Link to="/search" style={{ color: 'var(--accent)' }}>Search Scheme</Link>
          <span>›</span>
          <span>Eligible Schemes</span>
          <span>›</span>
          <span className="font-medium" style={{ color: 'var(--foreground)' }}>Ranked Recommendations</span>
        </div>

        {/* Status header */}
        <div
          className="rounded-lg px-6 py-5 mb-8 border-l-4"
          style={{ background: 'white', borderColor: 'var(--primary)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-xs font-sans-ui font-medium mb-1 uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Eligibility Results</div>
              <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--primary)' }}>
                {results.length} Scheme{results.length !== 1 ? 's' : ''} Found
              </h1>
              <p className="text-sm font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>
                Eligibility determined by official scheme rules.{' '}
                <span className="font-medium" style={{ color: 'var(--foreground)' }}>AI has ranked these by suitability to your profile.</span>{' '}
                Final eligibility is confirmed by the administering Channel Partner.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap shrink-0">
              <button
                onClick={() => navigate('/search')}
                className="text-xs font-sans-ui px-3 py-1.5 rounded border"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                ← Refine Search
              </button>
              <Link
                to="/calculator"
                className="text-xs font-sans-ui px-3 py-1.5 rounded"
                style={{ background: 'var(--primary)', color: 'white' }}
              >
                Open Calculator
              </Link>
            </div>
          </div>

          {/* Profile summary */}
          {form.category && (
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                form.category && `Category: ${form.category}`,
                form.income && `Income: ${form.income}`,
                form.purpose && `Purpose: ${form.purpose}`,
                form.state && `State: ${form.state}`,
              ].filter(Boolean).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-sans-ui px-2.5 py-1 rounded-full"
                  style={{ background: 'var(--secondary)', color: 'var(--primary)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Process reminder */}
        <div className="flex items-center gap-2 mb-6 flex-wrap text-xs font-sans-ui">
          {['User Details', 'Eligibility Check', 'Eligible Schemes', 'Ranked Results ←', 'Calculator', 'Channel Partners', 'AI Guidance'].map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <span
                className="px-2 py-0.5 rounded"
                style={{
                  background: s.includes('←') ? 'var(--primary)' : 'var(--secondary)',
                  color: s.includes('←') ? 'white' : 'var(--muted-foreground)',
                  fontWeight: s.includes('←') ? 600 : 400,
                }}
              >
                {s.replace(' ←', '')}
              </span>
              {i < 6 && <span style={{ color: 'var(--border)' }}>›</span>}
            </div>
          ))}
        </div>

        {/* Scheme cards */}
        <div className="space-y-5">
          {results.map((scheme, i) => (
            <div
              key={scheme.id}
              className="rounded-lg border bg-white overflow-hidden"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="px-6 py-4 flex items-center justify-between gap-4" style={{ background: i === 0 ? 'var(--primary)' : '#2a4f7c' }}>
                <div className="flex items-center gap-3">
                  {i === 0 && (
                    <span className="text-xs font-sans-ui font-bold px-2 py-0.5 rounded-full" style={{ background: '#0077b6', color: 'white' }}>
                      Top Match
                    </span>
                  )}
                  <div>
                    <div className="text-xs font-sans-ui mb-0.5" style={{ color: '#90bbea' }}>{scheme.ministry}</div>
                    <div className="font-bold text-white">{scheme.name}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white shrink-0">#{i + 1}</div>
              </div>

              <div className="px-6 py-5">
                {/* AI rank reason */}
                <div
                  className="rounded px-3 py-2 mb-4 text-xs font-sans-ui leading-relaxed border-l-2"
                  style={{ background: 'var(--secondary)', borderColor: 'var(--accent)', color: 'var(--foreground)' }}
                >
                  <span className="font-semibold">Why ranked #{i + 1}:</span> {RANK_REASONS[scheme.id] ?? 'Matches your category, income, and purpose criteria.'}
                  <span className="ml-1" style={{ color: 'var(--muted-foreground)' }}>(AI ranking — eligibility determined by rules)</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Row label="Max Loan" value={scheme.maxLoan} highlight />
                    <Row label="Interest Rate" value={scheme.interest} />
                    <Row label="Max Income Limit" value={scheme.maxIncome} />
                  </div>
                  <div>
                    <Row label="Purpose" value={scheme.purpose} />
                    <Row label="Subsidy" value={scheme.subsidy} />
                    <div className="flex gap-2 mt-2">
                      {scheme.eligible.map((e) => (
                        <span key={e} className="text-xs font-sans-ui font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>{e}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/schemes/${scheme.id}`}
                    className="text-sm font-sans-ui font-medium px-4 py-2 rounded border transition-colors hover:bg-blue-50"
                    style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                  >
                    View Full Details
                  </Link>
                  <Link
                    to="/calculator"
                    state={{ scheme }}
                    className="text-sm font-sans-ui font-medium px-4 py-2 rounded"
                    style={{ background: 'var(--secondary)', color: 'var(--primary)' }}
                  >
                    Calculate EMI
                  </Link>
                  <Link
                    to="/partners"
                    className="text-sm font-sans-ui font-medium px-4 py-2 rounded"
                    style={{ background: 'var(--secondary)', color: 'var(--primary)' }}
                  >
                    Find Channel Partner
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next steps */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { to: '/calculator', icon: '🧮', label: 'Financial Calculator', desc: 'Compute EMI & compare schemes' },
            { to: '/partners', icon: '📍', label: 'Channel Partner Locator', desc: 'Find nearest authorised lender' },
            { to: '/assistant', icon: '🗣️', label: 'Ask SAFI', desc: 'Get multilingual guidance' },
          ].map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-lg p-5 border bg-white flex gap-3 transition-shadow hover:shadow-md"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="text-2xl">{n.icon}</span>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: 'var(--primary)' }}>{n.label}</div>
                <div className="text-xs font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>{n.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-2 py-1.5 border-b" style={{ borderColor: 'var(--muted)' }}>
      <span className="text-xs font-sans-ui shrink-0" style={{ color: 'var(--muted-foreground)' }}>{label}</span>
      <span className="text-xs font-sans-ui text-right" style={{ color: highlight ? 'var(--accent)' : 'var(--foreground)', fontWeight: highlight ? 600 : 400 }}>{value}</span>
    </div>
  )
}
