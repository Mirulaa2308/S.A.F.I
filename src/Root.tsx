import { Outlet, useLocation } from 'react-router'
import Nav from './components/Nav'
import FloatingAssistant from './components/FloatingAssistant'

export default function Root() {
  const { pathname } = useLocation()
  // Don't show floating assistant on the dedicated assistant page
  const showFloat = pathname !== '/assistant'

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Nav />
      <main className="pt-16">
        <Outlet />
      </main>
      {showFloat && <FloatingAssistant />}
    </div>
  )
}
