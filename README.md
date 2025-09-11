# Jeffrey Kerr Portfolio

A clean, modern portfolio website built with Next.js, featuring advanced GSAP animations, motion primitives, and a responsive design.

## 🛠️ **Tech Stack**

### **Core Framework & Runtime**
- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - UI library
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript

### **Styling & Design**
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **PostCSS** - CSS processing tool
- **Custom CSS** - Advanced portfolio styling with film grain effects

### **Animations & Interactions**
- **GSAP 3.13.0** - Professional animation library
- **Framer Motion 12.23.12** - React animation library
- **Motion Primitives** - Custom animation components
- **ScrollTrigger** - GSAP scroll-based animations

### **Development Tools**
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Turbopack** - Fast bundler (Next.js built-in)

### **External Integrations**
- **Vimeo API** - Video hosting and playback
- **Vumbnail API** - Video thumbnail generation

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn package manager

### **Installation Steps**

1. **Navigate to the project folder:**
   ```bash
   cd "/Volumes/AI/WORK 2025/JEFFERYKERR-COM/"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3001](http://localhost:3001)

### **Available Scripts**
```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## ⚙️ **Project Configuration**

### **Next.js Configuration**
- **Framework:** Next.js 15 with App Router
- **Port:** 3001 (development)
- **Build Tool:** Turbopack (fast development builds)
- **TypeScript:** Enabled with strict type checking

### **Styling Configuration**
- **Tailwind CSS:** v4.0 with custom configuration
- **PostCSS:** Configured for Tailwind processing
- **CSS Modules:** Not used (utility-first approach)

### **Animation Configuration**
- **GSAP:** Registered with ScrollTrigger plugin
- **Framer Motion:** Configured for React components
- **Motion Primitives:** Custom components for consistent animations

## 📁 **Project Structure**

```
/Volumes/AI/WORK 2025/JEFFERYKERR-COM/
├── app/                          # Next.js App Router directory
│   ├── globals.css              # Global Tailwind CSS imports
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main portfolio page (client component)
├── src/                         # Source files directory
│   ├── components/              # React components
│   │   ├── motion-primitives/   # Custom animation components
│   │   │   ├── tilt.tsx         # 3D tilt effect component
│   │   │   ├── text-shimmer.tsx # Text shimmer animation
│   │   │   ├── digital-clock.tsx# Live updating clock
│   │   │   ├── morphing-dialog.tsx # Animated modal dialogs
│   │   │   └── sliding-number.tsx # Number sliding animation
│   │   └── SafeWrapper.jsx      # Error boundary component
│   ├── lib/                     # Utility functions
│   │   └── utils.ts             # Tailwind CSS utility functions
│   └── App.css                  # Main portfolio styles (1400+ lines)
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Dependency lock file
├── next.config.ts               # Next.js configuration
├── next-env.d.ts                # Next.js TypeScript declarations
├── postcss.config.js            # PostCSS configuration for Tailwind
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── components.json              # Component library configuration
├── eslint.config.mjs            # ESLint configuration
└── .gitignore                   # Git ignore rules
```

## 🔧 **How It Works**

### **Architecture Overview**
1. **Next.js App Router** - Uses the modern App Router for file-based routing
2. **Client Components** - Main portfolio page runs on the client side for animations
3. **Server Components** - Layout and other pages can be server-rendered
4. **Hybrid Approach** - Combines server and client rendering for optimal performance

### **Animation System**
1. **GSAP Core** - Handles complex scroll-triggered animations
2. **ScrollTrigger** - Creates animations based on scroll position
3. **Framer Motion** - Provides React-friendly animation primitives
4. **Motion Primitives** - Custom reusable animation components

### **Styling System**
1. **Tailwind CSS** - Utility-first CSS framework
2. **Custom CSS** - Advanced portfolio-specific styles
3. **CSS Variables** - Dynamic theming and responsive design
4. **Film Grain Effect** - Custom CSS animation for cinematic feel

### **Component Structure**
- **Main Portfolio** (`app/page.tsx`) - Complete portfolio with all features
- **Motion Primitives** (`src/components/motion-primitives/`) - Reusable animation components
- **Layout** (`app/layout.tsx`) - Root layout with global styles
- **Utilities** (`src/lib/utils.ts`) - Helper functions for styling

## ✨ Features

- **Advanced GSAP Animations** - Smooth scroll-triggered animations
- **Motion Primitives** - Custom animation components
- **Responsive Design** - Mobile-first approach
- **Digital Clock** - Live updating time display
- **Video Portfolio** - Vimeo video integration
- **Film Grain Effect** - Cinematic visual overlay
- **Morphing Dialogs** - Interactive modal animations

## 🎨 Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **GSAP** - Animation library
- **Framer Motion** - Motion components
- **Vimeo API** - Video integration

## 📝 Notes

This is a clean copy of the Jeffrey Kerr portfolio website, containing only the essential files needed to run the site. All unnecessary files and side projects have been removed for a streamlined development experience.

## 🎯 **Development Notes**

### **Development Server**
- **Default Port:** `localhost:3001`
- **Framework:** Next.js 15 with Turbopack
- **Hot Reload:** Enabled for instant updates
- **TypeScript:** Strict type checking enabled

### **Key Features Working**
- ✅ **GSAP Animations** - Scroll-triggered effects
- ✅ **Motion Primitives** - Custom animation components
- ✅ **Vimeo Integration** - Video playback
- ✅ **Responsive Design** - Mobile and desktop
- ✅ **Film Grain Effect** - Cinematic overlay
- ✅ **Digital Clock** - Live updating component
- ✅ **Interactive Modals** - Morphing dialog animations

## 🔧 **Troubleshooting**

### **Common Issues**
1. **Port 3001 in use:**
   ```bash
   # Kill process on port 3001
   lsof -ti:3001 | xargs kill -9
   ```

2. **Dependencies not installing:**
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors:**
   - Check `tsconfig.json` configuration
   - Ensure all imports are correct
   - Run `npm run lint` for detailed errors

### **Performance Notes**
- **Turbopack** provides fast development builds
- **GSAP** animations are optimized for 60fps
- **Lazy loading** implemented for videos
- **Code splitting** enabled for optimal loading

## 📝 **Important Notes**

- **Client-Side Rendering:** Main portfolio page uses `'use client'` for animations
- **CSS Imports:** Styles are imported from `src/App.css` in the main page
- **Component Structure:** All motion primitives are in `src/components/motion-primitives/`
- **Video Integration:** Uses Vimeo API for video playback and thumbnails
- **Responsive Design:** Mobile-first approach with custom breakpoints

## 🎨 **Customization**

### **Colors & Theming**
- Edit CSS variables in `src/App.css`
- Modify Tailwind config in `tailwind.config.js`
- Update component styles in respective files

### **Animations**
- GSAP animations in `app/page.tsx`
- Motion primitives in `src/components/motion-primitives/`
- Scroll triggers configured for optimal performance

### **Content**
- Update portfolio data in `app/page.tsx`
- Modify video URLs and project information
- Change contact details and social links