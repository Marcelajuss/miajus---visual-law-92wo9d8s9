/* 404 Page - Displays when a user attempts to access a non-existent route - translate to the language of the user */
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF9FD]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-grad-marca">404</h1>
        <p className="text-xl text-[#2D2A32] mb-4">Oops! Page not found</p>
        <a href="/" className="text-[#8B6FB8] hover:text-[#7A5FA8] underline">
          Return to Home
        </a>
      </div>
    </div>
  )
}

export default NotFound
