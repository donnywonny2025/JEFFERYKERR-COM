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

## 🚀 Deployment & Operations

This project is set up for GitHub → Netlify continuous deployment with a custom domain.

### 1) Repository & GitHub
- Verify repo status:
  - `git status` — working tree state
  - `git branch` — current branch (usually `main`)
  - `git remote -v` — confirm `origin` points to the GitHub repo
- Typical workflow:
  - Create a feature branch → commit → push → open PR → merge to `main`
  - Netlify auto-builds and deploys on every push to the configured branch

### 2) Netlify (Build & Hosting)
- Configuration lives in `netlify.toml`:
  - Build command: `npm run build`
  - Publish directory: `.next`
  - Plugin: `@netlify/plugin-nextjs` (handles SSR/ISR, images, routing)
  - Node version: `18.20.3`
- One-time setup in Netlify UI:
  1. New site → Import from Git → select this GitHub repo
  2. Confirm build = `npm run build`, publish = `.next`
  3. Add any environment variables (see below)
  4. Deploy

### 3) Environment Variables
- If the code uses `process.env.*`, define them in Netlify:
  - Site settings → Environment variables → add keys and values
  - Redeploy after changes
- Local development: create `.env.local` (not committed) with the same keys

### 4) Custom Domain
- In Netlify → Domain management:
  - Add your domain (e.g., `jeffrecur.com`)
  - Follow Netlify’s DNS instructions (use Netlify DNS or set A/CNAME records)
  - Wait for propagation and SSL issuance (automatic via Let’s Encrypt)

### 5) Verification Checklist
- Local
  - `npm install` then `npm run dev` → visit http://localhost:3001
  - `npm run build` succeeds with no errors
- Git
  - `git remote -v` shows the correct GitHub repo
- Netlify
  - Site connected to GitHub and building `main` (or chosen) branch
  - `netlify.toml` present at repo root
  - Environment variables set (if required)
  - Domain attached and SSL is active

### 6) Rollbacks & Previews
- Deploy previews: Every PR creates a unique preview URL
- Instant rollbacks: In Netlify Deploys tab, select a previous successful deploy and **Restore**


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

## 🎛️ Noise Overlay Settings (Backgrounds Testing Page)

The backgrounds testing page (`app/backgrounds/page.tsx`) includes a selectable "New Background" option with a grain/film-noise foreground overlay for evaluation.

- **Component**: `src/components/ui/noise.tsx`
- **Current settings (as of latest working copy):**
  - `patternSize`: `269`
  - `patternScaleX`: `1`
  - `patternScaleY`: `1.01`
  - `patternRefreshInterval`: `1`
  - `patternAlpha`: `40` (per-pixel alpha, 0–255)
  - `className`: `"absolute inset-0 z-[2] opacity-70 mix-blend-overlay pointer-events-none"`

These values were chosen to make the grain clearly visible while minimizing large-scale tiling artifacts. The prime-ish `patternSize` and slight Y-scale offset help reduce banding; the overlay blend and opacity keep the texture readable on top of color gradients.

### Tweaking guidance
- Lower visibility: reduce `opacity-70` to `opacity-50` and/or set `patternAlpha` ≈ `24–32`.
- Softer blend: change `mix-blend-overlay` to `mix-blend-soft-light`.
- Fewer tiling artifacts: use prime-ish sizes like `257`/`269` and keep small anisotropy (`patternScaleY` ≈ `1.01–1.03`).
- Performance: raise `patternRefreshInterval` (e.g., `2`) to refresh the pattern less often.

### Where it’s used
- Rendered only when the "New Background" option is selected in `backgroundOptions` on `app/backgrounds/page.tsx`.

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
- Monitor animation frame rates
- Adjust particle counts in background effects
- Optimize image loading and lazy loading
- Configure code splitting for large components