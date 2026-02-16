# Beyond Degrees - React Vite Project

A modern, dark-themed career exploration platform built with React and Vite.

## Features

- ⚡ **Fast Development** - Powered by Vite for instant HMR
- 🎨 **Dark Theme** - Modern dark contrast design
- 📱 **Mobile Responsive** - Fully responsive with hidden sidebar
- 🎯 **Interactive UI** - Smooth animations and transitions
- 🔄 **Dynamic Content** - Rotating headlines and scroll animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Move assets folder to public directory:
   - Copy the `assests` folder from root to `public/assests`
   - Or create a symlink: `public/assests` → `../assests`

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
beyond-degrees/
├── public/
│   └── assests/          # Static assets (images, etc.)
├── src/
│   ├── components/       # React components
│   │   ├── Navbar.js
│   │   ├── Sidebar.js
│   │   ├── Hero.js
│   │   ├── ContentSection.js
│   │   └── CTA.js
│   ├── App.js           # Main app component
│   ├── App.css
│   ├── index.jsx        # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json
```

## Key Features

- **Hidden Sidebar**: Sidebar is hidden by default and accessible via hamburger menu
- **Logo Background**: Main page features logo as background with opacity
- **Dark Theme**: Full dark contrast design
- **Mobile First**: Optimized for mobile devices with hidden navigation

## Adding New Images

Place new images in the `public/assests/` folder and reference them in components using:
```jsx
<img src="/assests/your-image.jpg" alt="Description" />
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
