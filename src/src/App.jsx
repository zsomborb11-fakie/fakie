import { useState, useEffect } from 'react'
import Home from './pages/Home.jsx'
import Editor from './pages/Editor.jsx'

export default function App() {
  const [page, setPage] = useState('home')
  // simple routing via path check
  useEffect(() => {
    function checkPath() {
      if (window.location.pathname === '/editor') setPage('editor')
      else setPage('home')
    }
    checkPath()
    window.addEventListener('popstate', checkPath)
    return () => window.removeEventListener('popstate', checkPath)
  }, [])

  function navigate(to) {
    window.history.pushState(null, '', to)
    setPage(to === '/editor' ? 'editor' : 'home')
  }

  return (
    <>
      {page === 'home' && <Home goEditor={() => navigate('/editor')} />}
      {page === 'editor' && <Editor goHome={() => navigate('/')} />}
    </>
  )
}
