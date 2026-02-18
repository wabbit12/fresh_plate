import React from 'react'
import { motion } from 'framer-motion'
import RecipeCard from './RecipeCard'
import VideoSection from './VideoSection'
import { recipes } from '../data/recipes'

const RecipeGrid = () => {
  // Cards show recipes 1, 2, 3 (hero is 0)
  const cardRecipes = recipes.filter((r) => r.id >= 1 && r.id <= 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  return (
    <section className="px-0 py-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row gap-0 overflow-hidden rounded-2xl md:rounded-2xl"
      >
        <div className="flex flex-col md:flex-row flex-1 gap-0 min-w-0">
          {cardRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFirst={index === 0}
              isLast={index === cardRecipes.length - 1}
              hasVideoAfter
            />
          ))}
        </div>
        <VideoSection />
      </motion.div>
    </section>
  )
}

export default RecipeGrid
