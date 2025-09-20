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
 │   │   │   ├── text-roll.tsx    # LETTER-BY-LETTER TEXT ANIMATION (HERO TEXT)
 │   │   │   ├── digital-clock.tsx# Live updating clock
 │   │   │   ├── morphing-dialog.tsx # Animated modal dialogs
 │   │   │   └── sliding-number.tsx # Number sliding animation
 │   │   ├── HeroHeading.tsx      # HERO TEXT COMPONENT - TextRoll implementation
 │   │   └── SafeWrapper.jsx      # Error boundary component
 │   ├── lib/                     # Utility functions
 │   │   └── utils.ts             # Tailwind CSS utility functions
 │   └── App.css                  # Main portfolio styles (1400+ lines)
 │       └── .hero-main-text      # HERO TEXT STYLING - font, size, positioning
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

### **Hero Text Implementation Details**
- **Component:** `src/components/HeroHeading.tsx` - Main hero text logic
- **Animation:** `src/components/motion-primitives/text-roll.tsx` - TextRoll component
- **Styling:** `src/App.css` - `.hero-main-text`, `.hero-meta`, `.meta-item` classes
- **Integration:** `app/page.tsx` - `<HeroHeading />` component usage
- **Animation Flow:** TextRoll → letter-by-letter reveal → meta info fade-in after 2s
 ```

## 🔧 **How It Works**

### **Architecture Overview**
1. **Next.js App Router** - Uses the modern App Router for file-based routing
2. **Client Components** - Main portfolio page runs on the client side for animations
3. **Server Components** - Layout and other pages can be server-rendered
4. **Hybrid Approach** - Combines server and client rendering for optimal performance

### **Hero Text Animation System**
The hero text features a sophisticated letter-by-letter reveal animation using the **TextRoll** component from Motion Primitives:

#### **TextRoll Component Implementation**
- **Location:** `src/components/HeroHeading.tsx`
- **Animation:** Letter-by-letter reveal with staggered timing
- **Duration:** 0.8 seconds total animation time
- **Delay:** Each letter delayed by 0.08 seconds (creates smooth cascading effect)
- **Styling:** Applied via `className="hero-main-text"` prop

#### **Hero Text Structure**
```jsx
<TextRoll
  className="hero-main-text"
  duration={0.8}
  getEnterDelay={(i) => i * 0.08}
>
  I produce compelling visual content while building AI-enhanced workflows that change how creative work gets done.
</TextRoll>
```

#### **Meta Information Animation**
- **Location & Email:** Display below main text with fade-in animation
- **Timing:** Appears 2 seconds after page load
- **Styling:** Uses `.hero-meta` and `.meta-item` classes
- **Content:** "Grand Rapids, Michigan / World" and "colour8k@mac.com"

#### **CSS Styling Details**
- **Font Family:** 'Space Mono', monospace (consistent with site theme)
- **Font Size:** 2rem (responsive, not overwhelming)
- **Font Weight:** 400 (clean, not bold)
- **Text Alignment:** Left-aligned to match logo positioning
- **Positioning:** `margin: 15vh 0 0 60px` (aligned with header)
- **Animation:** Pure CSS transforms, no conflicting JavaScript animations

### **Animation System**
1. **GSAP Core** - Handles complex scroll-triggered animations
2. **ScrollTrigger** - Creates animations based on scroll position
3. **Framer Motion** - Provides React-friendly animation primitives
4. **Motion Primitives** - Custom reusable animation components
5. **TextRoll** - Specialized letter-by-letter text animation component

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

### **Background System Architecture**
The portfolio features multiple animated background options, each implemented as separate Next.js pages:

#### **Background Pages Structure**
```
app/backgrounds/
├── page.tsx              # Background selector/index page
├── liquid/               # Liquid Ether background
│   └── page.tsx         # Animated liquid particles effect
├── liquid-stars/        # Liquid Ether + Stars
│   └── page.tsx         # Combined liquid and starfield effect
└── starfield/           # Pure Starfield background
    └── page.tsx         # Animated starfield with twinkling
