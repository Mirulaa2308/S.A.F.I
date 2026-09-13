import { createBrowserRouter } from 'react-router'
import Root from './Root'
import Home from './pages/Home'
import SearchScheme from './pages/SearchScheme'
import Recommendations from './pages/Recommendations'
import SchemeDetails from './pages/SchemeDetails'
import Calculator from './pages/Calculator'
import Partners from './pages/Partners'
import Assistant from './pages/Assistant'
import Login from './pages/Login'
import SchemesList from './pages/SchemesList'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'search', Component: SearchScheme },
      { path: 'schemes', Component: SchemesList },
      { path: 'schemes/:id', Component: SchemeDetails },
      { path: 'recommendations', Component: Recommendations },
      { path: 'calculator', Component: Calculator },
      { path: 'partners', Component: Partners },
      { path: 'assistant', Component: Assistant },
      { path: 'login', Component: Login },
    ],
  },
])
