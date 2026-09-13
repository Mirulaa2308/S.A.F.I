import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useLang } from '../context/LanguageContext'

const QUICK_REPLIES: Record<string, string[]> = {
  en: [
    'What schemes am I eligible for?',
    'How does SAFI determine eligibility?',
    'What documents do I need?',
    'How to locate a Channel Partner?',
  ],
  hi: [
    'मैं किन योजनाओं के लिए पात्र हूँ?',
    'SAFI पात्रता कैसे निर्धारित करता है?',
    'मुझे कौन से दस्तावेज़ चाहिए?',
    'चैनल पार्टनर कैसे खोजें?',
  ],
  ta: [
    'நான் என்ன திட்டங்களுக்கு தகுதியானவன்?',
    'SAFI தகுதியை எவ்வாறு தீர்மானிக்கிறது?',
    'எனக்கு என்ன ஆவணங்கள் தேவை?',
    'சேனல் பார்ட்னரை எவ்வாறு கண்டுபிடிப்பது?',
  ],
}

function getQuickReplies(lang: string): string[] {
  return QUICK_REPLIES[lang] ?? QUICK_REPLIES['en']
}

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const DEMO_RESPONSES: Record<string, string> = {
  'what schemes am i eligible for?':
    "To find schemes you're eligible for, I'll need your income range, beneficiary category, loan purpose, and state. Please use the Search Scheme page for a full eligibility check. Based on the criteria you share, I can then explain each matching scheme in detail.",
  default:
    "SAFI provides information about government financial and educational loan schemes under the Ministry of Social Justice & Empowerment. Eligibility is determined by official scheme rules — I can help you understand those rules and your options. Would you like to start a scheme search?",
}

function getResponse(msg: string): string {
  const key = msg.toLowerCase().trim()
  return DEMO_RESPONSES[key] ?? DEMO_RESPONSES['default']
}

export default function FloatingAssistant() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hello, I'm SAFI — your Scheme Assistance & Financial Intelligence guide. I can explain government scheme eligibility, required documents, and next steps. How can I help you today?",
    },
  ])
  const [input, setInput] = useState('')

  function send(text: string) {
    if (!text.trim()) return
    const userMsg: Message = { role: 'user', text }
    const assistantMsg: Message = { role: 'assistant', text: getResponse(text) }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #1a3a6b 0%, #0077b6 100%)' }}
        aria-label="Open SAFI Assistant"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4l12 12M16 4L4 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <span className="text-white font-bold text-xs font-sans-ui leading-tight text-center">SA<br />FI</span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 rounded-xl border shadow-2xl overflow-hidden"
          style={{ background: '#fff', borderColor: 'var(--border)' }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ background: '#0f1e3c' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-sans-ui font-medium text-white">SAFI Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { navigate('/assistant'); setOpen(false) }}
                className="text-xs font-sans-ui px-2 py-0.5 rounded border transition-colors hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#90bbea' }}
              >
                Full page ↗
              </button>
            </div>
          </div>

          <div className="text-xs font-sans-ui px-3 py-1.5 text-center border-b" style={{ background: '#f4f7fb', borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
            Explains verified scheme info only · Not an approval system
          </div>

          {/* Messages */}
          <div className="h-56 overflow-y-auto p-3 space-y-3" style={{ background: '#f8fafd' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] rounded-lg px-3 py-2 text-xs font-sans-ui leading-relaxed"
                  style={
                    m.role === 'assistant'
                      ? { background: 'white', border: '1px solid var(--border)', color: 'var(--foreground)' }
                      : { background: '#0077b6', color: 'white' }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="px-3 py-2 border-t space-y-1" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs font-sans-ui mb-1" style={{ color: 'var(--muted-foreground)' }}>Quick questions</div>
            {getQuickReplies(lang).slice(0, 2).map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="w-full text-left text-xs font-sans-ui px-2.5 py-1.5 rounded border transition-colors hover:bg-blue-50"
                style={{ borderColor: 'var(--border)', color: 'var(--primary)' }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 py-2.5 border-t flex gap-2" style={{ borderColor: 'var(--border)' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Ask about any scheme…"
              className="flex-1 text-xs font-sans-ui px-3 py-2 rounded border"
              style={{ borderColor: 'var(--border)' }}
            />
            <button
              onClick={() => send(input)}
              className="px-3 py-2 rounded text-xs font-sans-ui font-medium"
              style={{ background: '#0077b6', color: 'white' }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
