import { useParams, Link, useNavigate } from 'react-router'
import { SCHEMES } from '../data/schemes'

export default function SchemeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const scheme = SCHEMES.find((s) => s.id === id)

  if (!scheme) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-4xl mb-4">📋</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--primary)' }}>Scheme not found</h2>
          <Link to="/schemes" className="text-sm font-sans-ui" style={{ color: 'var(--accent)' }}>← Back to schemes</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-6" style={{ background: 'var(--muted)' }}>
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="text-xs font-sans-ui mb-6 flex items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
          <Link to="/schemes" style={{ color: 'var(--accent)' }}>Schemes</Link>
          <span>›</span>
          <span style={{ color: 'var(--foreground)' }}>{scheme.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header card */}
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
              <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #0f1e3c, #1a3a6b)' }}>
                <div className="text-xs font-sans-ui mb-2" style={{ color: '#90bbea' }}>{scheme.ministry}</div>
                <h1 className="text-2xl font-bold text-white mb-2">{scheme.name}</h1>
                <p className="text-sm" style={{ color: '#a8c4e0' }}>{scheme.purpose}</p>
                <div className="flex gap-2 mt-3">
                  {scheme.eligible.map((e) => (
                    <span key={e} className="text-xs font-sans-ui font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.12)', color: 'white' }}>{e}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 divide-x" style={{ background: 'white', borderTop: '1px solid var(--border)', ['--tw-divide-opacity' as string]: 1 }}>
                {[
                  { label: 'Max Loan', value: scheme.maxLoan },
                  { label: 'Interest Rate', value: scheme.interest },
                  { label: 'Income Limit', value: scheme.maxIncome },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-4 text-center" style={{ borderColor: 'var(--border)' }}>
                    <div className="text-xs font-sans-ui mb-1" style={{ color: 'var(--muted-foreground)' }}>{s.label}</div>
                    <div className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="rounded-lg p-6 bg-white border" style={{ borderColor: 'var(--border)' }}>
              <h2 className="font-bold text-lg mb-3" style={{ color: 'var(--primary)' }}>About This Scheme</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{scheme.description}</p>
            </div>

            {/* Key Features */}
            <div className="rounded-lg p-6 bg-white border" style={{ borderColor: 'var(--border)' }}>
              <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--primary)' }}>Key Features</h2>
              <ul className="space-y-3">
                {scheme.features.map((f) => (
                  <li key={f} className="flex gap-3 items-start text-sm" style={{ color: 'var(--foreground)' }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 text-white" style={{ background: 'var(--primary)' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents required */}
            <div className="rounded-lg p-6 bg-white border" style={{ borderColor: 'var(--border)' }}>
              <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--primary)' }}>Documents Required</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {scheme.documents.map((d, i) => (
                  <div key={i} className="flex gap-2 items-start text-sm p-2.5 rounded" style={{ background: 'var(--muted)', color: 'var(--foreground)' }}>
                    <span className="text-xs font-sans-ui font-bold shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>{i + 1}.</span>
                    {d}
                  </div>
                ))}
              </div>
              <p className="text-xs font-sans-ui mt-4" style={{ color: 'var(--muted-foreground)' }}>
                Document requirements may vary by state and Channel Partner. Verify with the administering body before applying.
              </p>
            </div>

            {/* Disclaimer */}
            <div
              className="rounded-lg px-5 py-4 border-l-4 text-sm font-sans-ui"
              style={{ background: 'white', borderColor: 'var(--accent)', color: 'var(--muted-foreground)' }}
            >
              <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Important:</span> This information is provided for reference only. SAFI does not originate, approve, or disburse loans. Final eligibility assessment and loan sanction are performed exclusively by the administering Channel Partner or government body.
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="rounded-lg p-5 border bg-white sticky top-24" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-bold mb-4" style={{ color: 'var(--primary)' }}>Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/search')}
                  className="w-full py-2.5 rounded text-sm font-sans-ui font-semibold transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(90deg, #0077b6, #00a8e0)', color: 'white' }}
                >
                  Check My Eligibility →
                </button>
                <Link
                  to="/calculator"
                  state={{ scheme }}
                  className="block w-full py-2.5 rounded text-sm font-sans-ui font-medium text-center border transition-colors hover:bg-blue-50"
                  style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                >
                  Calculate EMI
                </Link>
                <Link
                  to="/partners"
                  className="block w-full py-2.5 rounded text-sm font-sans-ui font-medium text-center border transition-colors hover:bg-blue-50"
                  style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                >
                  Find Channel Partner
                </Link>
                <Link
                  to="/assistant"
                  className="block w-full py-2.5 rounded text-sm font-sans-ui font-medium text-center"
                  style={{ background: 'var(--secondary)', color: 'var(--primary)' }}
                >
                  ✦ Ask SAFI About This Scheme
                </Link>
              </div>

              <div className="mt-5 pt-5 border-t space-y-2" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs font-sans-ui font-semibold mb-2" style={{ color: 'var(--muted-foreground)' }}>Eligibility Summary</div>
                {[
                  { label: 'Categories', value: scheme.eligible.join(', ') },
                  { label: 'Max Income', value: scheme.maxIncome },
                  { label: 'Subsidy', value: scheme.subsidy },
                ].map((r) => (
                  <div key={r.label} className="text-xs font-sans-ui flex justify-between gap-2">
                    <span style={{ color: 'var(--muted-foreground)' }}>{r.label}</span>
                    <span className="text-right font-medium" style={{ color: 'var(--foreground)' }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