```

#### **Background Components**
- **LiquidEther** (`src/components/LiquidEther.jsx`) - Canvas-based particle system
  - Colors: Customizable color palette
  - Stars: Optional star overlay
  - Performance: Optimized with `will-change` and `requestAnimationFrame`
- **StarField** (`src/components/StarField.tsx`) - WebGL-based starfield
  - Layers: Multiple star layers for depth
  - Animation: Smooth parallax movement
  - Performance: GPU-accelerated rendering

#### **Background Integration**
- **Main Portfolio** uses LiquidEther with reduced opacity (0.3)
- **Background Pages** showcase full-screen effects
- **Navigation** via `/backgrounds` route
- **Performance** optimized with conditional rendering

### **Video Portfolio System**
#### **Video Data Structure**
```typescript
interface Video {
  id: string;           // Unique identifier
  title: string;        // Video title
  client: string;       // Client name
  date: string;         // Production year
  thumbnail: string;    // Vimeo thumbnail URL
  embedUrl: string;     // Vimeo embed URL (optional)
  description: string;  // Project description
  credits: string[];    // Production credits
}
```

#### **Video Components**
- **Featured Video** - Large hero video with circular play button
- **Video Grid** - Responsive grid of video thumbnails
- **Video Modal** - Full-screen video player overlay
- **Video Separators** - Text dividers between video sections

#### **Video APIs Integration**
- **Vimeo API** - Direct video embedding
- **Vumbnail API** - Automatic thumbnail generation
- **Responsive Design** - Mobile-optimized video players

### **Menu & Navigation System**
#### **Menu Components**
- **Menu.jsx** (`src/components/Menu/Menu.jsx`) - Main menu logic
- **Menu.css** (`src/components/Menu/Menu.css`) - Menu styling and animations
- **Hamburger Animation** - Custom CSS keyframe animations

#### **Menu States**
- **Closed** - Hidden overlay
- **Open** - Full-screen overlay with navigation
- **Mobile Navigation** - Touch-optimized mobile menu
- **Desktop Navigation** - Header-based navigation

#### **Menu Features**
- **Smooth Animations** - CSS transitions and transforms
- **Accessibility** - Keyboard navigation support
- **Responsive Design** - Adapts to screen size
- **Route Navigation** - Integrates with Next.js routing

### **Animation Stack Architecture**
#### **Primary Animation Libraries**
1. **GSAP (GreenSock Animation Platform)**
   - **Purpose:** Complex, high-performance animations
   - **Usage:** Scroll-triggered effects, timeline animations
   - **Integration:** Registered in `app/page.tsx`

2. **Framer Motion**
   - **Purpose:** React-native animation components
   - **Usage:** Component-level animations, gestures
   - **Integration:** Imported in motion components

3. **Motion Primitives**
   - **Purpose:** Custom reusable animation components
   - **Components:**
     - `TextRoll` - Letter-by-letter text reveal
     - `TextShimmer` - Text glow/shimmer effect
     - `Tilt` - 3D tilt interactions
     - `DigitalClock` - Live updating clock
     - `MorphingDialog` - Animated modal dialogs
     - `SlidingNumber` - Number transition animations

#### **Animation Performance Optimizations**
- **GPU Acceleration** - `transform3d`, `will-change` properties
- **RequestAnimationFrame** - Smooth 60fps animations
- **Lazy Loading** - Components load only when needed
- **Code Splitting** - Animation libraries loaded separately

### **Styling Architecture**
#### **CSS Organization**
- **Tailwind CSS** - Utility-first framework (v4.0)
- **Custom CSS** - Portfolio-specific styles in `src/App.css`
- **CSS Variables** - Dynamic theming and responsive values
- **Component Styles** - Scoped styles for individual components

#### **Design System**
- **Color Palette:** Custom variables for consistent theming
- **Typography:** Space Mono monospace font throughout
- **Spacing:** Consistent margin/padding system
- **Responsive Breakpoints:** Mobile-first approach

#### **Visual Effects**
- **Film Grain Overlay** - CSS-animated texture effect
- **Backdrop Blur** - Modern glassmorphism effects
- **Gradient Backgrounds** - Dynamic color transitions
- **Box Shadows** - Depth and dimension effects

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

## 🎨 **Customization Guide**

### **Hero Text Customization**
1. **Change the main text:**
   - Edit `src/components/HeroHeading.tsx`
   - Modify the text inside the `<TextRoll>` component

2. **Adjust animation timing:**
   - `duration={0.8}` - Total animation time
   - `getEnterDelay={(i) => i * 0.08}` - Delay between each letter

3. **Update location/email:**
   - Edit the JSX in `HeroHeading.tsx`
   - Modify `.meta-item` content

4. **Styling changes:**
   - Edit `.hero-main-text` in `src/App.css`
   - Adjust font-size, font-weight, color, positioning

### **Background System Customization**
1. **Add new backgrounds:**
   - Create new folder in `app/backgrounds/`
   - Add `page.tsx` with your background component
   - Update navigation in main `backgrounds/page.tsx`

2. **Modify LiquidEther:**
   - Edit `src/components/LiquidEther.jsx`
   - Change colors, star density, animation speeds
   - Adjust particle count and performance settings

3. **Customize StarField:**
   - Edit `src/components/StarField.tsx`
   - Modify star layers, colors, movement speeds
   - Adjust twinkle effects and brightness

### **Video Portfolio Customization**
1. **Add new videos:**
   - Edit the `videos` array in `app/page.tsx`
   - Add new Video objects with required properties
   - Update Vimeo URLs and thumbnails

2. **Modify video layout:**
   - Edit video grid CSS in `src/App.css`
   - Adjust `.video-card`, `.video-grid` styles
   - Change responsive breakpoints

### **Animation Customization**
1. **GSAP Animations:**
   - Edit `app/page.tsx` useEffect hooks
   - Modify ScrollTrigger configurations
   - Adjust animation timelines and easing

2. **Motion Primitives:**
   - Edit components in `src/components/motion-primitives/`
   - Modify animation parameters and styles
   - Add new primitive components

### **Menu & Navigation**
1. **Menu styling:**
   - Edit `src/components/Menu/Menu.css`
   - Modify colors, animations, positioning

2. **Navigation logic:**
   - Edit `src/components/Menu/Menu.jsx`
   - Update menu items and routing logic

### **Colors & Theming**
- Edit CSS variables in `src/App.css` root section
- Modify Tailwind config in `tailwind.config.js`
- Update component styles in respective files

### **Content Management**
- Update portfolio data in `app/page.tsx` videos array
- Modify video URLs and project information
- Change contact details and social links
- Edit brand logos and client information

### **Performance Optimization**
  468→- Monitor animation frame rates
  469→- Adjust particle counts in background effects
  470→- Optimize image loading and lazy loading
  471→- Configure code splitting for large components

## 🚀 Deployment (Netlify)

This project deploys from GitHub to Netlify. Follow these instructions exactly to avoid common CI pitfalls (Turbopack, path alias resolution, missing utils, etc.).

### Netlify Build Settings
- **Build command**
  ```bash
  npm ci && npm run build
  ```
- **Publish directory**
  ```
  .next
  ```
- **Node version**
  - Set the site to use Node 20.x in Netlify → Site settings → Build & deploy → Environment → Node version
  - Optionally add an `.nvmrc` file with `20`
- **Next.js runtime**
  - Netlify auto-detects Next.js. The optional plugin below makes this explicit:
  - Optional `netlify.toml`:
    ```toml
    [build]
      command = "npm ci && npm run build"
      publish = ".next"
    [[plugins]]
      package = "@netlify/plugin-nextjs"
    ```

### Why we use standard Next.js build (not Turbopack) for CI
- **Local dev** uses Turbopack for speed (`npm run dev`).
- **Production builds** on Netlify use the standard, stable Webpack pipeline (`npm run build` → `next build`).
- Turbopack can fail or behave differently in CI images; switching to `next build` removes that variability.

### Path Alias Gotchas (Production)
- The component `src/components/ui/meteors.tsx` originally imported a utility via `@/lib/utils`.
- Netlify did not resolve the `@` alias by default, causing:
  - `Module not found: Can't resolve '@/lib/utils'`
