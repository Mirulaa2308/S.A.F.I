import { useNavigate, Link } from 'react-router'
import { useLang, t } from '../context/LanguageContext'

const JOURNEY = [
  { step: 1, label: 'User Details', icon: '📋', desc: 'Income, category, purpose, state' },
  { step: 2, label: 'Eligibility Check', icon: '⚖️', desc: 'Official scheme rules applied' },
  { step: 3, label: 'Eligible Schemes', icon: '📑', desc: 'Only matching schemes shown' },
  { step: 4, label: 'Ranked Results', icon: '🏆', desc: 'AI ranks by suitability' },
  { step: 5, label: 'Calculator', icon: '🧮', desc: 'EMI, subsidy & comparison' },
  { step: 6, label: 'Channel Partners', icon: '📍', desc: 'Nearest authorised lenders' },
  { step: 7, label: 'AI Guidance', icon: '🗣️', desc: 'Multilingual explanations' },
]

const CAPABILITIES = [
  {
    icon: '⚖️',
    title: 'Smart Scheme Matching',
    desc: 'Rule-based eligibility engine cross-references your profile against 150+ Central and State government schemes to surface only schemes you qualify for. No predictions — official criteria only.',
  },
  {
    icon: '🧮',
    title: 'Financial Calculator',
    desc: 'Compute EMI, total repayment, subsidy benefit, and effective interest rate for any eligible scheme. Compare multiple schemes side-by-side before you approach a lender.',
  },
  {
    icon: '📍',
    title: 'Geo-Spatial Channel Partner Locator & Router',
    desc: 'Locate authorised banks, NBFCs, and cooperative societies on an interactive map, ranked by proximity and scheme availability. Get directions to the nearest suitable partner.',
  },
  {
    icon: '🗣️',
    title: 'AI-Assisted Multilingual Guidance',
    desc: 'Plain-language explanations of eligible schemes and required documents in 22 Indian languages. SAFI summarises verified official information — it does not approve or reject applications.',
  },
]

const STATS = [
  { value: '150+', label: 'Government Schemes' },
  { value: '28', label: 'States & UTs Covered' },
  { value: '22', label: 'Regional Languages' },
  { value: '12,000+', label: 'Authorised Channel Partners' },
]

const SAMPLE_SCHEMES = [
  { id: 'nsfdc-term-loan', ministry: 'NSFDC', name: 'Term Loan Scheme', maxLoan: '₹15,00,000', interest: '6% p.a.', eligible: ['SC', 'ST'] },
  { id: 'nbcfdc-education-loan', ministry: 'NBCFDC', name: 'Educational Loan Scheme', maxLoan: '₹10,00,000', interest: '4–6% p.a.', eligible: ['OBC', 'EWS'] },
  { id: 'nskfdc-micro-credit', ministry: 'NSKFDC', name: 'Micro Credit Finance', maxLoan: '₹5,00,000', interest: '5% p.a.', eligible: ['SC', 'EWS'] },
]

