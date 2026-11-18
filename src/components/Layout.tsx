import { Outlet } from 'react-router-dom'
import { NavigationHeader, MainFooter } from './Navigation'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white">
      <NavigationHeader />
      <main className="flex-1 pb-12">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  )
}