- Fix applied:
  - Created `src/lib/utils.ts` with the standard shadcn `cn()` helper.
  - Replaced alias import with a relative import:
    ```ts
    // Before
    import { cn } from '@/lib/utils'
    // After
    import { cn } from '../../lib/utils'
    ```
- Recommendation: Prefer relative imports to ensure portability across environments, or ensure CI respects your `tsconfig.json` path aliases.

### Troubleshooting Guide (Common Build Failures)
- **Exit code: 2 during build**
  - Check Node version (use 20.x). Mismatch can cause opaque failures.
  - Ensure build command is `npm ci && npm run build` (clean, reproducible install).
  - Clear Netlify cache and redeploy.
- **Module not found: '@/lib/utils'**
  - Ensure `src/lib/utils.ts` exists and exports `cn()`:
    ```ts
    import { clsx, type ClassValue } from 'clsx'
    import { twMerge } from 'tailwind-merge'
    export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
    ```
  - Update imports to relative paths (e.g., `../../lib/utils`).
- **Runtime TypeError: `__webpack_modules__[moduleId] is not a function`**
  - Usually a stale client chunk or import mismatch.
  - Clear `.next/`, restart, and hard-refresh the browser.
  - Verify default vs named imports for any module you call like a function.
- **Performance/back navigation feels slow in dev**
  - Dev mode disables some optimizations; test in production locally:
    ```bash
    npm run build && npm start
    ```
  - In production, Next.js client navigation and prefetching are enabled.
- **Out-of-memory or long builds**
  - Stick with `next build` (Webpack). Avoid Turbopack in CI.
  - Reduce external network calls and heavy postinstall scripts.

### Step-by-Step Deployment Checklist
1. **Local sanity check**
   - `npm ci` (optional locally), `npm run build` → build must succeed.
2. **Commit & push** to `main`.
3. **Netlify settings**
   - Build: `npm ci && npm run build`
   - Publish: `.next`
   - Node: 20.x
4. **Clear cache & deploy** in Netlify (Deploys → Clear cache and deploy site).
5. **Verify deploy logs**
   - Ensure it runs `next build` and publishes successfully.
6. **Smoke test production**
   - Open the site, navigate Home → Project → Back. Confirm fast, client-side back navigation.

### Notes & References
- Build script in `package.json`:
  ```json
  {
    "scripts": {
      "dev": "next dev -p 3001",
      "build": "next build",
      "start": "next start"
    }
  }
  ```
- Utility helper file: `src/lib/utils.ts` (required by meteors component).
- Relative import fix: `src/components/ui/meteors.tsx` now uses `../../lib/utils`.