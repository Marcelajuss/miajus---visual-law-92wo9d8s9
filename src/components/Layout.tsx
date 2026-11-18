import { Outlet } from 'react-router-dom'
import { NavigationHeader, MainFooter } from './Navigation'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9FD] text-[#1A1523] font-sans antialiased selection:bg-[#8B6FB8] selection:text-white">
      <NavigationHeader />
      <main className="flex-1 pb-12">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  )
}
