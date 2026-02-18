// Shared recipe data. Hero featured recipe = id 0, cards = 1, 2, 3.
export const recipes = [
  {
    id: 0,
    name: 'Mix Fresh Chicken With Rice',
    rating: 4.2,
    reviews: 127,
    gradient: 'from-amber-200 via-orange-100 to-yellow-100',
    image: '/images/chicken rice.png',
    imagePlaceholder: 'Chicken, broccoli, rice',
    category: 'Dinner Menu',
    categoryNumber: '03',
    description: 'A simple, satisfying dinner of tender grilled chicken, steamed broccoli, and fluffy white rice. The chicken is seasoned with garlic and paprika for a golden, flavourful crust, while the broccoli stays bright and tender-crisp. Serve it all over a bed of steaming rice for a balanced plate that feels indulgent but comes together in under an hour. Perfect for a weeknight meal, meal prep, or when you want something wholesome without a long ingredient list.',
    peopleTried: 28,
    ingredients: [
      '2 boneless, skinless chicken breasts',
      '1 cup long-grain white rice',
      '2 cups broccoli florets',
      '2 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp paprika',
      'Salt and black pepper to taste',
      'Lemon wedges (optional)'
    ],
    instructions: [
      'Cook the rice according to package directions. Keep warm.',
      'Season the chicken with garlic powder, paprika, salt, and pepper.',
      'Heat 1 tbsp olive oil in a skillet over medium-high heat. Cook the chicken for 6–7 minutes per side until golden and cooked through. Rest for 5 minutes, then slice.',
      'Steam or boil the broccoli until tender-crisp, about 4–5 minutes. Drain and toss with a little olive oil and salt.',
      'Divide the rice among plates, top with sliced chicken and broccoli. Serve with lemon wedges if desired.'
    ],
    prepTime: '15 min',
    cookTime: '25 min',
    servings: 2
  },
  {
    id: 1,
    name: 'Chicken Adobo',
    rating: 4.7,
    reviews: 120,
    gradient: 'from-amber-700 to-orange-600',
    image: '/images/chicken adobo.png',
    imagePlaceholder: 'Chicken adobo with rice',
    category: 'Lunch',
    description: 'The Philippines’ most beloved dish: chicken braised in soy sauce, vinegar, garlic, and black peppercorns until tender and glossy. Savory, slightly tangy, and perfect over steamed rice.',
    peopleTried: 95,
    ingredients: [
      '1.5 kg chicken thighs or drumsticks',
      '½ cup soy sauce',
      '½ cup white vinegar',
      '1 head garlic, crushed',
      '1 tsp whole black peppercorns',
      '3–4 bay leaves',
      '2 tbsp cooking oil',
      '1 tbsp brown sugar (optional)',
      'Steamed white rice, to serve'
    ],
    instructions: [
      'In a pot, combine chicken, soy sauce, vinegar, garlic, peppercorns, and bay leaves. Do not stir. Bring to a boil over medium-high heat, then lower heat and simmer uncovered for 30–40 minutes, turning chicken occasionally.',
      'Once the vinegar has mellowed and chicken is tender, remove chicken. Strain and reserve the sauce.',
      'Heat oil in a pan over medium heat. Pan-fry the chicken until skin is golden and slightly crisp, about 5–7 minutes per side. Set aside.',
      'Pour the reserved sauce into the same pan. Add sugar if using. Simmer until slightly reduced and glossy. Return chicken to the pan and toss to coat. Serve hot with steamed rice.'
    ],
    prepTime: '15 min',
    cookTime: '50 min',
    servings: 4
  },
  {
    id: 2,
    name: 'Pancit Canton',
    rating: 4.1,
    reviews: 162,
    gradient: 'from-amber-800 to-yellow-700',
    image: '/images/canton.png',
    imagePlaceholder: 'Pancit canton noodles',
    category: 'Lunch',
    description: 'Stir-fried egg noodles with tender slices of pork, shrimp, and crisp vegetables in a savoury sauce. A classic Filipino noodle dish for birthdays and everyday meals.',
    peopleTried: 110,
    ingredients: [
      '400 g pancit canton (dried egg noodles)',
      '200 g pork, sliced thin',
      '150 g shrimp, peeled',
      '2 cups cabbage, shredded',
      '1 cup carrots, julienned',
      '1 cup green beans, sliced',
      '4 cloves garlic, minced',
      '1 small onion, sliced',
      '3 tbsp soy sauce',
      '2 tbsp oyster sauce',
      '1 cup chicken or pork broth',
      'Calamansi or lemon wedges, to serve'
    ],
    instructions: [
      'Soak the dried noodles in warm water for 5 minutes. Drain and set aside.',
      'Heat oil in a large wok or pan over high heat. Sauté garlic and onion until fragrant. Add pork and cook until lightly browned. Add shrimp and cook until pink.',
      'Add carrots and green beans. Stir-fry for 2 minutes, then add cabbage. Pour in soy sauce, oyster sauce, and broth. Bring to a simmer.',
      'Add the drained noodles. Toss with tongs until noodles absorb the sauce and are tender, 3–5 minutes. Add more broth if needed. Season to taste. Serve with calamansi or lemon.'
    ],
    prepTime: '25 min',
    cookTime: '20 min',
    servings: 4
  },
  {
    id: 3,
    name: 'Lumpia',
    rating: 4.1,
    reviews: 127,
    gradient: 'from-yellow-500 to-amber-400',
    image: '/images/lumpia.png',
    imagePlaceholder: 'Fried lumpia with sauce',
    category: 'Merienda',
    description: 'Crispy Filipino spring rolls filled with ground pork, carrots, and cabbage. Golden and crunchy outside, savoury and juicy inside. Serve with sweet chili or vinegar dipping sauce.',
    peopleTried: 88,
    ingredients: [
      '1 pack lumpia wrappers (about 25–30 sheets)',
      '400 g ground pork',
      '1 cup carrots, grated',
      '2 cups cabbage, finely shredded',
      '½ cup green onions, chopped',
      '4 cloves garlic, minced',
      '2 tbsp soy sauce',
      'Salt and pepper to taste',
      'Oil for frying',
      'Sweet chili or vinegar with garlic, for dipping'
    ],
    instructions: [
      'In a pan, sauté garlic until fragrant. Add ground pork and cook until no longer pink. Add carrots and cabbage. Cook until vegetables are soft. Stir in soy sauce, green onions, salt, and pepper. Let filling cool completely.',
      'Place a lumpia wrapper on a clean surface with a corner facing you. Put about 2 tbsp of filling near the bottom corner. Fold the corner over the filling, then fold in the left and right sides. Roll tightly. Seal the top corner with a dab of water.',
      'Heat oil in a deep pan to 350°F (175°C). Fry lumpia in batches until golden and crisp, 3–4 minutes. Drain on paper towels. Serve hot with sweet chili or vinegar dipping sauce.'
    ],
    prepTime: '40 min',
    cookTime: '20 min',
    servings: 6
  }
]

export const getRecipeById = (id) => recipes.find((r) => r.id === Number(id))
export const getFeaturedRecipe = () => recipes[0]

/** Returns the "2" variant image path for hero/detail (e.g. lumpia.png → lumpia2.png). Chicken rice stays original; cards keep using recipe.image. */
export const getDetailImage = (imagePath) => {
  if (!imagePath) return imagePath
  if (imagePath.includes('chicken rice')) return imagePath
  const lastDot = imagePath.lastIndexOf('.')
  if (lastDot === -1) return imagePath + '2'
  return imagePath.slice(0, lastDot) + '2' + imagePath.slice(lastDot)
}
