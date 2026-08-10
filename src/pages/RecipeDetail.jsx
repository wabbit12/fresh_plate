import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Clock, Timer, UtensilsCrossed, ArrowLeft, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import { getRecipeById, recipes, getDetailImage } from '../data/recipes'
import Header from '../components/Header'

const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] }

const personAvatars = ['/images/person1.webp', '/images/person2.webp', '/images/person3.webp']

const KitchenCarousel = ({ images, recipeName }) => {
  const [index, setIndex] = useState(0)
  const count = images.length

  useEffect(() => {
    setIndex(0)
  }, [images])

  if (!count) return null

  const go = (dir) => {
    setIndex((i) => (i + dir + count) % count)
  }

  return (
    <div className="relative">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5 sm:aspect-[21/9]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={images[index]}
            src={encodeURI(images[index])}
            alt={`${recipeName} photo ${index + 1}`}
            width={1200}
            height={675}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1)
              else if (info.offset.x > 60) go(-1)
            }}
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-black/60"
          aria-label="Previous photo"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-black/60"
          aria-label="Next photo"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg ring-2 transition sm:h-16 sm:w-24 ${
              i === index ? 'ring-blue-400' : 'ring-transparent opacity-70 hover:opacity-100'
            }`}
            aria-label={`Thumbnail ${i + 1}`}
          >
            <img
              src={encodeURI(src)}
              alt=""
              width={96}
              height={64}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

const RecipeDetail = () => {
  const { id } = useParams()
  const recipe = getRecipeById(id)
  const currentIndex = recipe ? recipes.findIndex((r) => r.id === recipe.id) : 0
  const prevRecipe = recipes[(currentIndex - 1 + recipes.length) % recipes.length]
  const nextRecipe = recipes[(currentIndex + 1) % recipes.length]
  const related = recipes.filter((r) => r.id !== recipe?.id)

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

  const heroSrc = getDetailImage(recipe)
  const totalTimeLabel = `${recipe.prepTime} prep · ${recipe.cookTime} cook`

  return (
    <div className="min-h-screen pb-16">
      <Header />

      <AnimatePresence mode="wait">
        <motion.div
          key={recipe.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Full-bleed food hero */}
          <section className="relative min-h-[52vh] lg:min-h-[58vh] overflow-hidden">
            <motion.img
              src={encodeURI(heroSrc)}
              alt={recipe.name}
              width={1200}
              height={1200}
              fetchPriority="high"
              decoding="async"
              initial={{ scale: 1.08, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />

            <div className="relative z-10 mx-auto flex min-h-[52vh] lg:min-h-[58vh] max-w-7xl flex-col justify-end px-6 pb-8 pt-24 sm:pb-10 lg:pb-12">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.12 }}
                className="max-w-3xl"
              >
                <Link
                  to="/"
                  className="mb-5 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                >
                  <ArrowLeft size={18} />
                  <span>Back to Home</span>
                </Link>

                <p className="mb-3 font-display text-sm tracking-[0.22em] uppercase text-blue-200/90">
                  {recipe.category}
                  {recipe.categoryNumber ? ` · ${recipe.categoryNumber}` : ''}
                </p>

                <h1 className="font-playfair text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                  {recipe.name}
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                  {recipe.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/75">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(recipe.rating) ? 'fill-blue-400 text-blue-400' : 'text-white/25'}
                      />
                    ))}
                    <span className="ml-1">
                      {recipe.rating} · {recipe.reviews} reviews
                    </span>
                  </div>
                  <span className="hidden h-3 w-px bg-white/25 sm:block" aria-hidden />
                  <span>{totalTimeLabel}</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* At-a-glance facts */}
          <section className="border-b border-white/10 bg-slate-950/40">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
              {[
                { icon: Timer, label: 'Prep', value: recipe.prepTime },
                { icon: Clock, label: 'Cook', value: recipe.cookTime },
                { icon: UtensilsCrossed, label: 'Servings', value: String(recipe.servings) },
                { icon: Users, label: 'Tried it', value: `${recipe.peopleTried}+` },
              ].map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: 0.08 * i }}
                  className="flex items-start gap-3"
                >
                  <Icon size={18} className="mt-0.5 text-blue-400" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-500">{label}</p>
                    <p className="mt-1 font-display text-xl text-white">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Photo carousel */}
          {recipe.gallery?.length > 0 && (
            <section className="border-b border-white/10">
              <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={transition}
                  className="mb-6"
                >
                  <h2 className="font-playfair text-3xl font-bold text-white">From the kitchen</h2>
                  <p className="mt-2 text-sm text-gray-400">Plating, process, and the little details around this dish.</p>
                </motion.div>

                <KitchenCarousel images={recipe.gallery} recipeName={recipe.name} />
              </div>
            </section>
          )}

          {/* Ingredients + steps */}
          <section className="relative overflow-hidden">
            <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
              <motion.aside
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={transition}
                className="lg:col-span-5"
              >
                <h2 className="font-playfair text-3xl font-bold text-white">Ingredients</h2>
                <p className="mt-2 text-sm text-gray-400">Everything you need for {recipe.servings} servings.</p>
                <ul className="mt-8 space-y-0 divide-y divide-white/10 border-y border-white/10">
                  {recipe.ingredients.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 py-3.5 text-sm text-gray-200">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {recipe.peopleTried && (
                  <div className="mt-8 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {personAvatars.map((src) => (
                        <img
                          key={src}
                          src={src}
                          alt=""
                          width={36}
                          height={36}
                          loading="lazy"
                          decoding="async"
                          className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-900"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">
                      <span className="text-white">{recipe.peopleTried}</span> cooks have made this
                    </p>
                  </div>
                )}
              </motion.aside>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ ...transition, delay: 0.08 }}
                className="lg:col-span-7"
              >
                <h2 className="font-playfair text-3xl font-bold text-white">How to cook</h2>
                <p className="mt-2 text-sm text-gray-400">Follow each step — no rush, just good food.</p>

                <ol className="mt-10 space-y-8">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-4 sm:gap-5">
                      <span className="font-playfair text-3xl font-bold leading-none text-blue-400/90 tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="border-t border-white/10 pt-3">
                        <p className="text-[15px] leading-relaxed text-gray-200">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>
          </section>

          {/* Atmosphere band */}
          <section className="relative overflow-hidden border-y border-white/10">
            <img
              src="/images/gallery/dining-table.webp"
              alt=""
              width={1400}
              height={800}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/60" />
            <div className="relative mx-auto flex max-w-7xl flex-col gap-4 px-6 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-300/80">Fresh Plate</p>
                <h2 className="mt-3 font-playfair text-3xl font-bold text-white sm:text-4xl">
                  Made for the table, not just the feed.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  Save this menu, invite a friend, and cook something that tastes like home.
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Explore more menus
              </Link>
            </div>
          </section>

          {/* More recipes */}
          <section className="border-t border-white/10 bg-slate-950/50">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-playfair text-3xl font-bold text-white">More to cook</h2>
                  <p className="mt-2 text-sm text-gray-400">Browse another plate from the menu.</p>
                </div>
                <Link to="/#trending" className="hidden text-sm text-blue-300 transition hover:text-blue-200 sm:inline">
                  View all
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {related.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...transition, delay: 0.06 * i }}
                  >
                    <Link
                      to={`/recipe/${r.id}`}
                      className="group flex items-center gap-3 rounded-xl bg-white/[0.03] p-2.5 ring-1 ring-white/10 transition hover:bg-white/[0.06] hover:ring-white/20"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg sm:h-[5.5rem] sm:w-[5.5rem]">
                        <img
                          src={encodeURI(r.image || getDetailImage(r))}
                          alt={r.name}
                          width={160}
                          height={160}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1 pr-1">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">{r.category}</p>
                        <h3 className="mt-0.5 font-display text-base font-semibold leading-snug text-white group-hover:text-blue-200 transition line-clamp-2">
                          {r.name}
                        </h3>
                        <p className="mt-1 text-xs text-white/55">{r.rating} rating · {r.cookTime}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Prev / next with image previews */}
          <nav className="mx-auto grid max-w-7xl gap-4 px-6 pt-10 sm:grid-cols-2" aria-label="Recipe navigation">
            <Link
              to={`/recipe/${prevRecipe.id}`}
              className="group flex items-center gap-4 rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/10 transition hover:bg-white/[0.06] hover:ring-white/20"
            >
              <img
                src={encodeURI(prevRecipe.image)}
                alt=""
                width={72}
                height={72}
                loading="lazy"
                decoding="async"
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-gray-500">
                  <ChevronLeft size={14} /> Previous
                </p>
                <p className="mt-1 truncate font-display text-lg text-white group-hover:text-blue-200 transition">
                  {prevRecipe.name}
                </p>
              </div>
            </Link>
            <Link
              to={`/recipe/${nextRecipe.id}`}
              className="group flex items-center gap-4 rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/10 transition hover:bg-white/[0.06] hover:ring-white/20 sm:flex-row-reverse sm:text-right"
            >
              <img
                src={encodeURI(nextRecipe.image)}
                alt=""
                width={72}
                height={72}
                loading="lazy"
                decoding="async"
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-gray-500 sm:justify-end">
                  Next <ChevronRight size={14} />
                </p>
                <p className="mt-1 truncate font-display text-lg text-white group-hover:text-blue-200 transition">
                  {nextRecipe.name}
                </p>
              </div>
            </Link>
          </nav>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default RecipeDetail
