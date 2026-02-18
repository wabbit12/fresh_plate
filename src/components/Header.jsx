import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, User } from 'lucide-react'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') ?? '')
  const { pathname, hash } = location
  const navLinkClass = (active) =>
    active ? 'text-white font-medium' : 'text-gray-400 hover:text-white transition'
  const isHomeActive = pathname === '/' && hash !== '#trending'
  const isRecipeActive = pathname.startsWith('/recipe')
  const isTrendingActive = pathname === '/' && hash === '#trending'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    document.documentElement.scrollTo?.({ top: 0, left: 0, behavior: 'smooth' })
    document.body.scrollTo?.({ top: 0, left: 0, behavior: 'smooth' })
  }
  const handleHomeClick = (e) => {
    if (pathname === '/') {
      e.preventDefault()
      // Clear hash so active style updates (e.g. was #trending)
      navigate({ pathname: '/', search: location.search }, { replace: true })
      scrollToTop()
    } else {
      scrollToTop()
    }
  }

  // Sync search input with URL when navigating
  useEffect(() => {
    setSearchQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  // Close menu on route change (e.g. after clicking a link)
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) {
      setSearchParams({ q })
      if (location.pathname !== '/') {
        navigate({ pathname: '/', search: `?q=${encodeURIComponent(q)}`, hash: 'search-results' })
      } else {
        document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      setSearchParams({})
    }
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-dark-800/60 backdrop-blur-md py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50 border-b border-white/5"
      >
        <div className="flex items-center min-w-0 flex-1">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0" onClick={handleHomeClick}>
            <img src="/assets/logo.png" alt="Fresh Plate" className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-contain" aria-hidden />
            <span className="font-display text-white font-semibold text-base sm:text-lg truncate">Fresh Plate</span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6 flex-shrink-0">
          <Link to="/" className={navLinkClass(isHomeActive)} onClick={handleHomeClick}>Home</Link>
          <Link to="/recipe/0" className={navLinkClass(isRecipeActive)}>Recipe</Link>
          <Link to="/#trending" className={navLinkClass(isTrendingActive)}>Trending</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 flex-1 justify-end">
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 bg-dark-700 px-3 py-2 rounded-lg w-48 sm:w-56">
            <Search size={18} className="text-gray-400 flex-shrink-0" aria-hidden />
            <input
              type="search"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white text-sm outline-none w-full min-w-0 placeholder-gray-500"
              aria-label="Search recipes"
            />
          </form>
          <div className="hidden md:flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-dark-700 border border-white/10 flex items-center justify-center">
              <User size={18} className="text-gray-400" />
            </div>
            <span className="text-white text-sm">Charls Recto</span>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay + panel */}
      <AnimatePresence>
        {menuOpen && (
          <React.Fragment key="mobile-menu">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-[57px] sm:top-[65px] left-0 right-0 z-40 lg:hidden bg-dark-800/95 backdrop-blur-md border-b border-white/10 shadow-xl"
              aria-label="Mobile navigation"
            >
              <div className="py-4 px-4 flex flex-col gap-1">
                <form onSubmit={(e) => { handleSearch(e); setMenuOpen(false); }} className="md:hidden mb-2">
                  <div className="flex items-center gap-2 bg-dark-700 px-3 py-2 rounded-lg">
                    <Search size={18} className="text-gray-400 flex-shrink-0" aria-hidden />
                    <input
                      type="search"
                      placeholder="Search recipes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-white text-sm outline-none w-full min-w-0 placeholder-gray-500"
                      aria-label="Search recipes"
                    />
                  </div>
                </form>
                <Link
                  to="/"
                  onClick={(e) => { handleHomeClick(e); setMenuOpen(false); }}
                  className={`py-3 px-4 rounded-lg transition font-medium ${isHomeActive ? 'text-white bg-white/10' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                >
                  Home
                </Link>
                <Link
                  to="/recipe/0"
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg transition font-medium ${isRecipeActive ? 'text-white bg-white/10' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                >
                  Recipe
                </Link>
                <Link
                  to="/#trending"
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg transition font-medium ${isTrendingActive ? 'text-white bg-white/10' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                >
                  Trending
                </Link>
                <div className="border-t border-white/10 my-2" />
                <div className="flex items-center gap-3 py-3 px-4">
                  <div className="w-8 h-8 rounded-full bg-dark-700 border border-white/10 flex items-center justify-center">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <span className="text-white text-sm">Charls Recto</span>
                </div>
              </div>
            </motion.nav>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
