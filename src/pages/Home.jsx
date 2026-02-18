import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useScroll } from 'framer-motion'
import Header from '../components/Header'
import Hero from '../components/Hero'
import RecipeGrid from '../components/RecipeGrid'
import RecipeCard from '../components/RecipeCard'
import { recipes, getDetailImage } from '../data/recipes'

const SCROLL_HERO_STEPS = 4 // one per recipe
const SCROLL_HERO_HEIGHT_VH = 400 // 4 * 100vh

const Home = () => {
  const { hash } = useLocation()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')?.trim() ?? ''
  const scrollRef = useRef(null)
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0)
  const [heroZoneActive, setHeroZoneActive] = useState(true)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end']
  })

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
      {/* Desktop: recipe bg image at the side – chicken rice unchanged; others bigger, no blur */}
      <div
        className={`hidden lg:block fixed inset-0 bg-no-repeat z-0 transition-opacity duration-300 ${heroZoneActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={
          activeRecipe?.image
            ? {
                backgroundImage: `url(${encodeURI(getDetailImage(activeRecipe.image))})`,
                backgroundSize: activeRecipe.id === 0 ? '55%' : '70%',
                backgroundPosition: activeRecipe.id === 0 ? '140% center' : '200% center'
              }
            : undefined
        }
        aria-hidden
      />
      {/* Dark overlay so hero text is more visible */}
      <div
        className={`hidden lg:block fixed inset-0 z-[1] bg-black/40 pointer-events-none transition-opacity duration-300 ${heroZoneActive ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden
      />
      <div className="relative z-10">
        <Header />
        <main id="home" className="px-6">
          {/* Scroll-driven hero: 4 “steps”; hero stays sticky and content changes per recipe */}
          <section id="recipe" className="scroll-mt-24" ref={scrollRef} style={{ height: `${SCROLL_HERO_HEIGHT_VH}vh` }}>
            <div className="sticky top-0 h-screen flex items-center">
              <Hero recipe={activeRecipe} />
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
