import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useLang } from '../context/LanguageContext'

export default function Login() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [name, setName] = useState('')
  const [aadhaar, setAadhaar] = useState('')
  const [agree, setAgree] = useState(false)

  function sendOtp(e: React.FormEvent) {
    e.preventDefault()
    if (mobile.length === 10) setOtpSent(true)
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    navigate('/')
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    navigate('/search')
  }

  return (
    <div className="min-h-screen py-16 px-6 flex items-start justify-center" style={{ background: 'var(--muted)' }}>
      <div className="w-full max-w-xl">

        {/* Brand header */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 font-sans-ui"
            style={{ background: 'linear-gradient(135deg, #0f1e3c, #0077b6)' }}
          >
            SA
          </div>
          <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>SAFI</div>
          <div className="text-xs font-sans-ui mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Scheme Assistance &amp; Financial Intelligence
          </div>
        </div>

        <div className="rounded-xl border bg-white overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b" style={{ borderColor: 'var(--border)' }}>
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="py-3.5 text-sm font-sans-ui font-medium transition-colors capitalize"
                style={{
                  background: tab === t ? 'white' : 'var(--muted)',
                  color: tab === t ? 'var(--primary)' : 'var(--muted-foreground)',
                  borderBottom: tab === t ? '2px solid var(--primary)' : '2px solid transparent',
                }}
              >
                {t === 'login' ? 'Login' : 'Create Account'}
              </button>
            ))}
          </div>

          <div className="px-8 py-8">

            {/* Login */}
            {tab === 'login' && (
              <form onSubmit={otpSent ? handleLogin : sendOtp} className="space-y-5">
                <div>
                  <div className="text-xs font-sans-ui font-medium mb-3 uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                    Login with Mobile OTP
                  </div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--primary)' }}>
                    Mobile Number
                  </label>
                  <div className="flex">
                    <span
                      className="inline-flex items-center px-3 text-sm font-sans-ui rounded-l border border-r-0"
                      style={{ background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                    >
                      +91
                    </span>
                    <input
                      type="tel" pattern="[0-9]{10}" maxLength={10} placeholder="10-digit mobile number"
                      value={mobile} onChange={(e) => setMobile(e.target.value)} required
                      className="flex-1 px-3 py-2.5 text-sm font-sans-ui rounded-r border"
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="submit"
                    className="w-full py-3 rounded font-sans-ui font-semibold text-sm transition-all hover:brightness-110"
                    style={{ background: 'linear-gradient(90deg, #0077b6, #00a8e0)', color: 'white' }}
                  >
                    Send OTP →
                  </button>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--primary)' }}>Enter OTP</label>
                      <input
                        type="text" pattern="[0-9]{6}" maxLength={6} placeholder="6-digit OTP"
                        value={otp} onChange={(e) => setOtp(e.target.value)} required
                        className="w-full px-3 py-2.5 text-sm font-sans-ui rounded border"
                        style={{ borderColor: 'var(--border)' }}
                      />
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-xs font-sans-ui mt-1"
                        style={{ color: 'var(--accent)' }}
                      >
                        Resend OTP
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded font-sans-ui font-semibold text-sm"
                      style={{ background: 'linear-gradient(90deg, #0077b6, #00a8e0)', color: 'white' }}
                    >
                      Login
                    </button>
                  </>
                )}

                <div className="text-center">
                  <span className="text-xs font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>
                    No account?{' '}
                    <button type="button" onClick={() => setTab('register')} style={{ color: 'var(--accent)' }}>
                      Create one
                    </button>
                  </span>
                </div>

                <div className="text-xs font-sans-ui text-center" style={{ color: 'var(--muted-foreground)' }}>
                  You can also{' '}
                  <Link to="/search" style={{ color: 'var(--accent)' }}>
                    check eligibility without logging in
                  </Link>
                  . An account saves your search history and recommendations.
                </div>
              </form>
            )}

            {/* Register */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="text-xs font-sans-ui font-medium mb-1 uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                  Create Your SAFI Account
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--primary)' }}>Full Name</label>
                  <input
                    type="text" placeholder="As per official documents"
                    value={name} onChange={(e) => setName(e.target.value)} required
                    className="w-full px-3 py-2.5 text-sm font-sans-ui rounded border"
                    style={{ borderColor: 'var(--border)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--primary)' }}>Mobile Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm font-sans-ui rounded-l border border-r-0" style={{ background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>+91</span>
                    <input
                      type="tel" pattern="[0-9]{10}" maxLength={10} placeholder="10-digit mobile"
                      value={mobile} onChange={(e) => setMobile(e.target.value)} required
                      className="flex-1 px-3 py-2.5 text-sm font-sans-ui rounded-r border"
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--primary)' }}>
                    Aadhaar Number
                    <span className="ml-1.5 text-xs font-normal font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>(last 4 digits stored for verification)</span>
                  </label>
                  <input
                    type="text" pattern="[0-9]{12}" maxLength={12} placeholder="12-digit Aadhaar"
                    value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} required
                    className="w-full px-3 py-2.5 text-sm font-sans-ui rounded border"
                    style={{ borderColor: 'var(--border)' }}
                  />
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox" id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} required
                    className="mt-0.5 shrink-0"
                  />
                  <label htmlFor="agree" className="text-xs font-sans-ui leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    I confirm that the information provided is accurate and I consent to SAFI using it for scheme eligibility matching. Data is stored per SAFI's privacy policy and not shared with lenders without my explicit consent.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded font-sans-ui font-semibold text-sm"
                  style={{ background: 'linear-gradient(90deg, #0077b6, #00a8e0)', color: 'white' }}
                >
                  Create Account &amp; Search Scheme →
                </button>

                <p className="text-xs font-sans-ui text-center" style={{ color: 'var(--muted-foreground)' }}>
                  Account creation is optional. You can{' '}
                  <Link to="/search" style={{ color: 'var(--accent)' }}>search without an account</Link>.
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="text-xs font-sans-ui text-center mt-6" style={{ color: 'var(--muted-foreground)' }}>
          SAFI is an information platform under the Ministry of Social Justice &amp; Empowerment. It does not issue loans or store financial credentials.
        </p>
      </div>
    </div>
  )
}
