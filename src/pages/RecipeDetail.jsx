import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Clock, Timer, UtensilsCrossed, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { getRecipeById, recipes, getDetailImage } from '../data/recipes'
import Header from '../components/Header'

const transition = { duration: 0.35, ease: 'easeInOut' }

const RecipeDetail = () => {
  const { id } = useParams()
  const recipe = getRecipeById(id)
  const currentIndex = recipe ? recipes.findIndex((r) => r.id === recipe.id) : 0

  if (!recipe) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center flex-1 py-24">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">Recipe not found.</p>
            <Link to="/" className="text-blue-400 hover:text-blue-300">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-6 lg:mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <AnimatePresence mode="wait">
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={transition}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
          >
            {/* Left column: title, rating, description, context info with icons */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                {recipe.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(recipe.rating) ? 'text-blue-400 fill-blue-400' : 'text-blue-400/30'}
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">{recipe.rating} ({recipe.reviews} reviews)</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm mb-6">{recipe.description}</p>
              {/* Context info with icons */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center flex-shrink-0">
                    <Timer size={18} className="text-blue-400" />
                  </div>
                  <span className="text-sm">Prep {recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-blue-400" />
                  </div>
                  <span className="text-sm">Cook {recipe.cookTime}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center flex-shrink-0">
                    <UtensilsCrossed size={18} className="text-blue-400" />
                  </div>
                  <span className="text-sm">{recipe.servings} servings</span>
                </div>
              </div>
              {recipe.peopleTried && (
                <p className="text-gray-400 text-sm mt-4">
                  {recipe.peopleTried} people have tried this recipe.
                </p>
              )}
            </div>

            {/* Center column: image */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
              {recipe.image ? (
                <img src={encodeURI(getDetailImage(recipe.image))} alt={recipe.name} className="w-full max-w-xl mx-auto object-cover aspect-square rounded-lg" />
              ) : (
                <div className={`w-full max-w-md aspect-square mx-auto bg-gradient-to-br ${recipe.gradient} flex items-center justify-center rounded-lg`}>
                  <span className="text-gray-600 font-medium text-sm">{recipe.imagePlaceholder}</span>
                </div>
              )}
            </div>

            {/* Right column: ingredients + how to cook */}
            <div className="lg:col-span-3 order-3 space-y-8">
              <div>
                <h2 className="font-display text-xl font-bold text-white mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 border-t border-white/10">
                <h2 className="font-display text-xl font-bold text-white mb-4">How to Cook</h2>
                <ol className="space-y-3">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-semibold text-xs">
                        {i + 1}
                      </span>
                      <p className="text-gray-300 leading-relaxed text-sm pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom pagination: arrows + numbers with horizontal line below each */}
        <div className="flex justify-center items-end gap-6 mt-12 lg:mt-16">
          <Link
            to={`/recipe/${recipes[currentIndex - 1]?.id ?? recipe.id}`}
            className="flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-blue-500 hover:bg-dark-700 transition-colors"
            aria-label="Previous recipe"
          >
            <ChevronLeft size={24} />
          </Link>
          <div className="flex items-end gap-8">
            {recipes.map((r, index) => {
              const isActive = Number(id) === r.id
              return (
                <Link
                  key={r.id}
                  to={`/recipe/${r.id}`}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <span
                    className={`font-semibold text-lg transition-colors ${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-300'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`block w-6 h-0.5 rounded-full transition-colors ${
                      isActive ? 'bg-blue-500' : 'bg-gray-500 group-hover:bg-gray-400'
                    }`}
                  />
                </Link>
              )
            })}
          </div>
          <Link
            to={`/recipe/${recipes[currentIndex + 1]?.id ?? recipe.id}`}
            className="flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-blue-500 hover:bg-dark-700 transition-colors"
            aria-label="Next recipe"
          >
            <ChevronRight size={24} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
