import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { useLang, LANGUAGES } from '../context/LanguageContext'

interface Msg {
  role: 'user' | 'assistant'
  text: string
  ts: string
}

const QUICK_TOPICS = [
  { icon: '⚖️', label: 'Eligibility Rules', q: 'How does SAFI determine scheme eligibility? What rules are applied?' },
  { icon: '📋', label: 'Required Documents', q: 'What documents are typically required to apply for a government loan scheme?' },
  { icon: '🧮', label: 'Interest Rates', q: 'What interest rates do NSFDC and NBCFDC schemes offer?' },
  { icon: '📍', label: 'Channel Partners', q: 'What is a Channel Partner and how do I find one?' },
  { icon: '🏆', label: 'Scheme Ranking', q: 'How does SAFI rank eligible schemes? Does AI decide my eligibility?' },
  { icon: '💰', label: 'Subsidy Benefits', q: 'What subsidies or capital grants are available with these schemes?' },
]

const DEMO_KB: Record<string, string> = {
  eligibility:
    "SAFI determines eligibility using official scheme rules — not AI predictions. For example, NSFDC Term Loan requires: (1) SC/ST beneficiary, (2) annual income below ₹3 lakh, (3) age 18–55, and (4) a viable income-generating activity. SAFI checks your profile against each criterion. AI only ranks and explains results after rules have filtered them.",
  documents:
    "Common documents across most schemes:\n• Caste / Category Certificate from competent authority\n• Income Certificate\n• Proof of Identity (Aadhaar, Voter ID)\n• Proof of Residence\n• Bank Account Statement (6 months)\n• Business Plan or Admission Letter (for education loans)\n• Passport-size photographs\n\nRequirements vary by scheme and state. Always verify with your Channel Partner.",
  interest:
    "NSFDC Term Loan: 6% p.a. (additional concession for SC/ST women). NBCFDC Education Loan: 4% p.a. for female applicants, 6% for male. NSKFDC Micro Credit: 5% p.a. NMDFC Mahila Samridhi: 4% p.a. These are the scheme rates — your Channel Partner may add processing fees as per RBI guidelines.",
  channel:
    "A Channel Partner is an RBI-regulated financial institution (public sector bank, RRB, NBFC, or cooperative society) authorised to disburse scheme funds. They assess final eligibility, conduct KYC, and process your application. SAFI's Partner Locator shows authorised partners near you, ranked by proximity.",
  ranking:
    "SAFI uses AI to rank schemes after rule-based eligibility filtering. Rules decide eligibility — AI does not. Ranking considers: loan ceiling vs. your requirement, interest rate, subsidy availability, and income limit suitability. The ranking is a guide to help you compare — it does not guarantee approval.",
  subsidy:
    "Several schemes include subsidies: NSKFDC Micro Credit includes a capital subsidy under SRMS for safai karamcharis. NMDFC Mahila Samridhi includes a savings incentive. State-level SC/ST Finance Corporations may add further subsidies. Subsidy disbursement is managed by the administering body, not SAFI.",
  default:
    "I'm SAFI — I can explain government scheme eligibility rules, required documents, interest rates, and Channel Partner processes in detail. I do not approve or reject applications, and I don't predict your approval chances. For a full eligibility check, please use the Search Scheme page.\n\nWhat would you like to know?",
}

function getReply(q: string): string {
  const lower = q.toLowerCase()
  if (lower.includes('eligib')) return DEMO_KB.eligibility
  if (lower.includes('document') || lower.includes('required')) return DEMO_KB.documents
  if (lower.includes('interest') || lower.includes('rate')) return DEMO_KB.interest
  if (lower.includes('channel') || lower.includes('partner')) return DEMO_KB.channel
  if (lower.includes('rank') || lower.includes('ai') || lower.includes('decide')) return DEMO_KB.ranking
  if (lower.includes('subsid') || lower.includes('grant') || lower.includes('capital')) return DEMO_KB.subsidy
  return DEMO_KB.default
}

function now() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

