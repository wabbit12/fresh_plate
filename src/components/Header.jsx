import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, User } from 'lucide-react'

const navItems = [
  { id: 'home', label: 'Home', to: '/', match: 'home' },
  { id: 'recipe', label: 'Recipe', to: '/recipe/0', match: 'recipe' },
  { id: 'trending', label: 'Trending', to: '/#trending', match: 'trending' },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') ?? '')
  const { pathname, hash } = location

  const isHomeActive = pathname === '/' && hash !== '#trending'
  const isRecipeActive = pathname.startsWith('/recipe')
  const isTrendingActive = pathname === '/' && hash === '#trending'

  const activeMatch = isRecipeActive ? 'recipe' : isTrendingActive ? 'trending' : isHomeActive ? 'home' : null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    document.documentElement.scrollTo?.({ top: 0, left: 0, behavior: 'smooth' })
    document.body.scrollTo?.({ top: 0, left: 0, behavior: 'smooth' })
  }

  const handleHomeClick = (e) => {
    if (pathname === '/') {
      e.preventDefault()
      navigate({ pathname: '/', search: location.search }, { replace: true })
      scrollToTop()
    } else {
      scrollToTop()
    }
  }

  useEffect(() => {
    setSearchQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const linkClick = (item, e) => {
    if (item.match === 'home') handleHomeClick(e)
  }

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || menuOpen
            ? 'bg-dark-900/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-dark-900/35 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/"
            onClick={handleHomeClick}
            className="group flex items-center gap-2.5 min-w-0 flex-shrink-0"
          >
            <img
              src="/assets/logo.webp"
              alt=""
              width={40}
              height={40}
              decoding="async"
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain transition duration-300 group-hover:scale-105"
            />
            <span className="min-w-0">
              <span className="block font-display text-white text-lg sm:text-xl font-semibold tracking-tight leading-none truncate">
                Fresh Plate
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-blue-300/70 mt-0.5">
                Cook with ease
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center relative" aria-label="Primary">
            <div className="flex items-center gap-1 rounded-2xl bg-white/[0.03] p-1 ring-1 ring-white/10">
              {navItems.map((item) => {
                const active = activeMatch === item.match
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    onClick={(e) => linkClick(item, e)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      active ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl bg-white/10 ring-1 ring-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 justify-end min-w-0">
            <form
              onSubmit={handleSearch}
              className={`hidden md:flex items-center gap-2 h-10 px-3 rounded-xl bg-white/[0.04] ring-1 transition-all duration-300 ${
                searchFocused
                  ? 'w-64 ring-blue-400/50 bg-white/[0.07]'
                  : 'w-44 lg:w-52 ring-white/10 hover:ring-white/20'
              }`}
            >
              <Search size={16} className={`flex-shrink-0 transition-colors ${searchFocused ? 'text-blue-300' : 'text-gray-500'}`} aria-hidden />
              <input
                type="search"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="bg-transparent text-white text-sm outline-none w-full min-w-0 placeholder-gray-500"
                aria-label="Search recipes"
              />
            </form>

            <button
              type="button"
              className="hidden md:inline-flex items-center gap-2 h-10 pl-1.5 pr-3 rounded-xl bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.08] hover:ring-white/20 transition"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-600/10 text-blue-200">
                <User size={15} />
              </span>
              <span className="text-sm text-white/90 font-medium">Charls</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-white ring-1 ring-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <React.Fragment key="mobile-menu">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-black/55 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-16 left-0 right-0 z-40 lg:hidden px-4 pt-3"
              aria-label="Mobile navigation"
            >
              <div className="mx-auto max-w-7xl rounded-2xl bg-dark-800/95 backdrop-blur-xl ring-1 ring-white/10 overflow-hidden">
                <div className="p-3 flex flex-col gap-1">
                  <form
                    onSubmit={(e) => { handleSearch(e); setMenuOpen(false) }}
                    className="md:hidden mb-2"
                  >
                    <div className="flex items-center gap-2 h-11 px-3 rounded-xl bg-white/[0.05] ring-1 ring-white/10 focus-within:ring-blue-400/50">
                      <Search size={16} className="text-gray-400 flex-shrink-0" aria-hidden />
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

                  {navItems.map((item, i) => {
                    const active = activeMatch === item.match
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i, duration: 0.2 }}
                      >
                        <Link
                          to={item.to}
                          onClick={(e) => {
                            linkClick(item, e)
                            setMenuOpen(false)
                          }}
                          className={`flex items-center justify-between py-3 px-3.5 rounded-xl transition font-medium ${
                            active
                              ? 'text-white bg-blue-500/15 ring-1 ring-blue-400/25'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {item.label}
                          {active && <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />}
                        </Link>
                      </motion.div>
                    )
                  })}

                  <div className="border-t border-white/10 my-2" />
                  <div className="flex items-center gap-3 py-2.5 px-3.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/10 text-blue-200 ring-1 ring-white/10">
                      <User size={16} />
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium leading-none">Charls Recto</p>
                      <p className="text-gray-500 text-xs mt-1">Home cook</p>
                    </div>
                  </div>
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
