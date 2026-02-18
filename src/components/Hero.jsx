import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { getFeaturedRecipe, getDetailImage } from '../data/recipes'

const transition = { duration: 0.5, ease: [0.4, 0, 0.2, 1] }

const Hero = ({ recipe: recipeProp }) => {
  const fallback = getFeaturedRecipe()
  const recipe = recipeProp ?? fallback

  return (
    <section className="relative min-h-0 w-full flex flex-col overflow-visible lg:overflow-hidden">
      {/* On mobile: recipe image above hero – crossfade when recipe changes; hidden on lg. Container tall enough so image isn’t cut. */}
      <div className="lg:hidden order-first w-full flex-shrink-0 flex justify-center px-4 overflow-visible" style={{ paddingTop: 'clamp(0.5rem, 3vh, 1rem)', paddingBottom: 'clamp(0.5rem, 3vh, 1rem)' }}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="flex justify-center"
          >
            {recipe.image ? (
              <img src={encodeURI(getDetailImage(recipe.image))} alt={recipe.name} className="w-auto max-w-full object-contain" style={{ maxHeight: 'clamp(140px, 25vh, 288px)' }} />
            ) : (
              <div className={`rounded-2xl bg-gradient-to-br ${recipe.gradient}`} style={{ width: 'clamp(4rem, 8vw, 7rem)', height: 'clamp(4rem, 8vw, 7rem)' }} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Hero grid: left = recipe content, right = number + Dinner Menu */}
      <div className="relative z-10 order-last lg:order-none w-full max-w-7xl mx-auto flex flex-col lg:flex-row flex-1 min-h-0 lg:min-h-[85vh]">
        {/* Left column: recipe title and content */}
        <div className="w-full lg:w-1/2 flex items-center lg:py-24" style={{ paddingTop: 'clamp(1rem, 4vh, 2rem)', paddingBottom: 'clamp(1rem, 4vh, 2rem)' }}>
          <div className="max-w-xl lg:pr-4 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={transition}
                className="flex flex-col justify-center"
              >
                <h1 className="font-playfair font-black text-white leading-none hero-title lg:text-[60px] lg:mb-4">
                  {recipe.name}
                </h1>

                <div className="flex items-center gap-2 lg:mb-6" style={{ marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)' }}>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`lg:w-5 lg:h-5 ${i < Math.floor(recipe.rating) ? 'text-blue-400 fill-blue-400' : 'text-blue-400/30'}`}
                        style={{ width: 'clamp(14px, 4vw, 20px)', height: 'clamp(14px, 4vw, 20px)' }}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 lg:text-sm ml-2" style={{ fontSize: 'clamp(0.75rem, 3vw, 0.875rem)' }}>{recipe.rating} ({recipe.reviews} Reviews)</span>
                </div>

                <div className="flex gap-4 lg:mb-8" style={{ marginBottom: 'clamp(1rem, 3vh, 2rem)' }}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className="text-white tracking-widest uppercase whitespace-nowrap lg:text-xs" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', fontSize: 'clamp(0.625rem, 2vw, 0.75rem)' }}>
                      RECIPE
                    </span>
                    <div className="w-px flex-1 bg-white mt-2" style={{ minHeight: 'clamp(3rem, 8vh, 5rem)' }} />
                  </div>
                  <p className="text-gray-300 leading-relaxed lg:text-base" style={{ fontSize: 'clamp(0.75rem, 3vw, 1rem)' }}>
                    {recipe.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 lg:mb-8" style={{ marginBottom: 'clamp(1rem, 3vh, 2rem)' }}>
                  <div className="flex -space-x-2">
                    <img src="/images/person1.JPG" alt="" className="rounded-full object-cover border-2 border-dark-900 lg:w-10 lg:h-10" style={{ width: 'clamp(2rem, 5vw, 2.5rem)', height: 'clamp(2rem, 5vw, 2.5rem)' }} />
                    <img src="/images/person2.JPG" alt="" className="rounded-full object-cover border-2 border-dark-900 lg:w-10 lg:h-10" style={{ width: 'clamp(2rem, 5vw, 2.5rem)', height: 'clamp(2rem, 5vw, 2.5rem)' }} />
                    <img src="/images/person3.JPG" alt="" className="rounded-full object-cover border-2 border-dark-900 lg:w-10 lg:h-10" style={{ width: 'clamp(2rem, 5vw, 2.5rem)', height: 'clamp(2rem, 5vw, 2.5rem)' }} />
                  </div>
                  <p className="text-gray-300 lg:text-sm" style={{ fontSize: 'clamp(0.75rem, 3vw, 0.875rem)' }}>
                    {recipe.peopleTried} people have tried to cook this menu
                  </p>
                </div>

                <Link to={`/recipe/${recipe.id}`}>
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition lg:px-8 lg:py-3 lg:text-base"
                    style={{ paddingTop: 'clamp(0.5rem, 1.5vh, 0.75rem)', paddingBottom: 'clamp(0.5rem, 1.5vh, 0.75rem)', paddingLeft: 'clamp(1.5rem, 4vw, 2rem)', paddingRight: 'clamp(1.5rem, 4vw, 2rem)', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}
                  >
                    Cook this menu
                  </motion.span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right column: recipe number + Dinner Menu */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={transition}
              className="flex items-center gap-5"
            >
              <span className="font-playfair text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none drop-shadow-lg">
                {String(recipe.id + 1).padStart(2, '0')}
              </span>
            <div className="w-px h-16 md:h-20 bg-white flex-shrink-0" aria-hidden />
            <div>
              <p className="font-playfair text-white font-bold text-3xl md:text-4xl lg:text-5xl leading-tight drop-shadow-lg">Dinner</p>
              <p className="font-playfair text-white font-bold text-3xl md:text-4xl lg:text-5xl leading-tight drop-shadow-lg">Menu</p>
            </div>
          </motion.div>
          </AnimatePresence>
          {/* Social icons - right edge of right column */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition" aria-label="Google+">
              <span className="text-sm font-bold">G+</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition" aria-label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition" aria-label="Facebook">
              <span className="text-sm font-bold">f</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
