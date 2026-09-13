import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useLang } from '../context/LanguageContext'

const STEP_LABELS = ['Your Details', 'Project / Education', 'Location & Contact', 'Review']

interface FormData {
  income: string
  category: string
  purpose: string
  educationType: string
  projectType: string
  estimatedCost: string
  loanAmount: string
  state: string
  district: string
  pincode: string
  age: string
  gender: string
  employed: string
}

const INIT: FormData = {
  income: '', category: '', purpose: '', educationType: '', projectType: '',
  estimatedCost: '', loanAmount: '', state: '', district: '', pincode: '',
  age: '', gender: '', employed: '',
}

export default function SearchScheme() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INIT)

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function next() { if (step < 3) setStep(step + 1) }
  function back() { if (step > 0) setStep(step - 1) }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/recommendations', { state: { form } })
  }

  const isEducation = form.purpose === 'education'

  return (
    <div className="min-h-screen py-12 px-6" style={{ background: 'var(--muted)' }}>
      <div className="max-w-2xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <div className="text-xs font-sans-ui font-medium mb-2 uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            Eligibility Check
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>Search Scheme</h1>
          <p className="text-sm font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>
            Complete the form below. SAFI applies official eligibility rules to your details and surfaces only schemes you qualify for. No data is stored beyond this session without your consent.
          </p>
        </div>

        {/* Process note */}
        <div
          className="rounded-lg px-5 py-4 mb-8 border-l-4 flex gap-3"
          style={{ background: 'white', borderColor: 'var(--accent)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <span className="text-lg">ℹ️</span>
          <div>
            <div className="text-sm font-bold mb-1" style={{ color: 'var(--primary)' }}>How SAFI uses your details</div>
            <div className="text-xs font-sans-ui leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              <span className="font-medium" style={{ color: 'var(--foreground)' }}>Step 1:</span> You enter details below.&nbsp;
              <span className="font-medium" style={{ color: 'var(--foreground)' }}>Step 2:</span> SAFI applies official scheme eligibility rules.&nbsp;
              <span className="font-medium" style={{ color: 'var(--foreground)' }}>Step 3:</span> Eligible schemes are shown and ranked by suitability. AI does not decide eligibility — rules do.
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center mb-8">
          {STEP_LABELS.map((label, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-sans-ui transition-colors"
                  style={{
                    background: i <= step ? 'var(--primary)' : 'var(--border)',
                    color: i <= step ? 'white' : 'var(--muted-foreground)',
                  }}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <div className="text-xs font-sans-ui mt-1.5 text-center hidden sm:block whitespace-nowrap" style={{ color: i === step ? 'var(--primary)' : 'var(--muted-foreground)' }}>
                  {label}
                </div>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className="flex-1 h-px mx-2 mt-0 sm:-mt-5" style={{ background: i < step ? 'var(--primary)' : 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <form onSubmit={submit}>
          <div className="rounded-lg border bg-white overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-6 py-4 border-b" style={{ background: 'var(--primary)', borderColor: 'transparent' }}>
              <h2 className="font-semibold text-white text-base">Step {step + 1}: {STEP_LABELS[step]}</h2>
            </div>

            <div className="px-6 py-6 space-y-5">

              {/* ── Step 0: Your Details ── */}
              {step === 0 && (
                <>
                  <Field label="Annual Household Income" required>
                    <select value={form.income} onChange={(e) => set('income', e.target.value)} required>
                      <option value="">Select income range</option>
                      <option value="lt1">Below ₹1,00,000</option>
                      <option value="1-2.5">₹1,00,000 – ₹2,50,000</option>
                      <option value="2.5-3">₹2,50,000 – ₹3,00,000</option>
                      <option value="3-5">₹3,00,000 – ₹5,00,000</option>
                      <option value="gt5">Above ₹5,00,000</option>
                    </select>
                  </Field>

                  <Field label="Beneficiary Category" required hint="Required to match schemes by Ministry guidelines">
                    <select value={form.category} onChange={(e) => set('category', e.target.value)} required defaultValue="">
                      <option value="" disabled>Select beneficiary category</option>
                      <option value="SC">Scheduled Caste (SC)</option>
                      <option value="ST">Scheduled Tribe (ST)</option>
                      <option value="OBC">Other Backward Class (OBC)</option>
                      <option value="EWS">Economically Weaker Section (EWS)</option>
                      <option value="PwD">Persons with Disabilities (PwD)</option>
                      <option value="SK">Safai Karamcharis &amp; Dependants</option>
                      <option value="Minority">Minority Community</option>
                    </select>
                  </Field>

                  <Field label="Age" required>
                    <input
                      type="number" min={18} max={70} placeholder="Your age"
                      value={form.age} onChange={(e) => set('age', e.target.value)} required
                    />
                  </Field>

                  <Field label="Gender" required>
                    <select value={form.gender} onChange={(e) => set('gender', e.target.value)} required>
                      <option value="">Select gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Transgender / Other</option>
                    </select>
                  </Field>

                  <Field label="Current Employment Status">
                    <select value={form.employed} onChange={(e) => set('employed', e.target.value)}>
                      <option value="">Select status</option>
                      <option value="unemployed">Unemployed / Seeking first employment</option>
                      <option value="self">Self-employed / Running own business</option>
                      <option value="salaried">Salaried employment</option>
                      <option value="student">Student</option>
                    </select>
                  </Field>
                </>
              )}

              {/* ── Step 1: Project / Education ── */}
              {step === 1 && (
                <>
                  <Field label="Loan Purpose" required>
                    <select value={form.purpose} onChange={(e) => set('purpose', e.target.value)} required>
                      <option value="">Select loan purpose</option>
                      <option value="education">Education &amp; Skill Development</option>
                      <option value="selfemployment">Self-Employment / Business</option>
                      <option value="agriculture">Agriculture &amp; Allied Activities</option>
                      <option value="housing">Housing</option>
                      <option value="micro">Micro Enterprise / Sanitation</option>
                    </select>
                  </Field>

                  {isEducation && (
                    <Field label="Type of Education / Course" required>
                      <select value={form.educationType} onChange={(e) => set('educationType', e.target.value)}>
                        <option value="">Select course type</option>
                        <option value="technical">Technical / Engineering (B.Tech, Diploma)</option>
                        <option value="medical">Medical / Paramedical (MBBS, Nursing)</option>
                        <option value="management">Management (MBA, BBA)</option>
                        <option value="skill">Skill Development / ITI / Vocational</option>
                        <option value="general">General Graduation / Post-Graduation</option>
                        <option value="abroad">Study Abroad</option>
                      </select>
                    </Field>
                  )}

                  {!isEducation && form.purpose && (
                    <Field label="Type of Project / Activity" required>
                      <select value={form.projectType} onChange={(e) => set('projectType', e.target.value)}>
                        <option value="">Select project type</option>
                        <option value="retail">Retail Shop / Trade</option>
                        <option value="transport">Transport Vehicle</option>
                        <option value="manufacturing">Small Manufacturing Unit</option>
                        <option value="service">Service Business (Beauty, Repair, etc.)</option>
                        <option value="agriculture">Agriculture / Animal Husbandry</option>
                        <option value="other">Other Income-Generating Activity</option>
                      </select>
                    </Field>
                  )}

                  <Field label="Estimated Total Cost / Project Cost (₹)" required>
                    <input
                      type="number" min={0} placeholder="e.g. 500000"
                      value={form.estimatedCost} onChange={(e) => set('estimatedCost', e.target.value)} required
                    />
                  </Field>

                  <Field label="Loan Amount Required (₹)" required hint="Amount you wish to borrow (cannot exceed scheme maximum)">
                    <input
                      type="number" min={0} placeholder="e.g. 400000"
                      value={form.loanAmount} onChange={(e) => set('loanAmount', e.target.value)} required
                    />
                  </Field>
                </>
              )}

              {/* ── Step 2: Location ── */}
              {step === 2 && (
                <>
                  <Field label="State / Union Territory" required>
                    <select value={form.state} onChange={(e) => set('state', e.target.value)} required>
                      <option value="">Select your state</option>
                      {['Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="District">
                    <input
                      type="text" placeholder="Enter district name"
                      value={form.district} onChange={(e) => set('district', e.target.value)}
                    />
                  </Field>

                  <Field label="PIN Code" required>
                    <input
                      type="text" pattern="[0-9]{6}" maxLength={6} placeholder="6-digit PIN code"
                      value={form.pincode} onChange={(e) => set('pincode', e.target.value)} required
                    />
                  </Field>

                  <div
                    className="rounded-lg px-4 py-3 text-xs font-sans-ui leading-relaxed"
                    style={{ background: 'var(--secondary)', color: 'var(--muted-foreground)' }}
                  >
                    🔒 Your location is used only to identify available State-level schemes and nearest Channel Partners. It is not shared with any lender without your consent.
                  </div>
                </>
              )}

              {/* ── Step 3: Review ── */}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>
                    Review your details before SAFI checks eligibility against official scheme rules.
                  </p>
                  {[
                    { label: 'Income', value: form.income },
                    { label: 'Category', value: form.category },
                    { label: 'Age', value: form.age },
                    { label: 'Gender', value: form.gender },
                    { label: 'Loan Purpose', value: form.purpose },
                    { label: 'Estimated Cost', value: form.estimatedCost ? `₹${Number(form.estimatedCost).toLocaleString('en-IN')}` : '—' },
                    { label: 'Loan Required', value: form.loanAmount ? `₹${Number(form.loanAmount).toLocaleString('en-IN')}` : '—' },
                    { label: 'State', value: form.state },
                    { label: 'PIN Code', value: form.pincode },
                  ].filter((r) => r.value).map((r) => (
                    <div key={r.label} className="flex justify-between border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                      <span className="text-xs font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>{r.label}</span>
                      <span className="text-xs font-sans-ui font-medium" style={{ color: 'var(--foreground)' }}>{r.value}</span>
                    </div>
                  ))}
                  <div
                    className="rounded-lg px-4 py-3 text-xs font-sans-ui leading-relaxed border-l-4"
                    style={{ background: 'var(--secondary)', borderColor: 'var(--accent)', color: 'var(--muted-foreground)' }}
                  >
                    By submitting, you confirm these details are accurate. SAFI will apply official eligibility rules to identify matching schemes. Results are informational — final eligibility is confirmed by the Channel Partner or administering body.
                  </div>
                </div>
              )}
            </div>

            {/* Form footer */}
            <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="px-5 py-2 rounded text-sm font-sans-ui border transition-colors disabled:opacity-40"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                ← Back
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  className="px-6 py-2 rounded text-sm font-sans-ui font-medium transition-opacity hover:opacity-90"
                  style={{ background: 'var(--primary)', color: 'white' }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded text-sm font-sans-ui font-semibold transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(90deg, #0077b6, #00a8e0)', color: 'white' }}
                >
                  Check Eligibility &amp; Find Schemes →
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>
        {label}
        {required && <span className="ml-0.5" style={{ color: '#c0392b' }}>*</span>}
      </label>
      {hint && <p className="text-xs font-sans-ui mb-1.5" style={{ color: 'var(--muted-foreground)' }}>{hint}</p>}
      <div
        className="[&_select]:w-full [&_select]:px-3 [&_select]:py-2.5 [&_select]:rounded [&_select]:border [&_select]:text-sm [&_select]:font-sans-ui
                   [&_input]:w-full [&_input]:px-3 [&_input]:py-2.5 [&_input]:rounded [&_input]:border [&_input]:text-sm [&_input]:font-sans-ui"
        style={{ ['--tw-ring-color' as string]: 'var(--accent)' }}
      >
        {children}
      </div>
    </div>
  )
}