export default function Assistant() {
  const { lang, setLang } = useLang()
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', text: "Hello. I'm SAFI — your Scheme Assistance & Financial Intelligence guide.\n\nI can explain government scheme eligibility criteria, required documents, interest rates, Channel Partner processes, and application steps — in your chosen language.\n\nI do not approve or reject applications, predict approval chances, or replace the official assessment by a Channel Partner. For a full eligibility check, please use the Search Scheme page.\n\nHow can I help you today?", ts: now() },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function send(text: string) {
    if (!text.trim()) return
    const userMsg: Msg = { role: 'user', text, ts: now() }
    const assistantMsg: Msg = { role: 'assistant', text: getReply(text), ts: now() }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--muted)' }}>
      <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col gap-6 py-10 px-6">

        {/* Header */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="text-xs font-sans-ui font-medium mb-2 uppercase tracking-widest" style={{ color: 'var(--accent)' }}>AI Assistant</div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--primary)' }}>SAFI — Scheme Guidance Assistant</h1>
            <p className="text-sm font-sans-ui" style={{ color: 'var(--muted-foreground)' }}>
              Ask about eligibility rules, documents, interest rates, Channel Partners, and next steps — in your language. SAFI explains verified official information only.
            </p>
          </div>

          {/* Language selector */}
          <div className="rounded-lg border bg-white p-4" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs font-sans-ui font-semibold mb-2" style={{ color: 'var(--primary)' }}>Response Language</div>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.slice(0, 8).map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className="text-xs font-sans-ui px-2 py-1 rounded border transition-colors"
                  style={{
                    background: lang === l.code ? 'var(--primary)' : 'transparent',
                    borderColor: lang === l.code ? 'var(--primary)' : 'var(--border)',
                    color: lang === l.code ? 'white' : 'var(--foreground)',
                  }}
                >
                  {l.nativeLabel}
                </button>
              ))}
            </div>
            <p className="text-xs font-sans-ui mt-2" style={{ color: 'var(--muted-foreground)' }}>In production, SAFI replies in the selected language.</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="rounded-lg px-5 py-3 border-l-4 text-xs font-sans-ui flex gap-3"
          style={{ background: 'white', borderColor: 'var(--accent)', color: 'var(--muted-foreground)' }}
        >
          <span className="text-base shrink-0">ℹ️</span>
          <span>
            <strong style={{ color: 'var(--foreground)' }}>What SAFI does:</strong> Explains verified scheme information and eligibility criteria. &nbsp;
            <strong style={{ color: 'var(--foreground)' }}>What SAFI does not do:</strong> Approve or reject applications, predict approval chances, or disburse funds. Official eligibility is assessed by your Channel Partner.
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 flex-1">

          {/* Quick topics sidebar */}
          <div className="space-y-3">
            <div className="text-xs font-sans-ui font-semibold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>Quick Topics</div>
            {QUICK_TOPICS.map((t) => (
              <button
                key={t.q}
                onClick={() => send(t.q)}
                className="w-full flex items-center gap-3 rounded-lg p-3 border bg-white text-left transition-shadow hover:shadow-md"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="text-xl shrink-0">{t.icon}</span>
                <div>
                  <div className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{t.label}</div>
                  <div className="text-xs font-sans-ui leading-relaxed mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{t.q.slice(0, 55)}…</div>
                </div>
              </button>
            ))}
            <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <Link to="/search" className="block text-xs font-sans-ui text-center py-2 rounded" style={{ background: 'var(--primary)', color: 'white' }}>
                → Full Eligibility Check
              </Link>
            </div>
          </div>

          {/* Chat area */}
          <div className="lg:col-span-2 flex flex-col rounded-xl border bg-white overflow-hidden" style={{ borderColor: 'var(--border)', minHeight: 480 }}>
            {/* Chat header */}
            <div className="px-5 py-3.5 border-b flex items-center gap-3" style={{ background: 'var(--primary)', borderColor: 'transparent' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" />
              <span className="text-sm font-sans-ui font-medium text-white">SAFI Guidance Assistant</span>
              <span className="ml-auto text-xs font-sans-ui px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', color: '#90bbea' }}>
                {LANGUAGES.find((l) => l.code === lang)?.nativeLabel}
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ background: '#f8fafd' }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'assistant' && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-sans-ui text-white shrink-0 mr-2 mt-1"
                      style={{ background: 'var(--primary)' }}
                    >
                      SA
                    </div>
                  )}
                  <div className="max-w-md">
                    <div
                      className="rounded-xl px-4 py-3 text-sm font-sans-ui leading-relaxed whitespace-pre-line"
                      style={
                        m.role === 'assistant'
                          ? { background: 'white', border: '1px solid var(--border)', color: 'var(--foreground)' }
                          : { background: 'var(--primary)', color: 'white' }
                      }
                    >
                      {m.text}
                    </div>
                    <div className="text-xs font-sans-ui mt-1 px-1" style={{ color: 'var(--muted-foreground)' }}>{m.ts}</div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send(input)}
                  placeholder="Ask SAFI about any scheme, eligibility, or documents…"
                  className="flex-1 text-sm font-sans-ui px-4 py-2.5 rounded border"
                  style={{ borderColor: 'var(--border)' }}
                />
                <button
                  onClick={() => send(input)}
                  className="px-5 py-2.5 rounded font-sans-ui font-medium text-sm transition-opacity hover:opacity-90"
                  style={{ background: 'var(--primary)', color: 'white' }}
                >
                  Send
                </button>
              </div>
              <p className="text-xs font-sans-ui mt-2 text-center" style={{ color: 'var(--muted-foreground)' }}>
                SAFI explains verified official information only · Not an approval or disbursement system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
