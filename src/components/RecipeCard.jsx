import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const RecipeCard = ({ recipe, isFirst, isLast, hasVideoAfter }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  // Mobile (stacked): first card rounded top, last rounded bottom. Desktop (row): first left, last right.
  const roundedClass =
    isFirst && isLast && !hasVideoAfter
      ? 'rounded-2xl'
      : isFirst
      ? 'rounded-t-2xl md:rounded-t-none md:rounded-l-2xl'
      : isLast && !hasVideoAfter
      ? 'rounded-b-2xl md:rounded-b-none md:rounded-r-2xl'
      : isLast && hasVideoAfter
      ? 'rounded-b-2xl md:rounded-b-none md:rounded-r-none'
      : 'rounded-none'

  return (
    <Link to={`/recipe/${recipe.id}`} className={`flex-1 min-w-0 w-full md:w-auto ${roundedClass}`}>
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={`
          h-full flex items-center gap-4 p-4 sm:p-6
          bg-white/5 backdrop-blur-xl border border-white/10
          ${roundedClass}
          hover:bg-white/[0.08] transition-colors
        `}
      >
        <div className="w-20 h-20 rounded-full flex-shrink-0 overflow-hidden">
          {recipe.image ? (
            <img src={encodeURI(recipe.image)} alt={recipe.name} className="w-full h-full object-cover object-center rounded-full scale-125" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${recipe.gradient} flex items-center justify-center text-xs text-center text-white/90`}>
              {recipe.imagePlaceholder || ''}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-white font-semibold text-base mb-1 truncate">{recipe.name}</h3>
          <div className="flex items-center gap-1 mb-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(recipe.rating) ? 'text-blue-400 fill-blue-400' : 'text-blue-400/30'}
              />
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            {recipe.rating} ({recipe.reviews} Reviews)
          </p>
        </div>
      </motion.div>
    </Link>
  )
}

export default RecipeCard
