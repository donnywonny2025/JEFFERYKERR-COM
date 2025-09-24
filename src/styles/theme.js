// Theme constants for Jeffrey Kerr Portfolio
export const COLORS = {
  // Background colors
  BG_PRIMARY: '#0a0a0a',
  BG_SECONDARY: '#111111',

  // Text colors
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#cccccc',
  TEXT_MUTED: '#888888',

  // Accent colors
  ACCENT: '#ffffff',
  BORDER: '#333333',

  // LiquidEther colors
  LIQUID_COLORS: ['#4A1FA3', '#E640E6', '#7B2CBF', '#00A8CC', '#6B46C1']
};

export const TYPOGRAPHY = {
  FONT_FAMILY: {
    PRIMARY: "'Space Mono', monospace",
    SECONDARY: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  },
  FONT_SIZES: {
    H1: '2.1rem',
    H2: '1.5rem',
    BODY: '1.1rem',
    SMALL: '0.9rem',
    XS: '0.8rem'
  },
  FONT_WEIGHTS: {
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700
  },
  LETTER_SPACING: {
    TIGHT: '-0.02em',
    NORMAL: '0.5px',
    WIDE: '1px'
  }
};

export const SPACING = {
  HEADER_PADDING: '40px 60px',
  SECTION_PADDING: '80px',
  CARD_PADDING: '30px',
  BORDER_RADIUS: '12px',
  GAP: {
    SMALL: '6px',
    MEDIUM: '20px',
    LARGE: '40px',
    XL: '60px'
  }
};

export const Z_INDEX = {
  HEADER: 1000,
  MENU: 999,
  MODAL: 10000,
  OVERLAY: 9999
};

export const ANIMATIONS = {
  DURATION: {
    FAST: '0.3s',
    MEDIUM: '0.6s',
    SLOW: '1.2s',
    VERY_SLOW: '2.0s'
  },
  EASING: {
    DEFAULT: 'ease',
    IN_OUT: 'ease-in-out',
    POWER2: 'power2.out',
    ELASTIC: 'elastic.out(1, 0.8)',
    SPRING: 'spring(1 100 10 10)'
  },
  DELAYS: {
    MENU_ITEM_1: '0.1s',
    MENU_ITEM_2: '0.2s',
    MENU_ITEM_3: '0.3s',
    MENU_ITEM_4: '0.4s'
  }
};

export const BREAKPOINTS = {
  MOBILE: '480px',
  TABLET: '768px',
  DESKTOP: '1024px',
  WIDE: '1400px'
};

export const SHADOWS = {
  SUBTLE: '0 4px 20px rgba(0, 0, 0, 0.3)',
  MEDIUM: '0 10px 30px rgba(0, 0, 0, 0.2)',
  STRONG: '0 20px 40px rgba(0, 0, 0, 0.4)'
};

export const GRADIENTS = {
  TEXT_SHIMMER: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
  DIVIDER: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
  OVERLAY: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0%, transparent 70%)'
};

// LiquidEther configuration constants
export const LIQUID_ETHER_CONFIG = {
  STAR_LAYERS: 6,
  STAR_DENSITY: 0.75,
  STAR_DRIFT_SPEED: 0.035,
  STAR_ROTATION_SPEED: 0.15,
  STAR_BRIGHTNESS: 3.5,
  STAR_TWINKLE_SPEED: 3.2,
  ENABLE_STARS: false
};

// Menu configuration
export const MENU_CONFIG = {
  ITEMS: ['Home', 'Work', 'Contact'],
  EMAIL: 'colour8k@mac.com',
  VIDEO_URL: 'https://player.vimeo.com/video/1116767679',
  VIDEO_TITLE: 'Featured Showreel'
};

// Navigation links
export const NAV_LINKS = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Work' },
  { href: '#', label: 'Contact', className: 'nav-contact' }
];