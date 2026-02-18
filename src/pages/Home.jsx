import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useScroll, motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import Hero from '../components/Hero'
import RecipeGrid from '../components/RecipeGrid'
import RecipeCard from '../components/RecipeCard'
import { recipes, getDetailImage } from '../data/recipes'

const SCROLL_HERO_STEPS = 4 // one per recipe
const SCROLL_HERO_HEIGHT_VH_DESKTOP = 400 // 4 * 100vh (fallback)
const CONTENT_MULTIPLIER = 1.5 // multiplier to ensure enough scroll space per recipe
const LG_BREAKPOINT_PX = 1024 // match Tailwind lg

const Home = () => {
  const { hash } = useLocation()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')?.trim() ?? ''
  const scrollRef = useRef(null)
  const heroContentRef = useRef(null)
  const measureContainerRef = useRef(null)
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0)
  const [heroZoneActive, setHeroZoneActive] = useState(true)
  const [scrollSectionHeight, setScrollSectionHeight] = useState(SCROLL_HERO_HEIGHT_VH_DESKTOP)
  const [isLg, setIsLg] = useState(() => typeof window !== 'undefined' && window.innerWidth >= LG_BREAKPOINT_PX)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end']
  })

  // Match Tailwind lg: only use scroll-driven sticky hero on desktop
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${LG_BREAKPOINT_PX}px)`)
    const update = (e) => setIsLg(e.matches)
    update(mq)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Measure hero content height for all recipes and set scroll section height dynamically
  useEffect(() => {
    if (!measureContainerRef.current) return
    
    const measureAllContent = () => {
      const measureContainer = measureContainerRef.current
      if (!measureContainer) return
      
      // Find all hero elements in the measure container
      const heroElements = measureContainer.querySelectorAll('[data-hero-measure]')
      if (heroElements.length === 0) return
      
      let maxContentHeight = 0
      const viewportHeight = window.innerHeight
      
      heroElements.forEach((heroEl) => {
        const height = heroEl.scrollHeight
        maxContentHeight = Math.max(maxContentHeight, height)
      })
      
      // Calculate height needed: ensure each recipe gets enough scroll space
      // Use max content height or viewport, whichever is larger
      const minHeightPerRecipe = Math.max(maxContentHeight, viewportHeight * 0.9)
      const totalHeight = minHeightPerRecipe * SCROLL_HERO_STEPS * CONTENT_MULTIPLIER
      
      // Convert to vh
      const heightVh = (totalHeight / viewportHeight) * 100
      
      // Use reasonable bounds
      setScrollSectionHeight(Math.max(400, Math.min(1000, heightVh)))
    }
    
    // Measure after a delay to ensure content is rendered
    const timer = setTimeout(measureAllContent, 300)
    window.addEventListener('resize', measureAllContent)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', measureAllContent)
    }
  }, [])

  // Map scroll progress (0–1) to recipe index (0–3); hide bg when past hero zone
  useEffect(() => {
    const update = (v) => {
      const index = Math.min(SCROLL_HERO_STEPS - 1, Math.floor(v * SCROLL_HERO_STEPS))
      setActiveRecipeIndex(index)
      setHeroZoneActive(v < 1)
    }
    update(scrollYProgress.get())
    const unsubProgress = scrollYProgress.on('change', update)
    return () => unsubProgress()
  }, [scrollYProgress])

  // Scroll to section when nav link uses hash (e.g. /#trending, /#search-results)
  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '').trim()
    if (!id) return
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
    return () => clearTimeout(timer)
  }, [hash])

  // Filter recipes by search query (name + description)
  const searchResults = searchQuery
    ? recipes.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

  const activeRecipe = recipes[activeRecipeIndex] ?? recipes[0]

  return (
    <div className="relative min-h-screen">
      {/* Desktop: recipe bg image at the side – crossfade when recipe changes */}
      <div className={`hidden lg:block fixed inset-0 z-0 overflow-hidden pointer-events-none ${heroZoneActive ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.3s' }} aria-hidden>
        <AnimatePresence initial={false}>
          {activeRecipe?.image && (
            <motion.div
              key={activeRecipe.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-no-repeat"
              style={{
                backgroundImage: `url(${encodeURI(getDetailImage(activeRecipe.image))})`,
                backgroundSize: activeRecipe.id === 0 ? '55%' : '70%',
                backgroundPosition: activeRecipe.id === 0 ? '140% center' : '200% center'
              }}
            />
          )}
        </AnimatePresence>
      </div>
      {/* Dark overlay so hero text is more visible */}
      <div
        className={`hidden lg:block fixed inset-0 z-[1] bg-black/40 pointer-events-none transition-opacity duration-300 ${heroZoneActive ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden
      />
      <div className="relative z-10">
        <Header />
        <main id="home" className="px-6 pt-16 lg:pt-0">
          {/* Hidden container to measure all hero content heights */}
          <div ref={measureContainerRef} className="absolute -left-[9999px] w-screen" aria-hidden="true">
            {recipes.slice(0, SCROLL_HERO_STEPS).map((recipe) => (
              <div key={`measure-${recipe.id}`} data-hero-measure className="w-full px-6">
                <Hero recipe={recipe} />
              </div>
            ))}
          </div>
          
          {/* Scroll-driven hero: content-aware height based on actual hero content */}
          <section id="recipe" className="scroll-mt-24" ref={scrollRef} style={{ height: `${scrollSectionHeight}vh` }}>
            <div className={`sticky ${isLg ? 'top-0 h-screen' : 'top-16'} ${!isLg ? 'min-h-[calc(100vh-4rem)]' : ''} flex ${isLg ? 'items-center' : 'items-start'} lg:py-0 overflow-visible`} style={!isLg ? { paddingTop: 'clamp(0.5rem, 2vh, 1rem)', paddingBottom: 'clamp(0.5rem, 2vh, 1rem)' } : {}}>
              <div ref={heroContentRef} className="w-full">
                <Hero recipe={activeRecipe} />
              </div>
            </div>
          </section>
          {searchQuery && (
            <section id="search-results" className="scroll-mt-24 pb-12">
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                {searchResults.length > 0
                  ? `Search results for “${searchQuery}”`
                  : `No recipes found for “${searchQuery}”`}
              </h2>
              {searchResults.length > 0 ? (
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 flex-wrap">
                  {searchResults.map((recipe, index) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      isFirst={index === 0}
                      isLast={index === searchResults.length - 1}
                      hasVideoAfter={false}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Try another search term.</p>
              )}
              <Link to="/" className="inline-block mt-2 text-sm text-blue-400 hover:text-blue-300 transition">Clear search</Link>
            </section>
          )}
          <section id="trending" className="pb-16 scroll-mt-24">
            <RecipeGrid />
          </section>
        </main>
      </div>
    </div>
  )
}

export default Home
