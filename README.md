# Recipe Website 🍽️

A modern, responsive recipe website built with React, Tailwind CSS, and Framer Motion animations.

## Features

- 🎨 Modern dark theme UI
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🍳 Recipe showcase with ratings and reviews
- 🎥 Video tutorial section
- 🔍 Search functionality

## Tech Stack

- **React** - UI library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vite** - Build tool
- **Lucide React** - Icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build

```bash
npm run build
```

The build folder will contain your production-ready files.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project
5. Click "Deploy"

That's it! Your site will be live in minutes.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx         # Navigation header
│   ├── Hero.jsx           # Hero section with main recipe
│   ├── RecipeCard.jsx     # Individual recipe card
│   ├── RecipeGrid.jsx     # Grid of recipe cards
│   └── VideoSection.jsx   # Video tutorial section
├── App.jsx                # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## Customization

### Adding Your Own Content

Replace the placeholder text and image placeholders in the components:
- `Hero.jsx` - Main recipe content
- `RecipeGrid.jsx` - Recipe data array
- `VideoSection.jsx` - Video content

### Adding Real Images

Replace the placeholder divs with actual images:

```jsx
// Before
<div className="...">
  [Image Placeholder]
</div>

// After
<img 
  src="/path/to/image.jpg" 
  alt="Description"
  className="..."
/>
```

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
theme: {
  extend: {
    colors: {
      dark: {
        900: '#your-color',
        800: '#your-color',
        700: '#your-color',
      }
    },
  },
}
```

## License

MIT
