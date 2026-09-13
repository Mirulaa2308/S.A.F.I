import { useState } from 'react'
import { Link } from 'react-router'

const PARTNER_TYPES = [
  { type: 'Public Sector Bank', count: '2,400+', icon: '🏛️', schemes: 'NSFDC, NBCFDC, NSKFDC' },
  { type: 'Regional Rural Bank', count: '860+', icon: '🌾', schemes: 'NSFDC, Agricultural schemes' },
  { type: 'NBFC (Authorised)', count: '340+', icon: '📋', schemes: 'NBCFDC, NMDFC' },
  { type: 'Cooperative Society', count: '8,500+', icon: '🤝', schemes: 'State SC/ST Corporations' },
  { type: 'Microfinance Institution', count: '120+', icon: '💼', schemes: 'NMDFC, SHG-linked schemes' },
]

const SAMPLE_PARTNERS = [
  { name: 'Punjab National Bank', type: 'Public Sector Bank', district: 'New Delhi', state: 'Delhi', distance: '1.2 km', schemes: ['NSFDC Term Loan', 'NBCFDC Education Loan'], verified: true },
  { name: 'Bank of Baroda', type: 'Public Sector Bank', district: 'New Delhi', state: 'Delhi', distance: '2.8 km', schemes: ['NSFDC Term Loan', 'NSKFDC Micro Credit'], verified: true },
  { name: 'Gramin Bank of Aryavart', type: 'Regional Rural Bank', district: 'Lucknow', state: 'Uttar Pradesh', distance: '4.1 km', schemes: ['NSFDC Term Loan'], verified: true },
  { name: 'Karnataka State Finance Corporation', type: 'State Corporation', district: 'Bengaluru', state: 'Karnataka', distance: '3.5 km', schemes: ['NBCFDC Education Loan', 'NMDFC Mahila Samridhi'], verified: true },
]

export default function Partners() {
  const [state, setState] = useState('')
  const [type, setType] = useState('')
  const [scheme, setScheme] = useState('')
  const [pin, setPin] = useState('')
  const [searched, setSearched] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearched(true)
  }

  return (
    <div className="min-h-screen py-12 px-6" style={{ background: 'var(--muted)' }}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <div className="text-xs font-sans-ui font-medium mb-2 uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Channel Partner Network</div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>Find Authorised Channel Partners</h1>
          <p className="text-sm font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>
            SAFI only surfaces RBI-regulated, scheme-authorised Channel Partners. Locate the nearest suitable branch for your scheme and get routing directions.
          </p>
        </div>

        {/* Partner type summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {PARTNER_TYPES.map((p) => (
            <div
              key={p.type}
              className="rounded-lg p-4 border bg-white text-center cursor-pointer transition-shadow hover:shadow-md"
              style={{ borderColor: type === p.type ? 'var(--primary)' : 'var(--border)', borderWidth: type === p.type ? 2 : 1 }}
              onClick={() => setType(type === p.type ? '' : p.type)}
            >
              <div className="text-2xl mb-1.5">{p.icon}</div>
              <div className="text-base font-bold" style={{ color: 'var(--primary)' }}>{p.count}</div>
              <div className="text-xs font-sans-ui leading-tight mt-1" style={{ color: 'var(--muted-foreground)' }}>{p.type}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search panel */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSearch} className="rounded-lg border bg-white p-6 space-y-4 sticky top-24" style={{ borderColor: 'var(--border)' }}>
              <h2 className="font-bold" style={{ color: 'var(--primary)' }}>Search Partners</h2>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>PIN Code</label>
                <input
                  type="text" pattern="[0-9]{6}" maxLength={6} placeholder="6-digit PIN code"
                  value={pin} onChange={(e) => setPin(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-sans-ui rounded border"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>State</label>
                <select
                  value={state} onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-sans-ui rounded border"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <option value="">All states</option>
                  {['Delhi', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>Partner Type</label>
                <select
                  value={type} onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-sans-ui rounded border"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <option value="">All types</option>
                  {PARTNER_TYPES.map((p) => <option key={p.type}>{p.type}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>Scheme</label>
                <select
                  value={scheme} onChange={(e) => setScheme(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-sans-ui rounded border"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <option value="">All schemes</option>
                  <option>NSFDC Term Loan</option>
                  <option>NBCFDC Education Loan</option>
                  <option>NSKFDC Micro Credit</option>
                  <option>NMDFC Mahila Samridhi</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded text-sm font-sans-ui font-semibold transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(90deg, #0077b6, #00a8e0)', color: 'white' }}
              >
                Locate Partners →
              </button>
            </form>
          </div>

          {/* Map + results */}
          <div className="lg:col-span-2 space-y-5">
            {/* Map placeholder */}
            <div
              className="rounded-lg border overflow-hidden relative"
              style={{ background: '#e8eef7', borderColor: 'var(--border)', height: 280 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <div className="text-sm font-sans-ui font-medium" style={{ color: 'var(--primary)' }}>Interactive Map</div>
                  <div className="text-xs font-sans-ui mt-1" style={{ color: 'var(--muted-foreground)' }}>
                    Enter PIN code or state to locate partners
                  </div>
                </div>
              </div>
              {/* Decorative pins */}
              {[['20%', '20%'], ['42%', '35%'], ['65%', '28%'], ['70%', '60%'], ['30%', '65%'], ['52%', '70%']].map(([t, l], i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full border-2 border-white"
                  style={{ top: t, left: l, background: 'var(--primary)' }}
                />
              ))}
            </div>

            {/* Results list */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold" style={{ color: 'var(--primary)' }}>
                  {searched ? `${SAMPLE_PARTNERS.length} Partners Found` : 'Sample Channel Partners'}
                </h2>
                {searched && <span className="text-xs font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>Ranked by proximity</span>}
              </div>

              <div className="space-y-4">
                {SAMPLE_PARTNERS.map((p, i) => (
                  <div key={p.name} className="rounded-lg border bg-white overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                    <div className="px-5 py-4 flex items-start justify-between gap-4">
                      <div className="flex gap-3 items-start">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-sans-ui text-white shrink-0"
                          style={{ background: i === 0 ? 'var(--primary)' : 'var(--muted-foreground)' }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--primary)' }}>
                            {p.name}
                            {p.verified && (
                              <span className="text-xs font-sans-ui px-1.5 py-0.5 rounded-full" style={{ background: '#e8f7ee', color: '#1a7a43' }}>✓ Verified</span>
                            )}
                          </div>
                          <div className="text-xs font-sans-ui mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                            {p.type} · {p.district}, {p.state}
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {p.schemes.map((s) => (
                              <span key={s} className="text-xs font-sans-ui px-2 py-0.5 rounded-full" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{p.distance}</div>
                        <div className="text-xs font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>approx.</div>
                      </div>
                    </div>
                    <div className="px-5 py-3 border-t flex gap-3" style={{ borderColor: 'var(--border)', background: '#fafcff' }}>
                      <button className="text-xs font-sans-ui px-3 py-1.5 rounded border" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                        Get Directions
                      </button>
                      <button className="text-xs font-sans-ui px-3 py-1.5 rounded" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>
                        View Branch Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>
                Partner data shown for illustration. In production, geo-spatial data is sourced from scheme-specific authorised partner registries. Distance is approximate. Always verify branch availability before visiting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
