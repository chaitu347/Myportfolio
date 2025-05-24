/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors from your CSS
        'carbon-mist': '#121212',
        'alpine-frost': '#f5f5f7',
        'silicon': '#a1a1a6',
        'blue-tint': '#2997ff',
        'metallic-gray': '#7d7d81',
        'vanilla-latte': '#f3e5c3',
        'dark-vanilla': '#776858',
        'expresso-brown': '#574545',
        'deep-olive': '#1a2417',
        'blue': {
          50: 'oklch(.97 .014 254.604)',
          600: 'oklch(.546 .245 262.881)',
        },
        'white': '#fff',
      },
      fontFamily: {
        // Custom fonts
        'zentry': ['zentry', 'sans-serif'],
        'general': ['general', 'sans-serif'],
        'robert-medium': ['robert-medium', 'sans-serif'],
        'robert-regular': ['robert-regular', 'sans-serif'],
        'circular-web': ['circular-web', 'sans-serif'],
      },
      fontSize: {
        // Custom font sizes
        'xs': ['.75rem', { lineHeight: 'calc(1/.75)' }],
        'sm': ['.875rem', { lineHeight: 'calc(1.25/.875)' }],
        'lg': ['1.125rem', { lineHeight: 'calc(1.75/1.125)' }],
        'xl': ['1.25rem', { lineHeight: 'calc(1.75/1.25)' }],
        '2xl': ['1.5rem', { lineHeight: 'calc(2/1.5)' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      spacing: {
        // Custom spacing values
        '0.5': '0.125rem',
        '1': '0.25rem',
        '2': '0.5rem',
        '4': '1rem',
        '5': '1.25rem',
        '8': '2rem',
        '10': '2.5rem',
        '15': '3.75rem',
        '16': '4rem',
        '25': '6.25rem',
        '45': '11.25rem',
        '96': '24rem',
      },
      margin: {
        // Custom margin values
        '15': '3.75rem',
        '25': '6.25rem',
        '45': '11.25rem',
      },
      borderRadius: {
        'lg': '.5rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        'ease-in': 'cubic-bezier(.4,0,1,1)',
        'ease-out': 'cubic-bezier(0,0,.2,1)',
        'ease-in-out': 'cubic-bezier(.4,0,.2,1)',
      },
      transitionDuration: {
        'DEFAULT': '.15s',
        '200': '.2s',
        '300': '.3s',
        '700': '.7s',
      },
      backgroundImage: {
        // Custom background patterns
        'graph-paper-sm': 'linear-gradient(to right, var(--color-gray) 1px, transparent 1px), linear-gradient(to bottom, var(--color-gray) 1px, transparent 1px)',
        'graph-paper-lg-hero': 'linear-gradient(to right, var(--color-grayish) 1px, transparent 1px), linear-gradient(to bottom, var(--color-grayish) 1px, transparent 1px)',
        'graph-paper-lg-about': 'linear-gradient(to right, var(--color-desert-sand) 1px, transparent 1px), linear-gradient(to bottom, var(--color-desert-sand) 1px, transparent 1px)',
        'graph-paper-multi': 'linear-gradient(to right, var(--color-dark-blue) 1px, transparent 1px), linear-gradient(to bottom, var(--color-dark-blue) 1px, transparent 1px), linear-gradient(to right, var(--color-desert-sand) .5px, transparent .5px), linear-gradient(to bottom, var(--color-desert-sand) .5px, transparent .5px)',
      },
      backgroundSize: {
        'graph-sm': '10px 10px',
        'graph-lg': '40px 40px',
        'graph-multi-lg': '100px 100px, 100px 100px, 20px 20px, 20px 20px',
      },
      animation: {
        'marquee': 'marquee 15s linear infinite',
        'gradient': 'gradient linear infinite',
        'indicator-line': 'indicator-line 0.5s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate(0)' },
          '100%': { transform: 'translate(-50%)' },
        },
        gradient: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'indicator-line': {
          '0%': { height: '4px', transform: 'translateY(0)' },
          '50%': { height: '16px', transform: 'translateY(-4px)' },
          '100%': { height: '4px', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'custom-glow': '0px 2px 20px #7d7d81',
      },
      backdropBlur: {
        '10': '10px',
      },
    },
  },
  plugins: [
    // Add any additional plugins you need
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Custom utility classes
        '.nav-hover-btn': {
          marginLeft: theme('spacing.10'),
          fontFamily: theme('fontFamily.general'),
          fontSize: theme('fontSize.xs'),
          textTransform: 'uppercase',
          color: theme('colors.carbon-mist'),
          cursor: 'pointer',
          position: 'relative',
          '&:after': {
            transformOrigin: '100% 100%',
            backgroundColor: theme('colors.alpine-frost'),
            width: '100%',
            height: '2px',
            transitionProperty: 'transform',
            transitionDuration: theme('transitionDuration.300'),
            content: '""',
            transitionTimingFunction: 'cubic-bezier(.65,.05,.36,1)',
            position: 'absolute',
            bottom: '-.5px',
            left: '0',
            transform: 'scaleX(0)',
          },
          '&:hover:after': {
            transformOrigin: '0 100%',
            transform: 'scaleX(1)',
          },
        },
        '.floating-nav': {
          backgroundColor: theme('colors.silicon'),
          borderRadius: theme('borderRadius.lg'),
          border: '1px solid transparent',
        },
        '.special-font b': {
          fontFeatureSettings: '"ss01" on',
          fontFamily: 'Zentry',
        },
        '.indicator-line': {
          height: '4px',
          width: '2px',
          borderRadius: '9999px',
          backgroundColor: theme('colors.white'),
          transitionProperty: 'all',
          transitionDuration: theme('transitionDuration.200'),
          transitionTimingFunction: theme('transitionTimingFunction.ease-in-out'),
          '&.active': {
            animation: '0.5s infinite indicator-line',
          },
        },
        '.border-animate': {
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            background: 'conic-gradient(#e1e135, orange, red, orange, #ff0 360deg)',
            borderRadius: '50%',
            padding: '4px',
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            bottom: '-2px',
            left: '-2px',
          },
        },
        '.animated-gradient-text': {
          position: 'relative',
          margin: '0 auto',
          display: 'flex',
          maxWidth: 'fit-content',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '1.25rem',
          fontWeight: '500',
          backdropFilter: 'blur(10px)',
          transition: 'box-shadow .5s ease-out',
          overflow: 'hidden',
          cursor: 'pointer',
        },
        '.stack': {
          position: 'sticky',
          top: '0',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}