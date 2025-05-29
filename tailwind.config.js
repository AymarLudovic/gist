/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode by default
  theme: {
    extend: {
      colors: {
        // Core Palette
        'deep-black': '#0A0A0A',
        'dark-gray': '#1A1A1A',
        'light-gray': '#B0B0B0',
        'white': '#F5F5F5',

        // Accent Colors (subtle neon/vibrant)
        'electric-blue': '#4A90E2',
        'vibrant-green': '#50E3C2',
        'purple-glow': '#A64AE2',
        'neon-pink': '#E24AB0',
        'golden-yellow': '#F8E71C',

        // Gradients (Tailwind JIT compiles these, or use custom CSS)
        'gradient-start': 'var(--gradient-start, #4A90E2)',
        'gradient-end': 'var(--gradient-end, #A64AE2)',
      },
      fontFamily: {
        // Primary font for body text and general elements
        'sans': ['DM Sans', 'sans-serif'],
        // For headings and dramatic typography
        'display': ['Space Grotesk', 'sans-serif'],
        // For specific elements or callouts, a secondary sans-serif
        'alt-sans': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'hero-xl': 'clamp(4rem, 10vw, 12rem)', // Min 64px, max 192px
        'hero-lg': 'clamp(3rem, 8vw, 8rem)',   // Min 48px, max 128px
        'heading-xl': 'clamp(2.5rem, 6vw, 6rem)', // Min 40px, max 96px
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'neumorphic-light': '5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.05)',
        'neumorphic-dark': '5px 5px 10px rgba(0, 0, 0, 0.5), -5px -5px 10px rgba(255, 255, 255, 0.01)',
        'glow-sm': '0 0 5px rgba(74, 144, 226, 0.5)',
        'glow-md': '0 0 15px rgba(74, 144, 226, 0.7)',
        'glow-lg': '0 0 30px rgba(74, 144, 226, 0.9)',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'morph': {
          '0%': { 'border-radius': '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { 'border-radius': '30% 60% 70% 40%/50% 60% 30% 60%' },
          '100%': { 'border-radius': '60% 40% 30% 70%/60% 30% 70% 40%' },
        },
        'text-reveal': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      },
      animation: {
        'gradient-shift': 'gradient-shift 10s ease infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'text-reveal': 'text-reveal 0.8s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundSize: {
        '200%': '200% 200%', // For gradient shift animation
      }
    },
  },
  plugins: [],
}