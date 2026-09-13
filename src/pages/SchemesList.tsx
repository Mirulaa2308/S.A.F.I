import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { SCHEMES } from '../data/schemes'

export default function SchemesList() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('')

  const filtered = SCHEMES.filter(
    (s) =>
      filter === '' ||
      s.eligible.includes(filter) ||
      s.purpose.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="min-h-screen py-12 px-6" style={{ background: 'var(--muted)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className="rounded-xl px-8 py-10 mb-10"
          style={{ background: 'linear-gradient(135deg, #0f1e3c 0%, #1a3a6b 100%)' }}
        >
          <div className="text-xs font-sans-ui font-medium mb-2 uppercase tracking-widest" style={{ color: '#90bbea' }}>
            Scheme Directory
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Government Financial Assistance Schemes</h1>
          <p className="text-sm font-sans-ui mb-6" style={{ color: '#a8c4e0' }}>
            Schemes administered by NSFDC, NBCFDC, NSKFDC, NMDFC and allied bodies under the Ministry of Social Justice &amp; Empowerment.
          </p>
          <div className="flex flex-wrap gap-2">
            {['', 'SC', 'ST', 'OBC', 'EWS'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="text-xs font-sans-ui px-3 py-1.5 rounded-full border transition-colors"
                style={{
                  background: filter === cat ? '#0077b6' : 'rgba(255,255,255,0.08)',
                  borderColor: filter === cat ? '#0077b6' : 'rgba(255,255,255,0.2)',
                  color: 'white',
                }}
              >
                {cat === '' ? 'All Schemes' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((s) => (
            <div key={s.id} className="rounded-lg border bg-white overflow-hidden" style={{ borderColor: 'var(--border)' }}>
              <div className="px-6 py-4" style={{ background: 'var(--primary)' }}>
                <div className="text-xs font-sans-ui mb-1" style={{ color: '#90bbea' }}>{s.ministry}</div>
                <div className="font-bold text-white">{s.name}</div>
                <div className="text-xs font-sans-ui mt-1" style={{ color: '#a8c4e0' }}>{s.purpose}</div>
              </div>
              <div className="px-6 py-4 space-y-2.5">
                <Row label="Max Loan" value={s.maxLoan} highlight />
                <Row label="Interest Rate" value={s.interest} />
                <Row label="Income Limit" value={s.maxIncome} />
                <div className="flex gap-2 pt-1">
                  {s.eligible.map((e) => (
                    <span key={e} className="text-xs font-sans-ui font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>{e}</span>
                  ))}
                </div>
              </div>
              <div className="px-6 py-3 border-t flex gap-3" style={{ borderColor: 'var(--border)', background: '#fafcff' }}>
                <Link
                  to={`/schemes/${s.id}`}
                  className="flex-1 text-center text-sm font-sans-ui font-medium py-1.5 rounded border transition-colors hover:bg-blue-50"
                  style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                >
                  View Details
                </Link>
                <button
                  onClick={() => navigate('/search')}
                  className="flex-1 text-sm font-sans-ui font-medium py-1.5 rounded"
                  style={{ background: 'var(--primary)', color: 'white' }}
                >
                  Check Eligibility
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm font-sans-ui mb-4" style={{ color: 'var(--muted-foreground)' }}>
            Use the eligibility checker to see only the schemes you qualify for.
          </p>
          <button
            onClick={() => navigate('/search')}
            className="px-8 py-3 rounded font-sans-ui font-semibold text-sm"
            style={{ background: 'linear-gradient(90deg, #0077b6, #00a8e0)', color: 'white' }}
          >
            Search My Scheme →
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-xs font-sans-ui shrink-0" style={{ color: 'var(--muted-foreground)' }}>{label}</span>
      <span className="text-xs font-sans-ui text-right" style={{ color: highlight ? 'var(--accent)' : 'var(--foreground)', fontWeight: highlight ? 600 : 400 }}>{value}</span>
    </div>
  )
}
