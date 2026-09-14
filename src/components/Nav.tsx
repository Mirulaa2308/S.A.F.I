import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useLang, LANGUAGES, t } from '../context/LanguageContext'
import safiLogo from '../assets/safi-logo.png'

export default function Nav() {
  const { lang, setLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const navItems = [
    { key: 'searchScheme', to: '/search' },
    { key: 'schemes', to: '/schemes' },
    { key: 'calculator', to: '/calculator' },
    { key: 'partners', to: '/partners' },
  ]

  const activeCls = 'border-b-2 border-cyan-400'
  const linkCls = (isActive: boolean) =>
    `text-sm font-sans-ui pb-1 transition-colors ${isActive ? 'text-white border-b-2 border-cyan-400' : 'text-blue-200 hover:text-white'}`

  const currentLang = LANGUAGES.find((l) => l.code === lang)!

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: '#0f1e3c', borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
       {/* Brand */}
        <NavLink
          to="/"
          aria-label="SAFI Home"
          className="group flex items-center shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <img
            src={safiLogo}
            alt="SAFI — Scheme Assistance & Financial Intelligence"
            className="h-9 md:h-10 w-auto object-contain transition-all duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_12px_rgba(0,210,255,0.7)]"
            style={{
              mixBlendMode: 'screen',
              filter: 'invert(1) hue-rotate(180deg)',
            }}
            draggable={false}
          />
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(({ key, to }) => (
            <NavLink key={key} to={to} className={({ isActive }) => linkCls(isActive)}>
              {t(key, lang)}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-xs font-sans-ui px-3 py-1.5 rounded border transition-colors hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#90bbea' }}
            >
              <span>🌐</span>
              <span>{currentLang.nativeLabel}</span>
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {langOpen && (
              <div
                className="absolute right-0 top-full mt-1 w-52 rounded-lg border shadow-xl z-50 overflow-hidden"
                style={{ background: '#0f2140', borderColor: 'rgba(255,255,255,0.12)' }}
              >
                <div className="px-3 py-2 text-xs font-sans-ui border-b" style={{ color: '#7aa5c8', borderColor: 'rgba(255,255,255,0.08)' }}>
                  Select Language
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false) }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-sans-ui transition-colors hover:bg-white/10"
                      style={{ color: lang === l.code ? '#90bbea' : '#c0d8ee' }}
                    >
                      <span>{l.label}</span>
                      <span style={{ color: '#7aa5c8' }}>{l.nativeLabel}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/assistant"
            className="flex items-center gap-1.5 text-xs font-sans-ui px-3 py-1.5 rounded border transition-colors hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#90bbea' }}
          >
            <span>✦</span> SAFI
          </NavLink>

          <NavLink
            to="/login"
            className="text-xs font-sans-ui px-3 py-1.5 rounded border transition-colors hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#90bbea' }}
          >
            {t('login', lang)}
          </NavLink>

          <NavLink
            to="/search"
            className="text-xs font-sans-ui font-medium px-4 py-2 rounded transition-opacity hover:opacity-90"
            style={{ background: '#0077b6', color: 'white' }}
          >
            {t('findMyScheme', lang)}
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            {[6, 6, 4].map((w, i) => (
              <span key={i} className="block h-0.5 bg-white rounded" style={{ width: `${w * 4}px` }} />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 space-y-1 border-t font-sans-ui"
          style={{ background: '#0f1e3c', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          {navItems.map(({ key, to }) => (
            <NavLink
              key={key}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-2 rounded text-sm ${isActive ? 'bg-white/10 text-white' : 'text-blue-200'}`
              }
            >
              {t(key, lang)}
            </NavLink>
          ))}
          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <NavLink to="/assistant" onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-sm text-blue-200">
            ✦ SAFI Assistant
          </NavLink>
          <NavLink to="/login" onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-sm text-blue-200">
            {t('login', lang)}
          </NavLink>
          <NavLink
            to="/search"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 px-4 py-2.5 text-sm text-center rounded font-medium"
            style={{ background: '#0077b6', color: 'white' }}
          >
            {t('findMyScheme', lang)}
          </NavLink>

          {/* Language in mobile */}
          <div className="pt-2">
            <div className="text-xs mb-2 px-2" style={{ color: '#7aa5c8' }}>Language / भाषा</div>
            <div className="flex flex-wrap gap-1.5 px-2">
              {LANGUAGES.slice(0, 6).map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className="text-xs px-2 py-1 rounded border"
                  style={{
                    borderColor: lang === l.code ? '#0077b6' : 'rgba(255,255,255,0.15)',
                    color: lang === l.code ? 'white' : '#90bbea',
                    background: lang === l.code ? '#0077b6' : 'transparent',
                  }}
                >
                  {l.nativeLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