export default function Home() {
  const { lang } = useLang()
  const navigate = useNavigate()

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="py-20 px-6"
        style={{ background: 'linear-gradient(160deg, #0f1e3c 0%, #1a3a6b 55%, #0077b6 100%)' }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>


            <h1 className="text-3xl lg:text-4xl leading-snug font-bold text-white mb-5">
              Find the right government scheme. Understand your options. Take the next step with confidence.
            </h1>

            <p className="mb-8" style={{ color: '#a8c4e0', lineHeight: 1.8, fontSize: '1.05rem' }}>
              SAFI connects eligible citizens to government financial and educational loan schemes, ranks your options, and guides you to authorised Channel Partners — in your language.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => navigate('/search')}
                className="relative flex items-center gap-2.5 px-7 py-3.5 rounded font-sans-ui font-semibold text-sm transition-all hover:brightness-110 active:scale-95 shadow-lg"
                style={{ background: 'linear-gradient(90deg, #0077b6 0%, #00a8e0 100%)', color: '#fff' }}
              >
                <span className="w-2 h-2 rounded-full bg-white/60 inline-block" />
                {t('findMyScheme', lang)}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => navigate('/schemes')}
                className="px-7 py-3.5 rounded font-sans-ui font-medium text-sm border transition-colors hover:bg-white/10"
                style={{ borderColor: '#4a7fc1', color: '#ffffff' }}
              >
                Explore Schemes
              </button>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {['Ministry of Social Justice & Empowerment', 'National Data Security Standards', 'Multilingual · 22 Languages'].map((t) => (
                <span key={t} className="text-xs font-sans-ui" style={{ color: '#7aa5c8' }}>✓ {t}</span>
              ))}
            </div>
          </div>

          {/* Right: feature tiles */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="rounded-lg p-5 border"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className="text-2xl mb-3">{c.icon}</div>
                <div className="text-sm font-bold text-white mb-1.5">{c.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: '#90bbea' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="border-b" style={{ background: '#f4f7fb', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{s.value}</div>
              <div className="text-sm mt-1 font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Process ── */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #f4f7fb 0%, #e8eef7 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-2xl">
            <div className="text-xs font-sans-ui font-medium mb-3 uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              How SAFI Works
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
              User Details → Eligibility Check → Eligible Schemes → Ranked Recommendations → Calculator → Channel Partners → AI Guidance
            </h2>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Every step is transparent and rule-based. Eligibility is determined by official scheme criteria, not AI predictions.
            </p>
          </div>

          {/* Desktop flow */}
          <div className="hidden lg:flex items-stretch gap-2 overflow-x-auto pb-2">
            {JOURNEY.map((s, i) => (
              <div key={s.step} className="flex items-center shrink-0">
                <div
                  className="rounded-lg p-4 border w-40"
                  style={{ background: 'white', borderColor: 'var(--border)', borderTopColor: 'var(--primary)', borderTopWidth: 3 }}
                >
                  <div className="text-lg mb-2">{s.icon}</div>
                  <div className="text-xs font-sans-ui font-bold mb-0.5 uppercase tracking-wide" style={{ color: 'var(--accent)' }}>Step {s.step}</div>
                  <div className="font-bold text-sm mb-1" style={{ color: 'var(--primary)' }}>{s.label}</div>
                  <div className="text-xs font-sans-ui leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{s.desc}</div>
                </div>
                {i < JOURNEY.length - 1 && (
                  <div className="flex items-center px-1">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9h12M11 5l4 4-4 4" stroke="#0077b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="lg:hidden space-y-3">
            {JOURNEY.map((s, i) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-sans-ui text-white" style={{ background: 'var(--primary)' }}>
                    {s.step}
                  </div>
                  {i < JOURNEY.length - 1 && <div className="w-px h-6 mt-1" style={{ background: 'var(--border)' }} />}
                </div>
                <div className="flex-1 rounded-lg p-4 border bg-white mb-2" style={{ borderColor: 'var(--border)', borderLeftColor: 'var(--primary)', borderLeftWidth: 3 }}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span>{s.icon}</span>
                    <div className="font-bold text-sm" style={{ color: 'var(--primary)' }}>{s.label}</div>
                  </div>
                  <div className="text-xs font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample scheme cards ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-sans-ui font-medium mb-2 uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Sample Schemes</div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>Government schemes at a glance</h2>
            </div>
            <Link to="/schemes" className="text-sm font-sans-ui" style={{ color: 'var(--accent)' }}>View all →</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SAMPLE_SCHEMES.map((s) => (
              <div key={s.id} className="rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                <div className="px-6 py-4" style={{ background: 'var(--primary)' }}>
                  <div className="text-xs font-sans-ui mb-1" style={{ color: '#90bbea' }}>{s.ministry}</div>
                  <div className="font-bold text-white">{s.name}</div>
                </div>
                <div className="px-6 py-5 space-y-3" style={{ background: 'var(--card)' }}>
                  <div className="flex justify-between text-xs font-sans-ui">
                    <span style={{ color: 'var(--muted-foreground)' }}>Max Loan</span>
                    <span className="font-semibold" style={{ color: 'var(--accent)' }}>{s.maxLoan}</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans-ui">
                    <span style={{ color: 'var(--muted-foreground)' }}>Interest Rate</span>
                    <span style={{ color: 'var(--foreground)' }}>{s.interest}</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    {s.eligible.map((e) => (
                      <span key={e} className="text-xs font-sans-ui font-medium px-2.5 py-1 rounded-full" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>{e}</span>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-3 border-t bg-white" style={{ borderColor: 'var(--border)' }}>
                  <Link
                    to={`/schemes/${s.id}`}
                    className="block text-center text-sm font-sans-ui font-medium py-1.5 rounded border transition-colors hover:bg-blue-50"
                    style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/search')}
              className="px-8 py-3 rounded font-sans-ui font-semibold text-sm transition-all hover:brightness-110 shadow"
              style={{ background: 'linear-gradient(90deg, #0077b6, #00a8e0)', color: 'white' }}
            >
              Check My Eligibility →
            </button>
            <p className="mt-2 text-xs font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>
              Eligibility determined by official scheme rules. AI ranks and explains verified results only.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(160deg, #0f1e3c 0%, #1a3a6b 100%)' }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-sans-ui font-medium mb-3 uppercase tracking-widest" style={{ color: '#90bbea' }}>Our Mandate</div>
            <h2 className="text-3xl font-bold text-white mb-5">Closing the awareness gap in government financial assistance</h2>
            <p className="mb-6" style={{ color: '#a8c4e0', lineHeight: 1.8 }}>
              A significant share of eligible beneficiaries never access government schemes due to information barriers — language, literacy, complexity, and distance. SAFI addresses all four through a single integrated platform under the Ministry of Social Justice and Empowerment.
            </p>
            <blockquote className="border-l-2 pl-6 mb-8" style={{ borderColor: '#0077b6' }}>
              <p className="italic" style={{ color: '#90bbea' }}>
                "SAFI does not replace official processes. It removes the barriers that prevent citizens from reaching them."
              </p>
            </blockquote>


          </div>
          <div className="space-y-4">
            {[
              { icon: '📜', title: 'Rule-based Eligibility', body: 'Scheme eligibility is determined by codified official rules, not predictions. Every decision is traceable and explainable.' },
              { icon: '🔒', title: 'Data Minimisation', body: 'Only the minimum information required for eligibility matching is collected. Session data is not persisted without explicit consent.' },
              { icon: '🏦', title: 'No Loan Disbursement', body: 'SAFI is an information and guidance platform. It does not originate, approve, or disburse any loan or financial product.' },
              { icon: '♿', title: 'Accessibility First', body: 'Designed to WCAG 2.1 AA standards, with screen-reader support and colour contrast ratios meeting government digital accessibility guidelines.' },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 rounded-lg p-5 border" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <div className="font-bold text-white text-sm mb-1">{f.title}</div>
                  <div className="text-sm" style={{ color: '#a8c4e0' }}>{f.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 pt-14 pb-8 border-t" style={{ background: '#0f1e3c', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            {[
              { heading: 'Platform', links: [['Search Scheme', '/search'], ['Explore Schemes', '/schemes'], ['Financial Calculator', '/calculator'], ['Channel Partners', '/partners'], ['SAFI Assistant', '/assistant']] },
              { heading: 'Schemes', links: [['NSFDC', '/schemes'], ['NBCFDC', '/schemes'], ['NSKFDC', '/schemes'], ['NMDFC', '/schemes'], ['State Corporations', '/schemes']] },
              { heading: 'Account', links: [['Login', '/login'], ['Create Account', '/login'], ['Help & FAQ', '/assistant'], ['Accessibility', '/'], ['Privacy Policy', '/']] },
            ].map((col) => (
              <div key={col.heading}>
                <div className="text-xs font-sans-ui font-semibold mb-4 uppercase tracking-widest" style={{ color: '#90bbea' }}>{col.heading}</div>
                <ul className="space-y-2.5">
                  {col.links.map(([label, path]) => (
                    <li key={label}>
                      <Link to={path} className="text-xs font-sans-ui hover:text-white transition-colors" style={{ color: '#7aa5c8' }}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-sans-ui" style={{ color: '#4a5f82' }}>
              SAFI is an information &amp; guidance platform. Not a loan originator, approver, or disbursement system.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
