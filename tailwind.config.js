/** @type {import('tailwindcss').Config} */
import {fontFamily} from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        color: {
          blue: '#01A3DD',
          text: '#2A2A2A',
          textLight: '#7C7C7C',
          lightBlue: '#ECF6FC',
          gray: '#F9F9F9',
          background: '#FAFAFA',
          white: '#FFFFFF',
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scroll: {
          '0%': {transform: 'translateX(-50%)'},
          '100%': {transform: 'translateX(0)'},
        },
        advantagesScroll: {
          '0%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(calc(-200%/3))'},
        },
        marquee: {
          '0%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(-33.33%)'},
        },
        marquee2: {
          '0%': {transform: 'translateX(100%)'},
          '100%': {transform: 'translateX(0%)'},
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 1s cubic-bezier(0.67, 0.01, 0.18, 1)',
        'fade-in-up-delay-1':
          'fade-in-up 1s cubic-bezier(0.67, 0.01, 0.18, 1) 0.1s both',
        'fade-in-up-delay-2':
          'fade-in-up 1s cubic-bezier(0.67, 0.01, 0.18, 1) 0.2s both',
        'fade-in-up-delay-3':
          'fade-in-up 1s cubic-bezier(0.67, 0.01, 0.18, 1) 0.3s both',
        'fade-in-up-delay-4':
          'fade-in-up 1s cubic-bezier(0.67, 0.01, 0.18, 1) 0.4s both',
        'fade-in-up-delay-4.5':
          'fade-in-up 1s cubic-bezier(0.67, 0.01, 0.18, 1) 0.45s both',
        'fade-in-up-delay-5':
          'fade-in-up 1s cubic-bezier(0.67, 0.01, 0.18, 1) 0.5s both',
        'fade-in-up-delay-6':
          'fade-in-up 1s cubic-bezier(0.67, 0.01, 0.18, 1) 0.6s both',
        scroll: 'scroll 20s linear infinite',
        advantagesScroll: 'advantagesScroll 10s linear infinite',
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 40s linear infinite',
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(0.67, 0.01, 0.18, 1)',
      },
      backgroundImage: {
        'gradient-universal': 'linear-gradient(to right, #56a47c, #265e3b)',
        'gradient-windows': 'linear-gradient(to right, #5ba49c, #36859e)',
        'gradient-kitchen': 'linear-gradient(to right, #d5959e, #c8634b)',
        'gradient-bathroom': 'linear-gradient(to right, #dea339, #cb592a)',
      },
      fontFamily: {
        sans: ['var(--font-comfortaa)', ...fontFamily.sans],
      },
      spacing: {
        0.25: '0.0625rem',
        7.5: '1.875rem',
        15: '3.75rem',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
    },
  },
  plugins: [
    plugin(function ({addBase, addComponents}) {
      addBase({});
      addComponents({
        '.container': {
          '@apply max-w-[1400px] mx-auto px-4 md:px-16 lg:px-20': {},
        },
        '.h1': {
          '@apply font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]':
            {},
        },
        '.h2': {
          '@apply text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight':
            {},
        },
        '.h3': {
          '@apply text-[2rem] leading-normal md:text-[2.5rem]': {},
        },
        '.h4': {
          '@apply text-[2rem] leading-normal': {},
        },
        '.h5': {
          '@apply text-2xl leading-normal': {},
        },
        '.h6': {
          '@apply font-semibold text-lg leading-8': {},
        },
        '.body-1': {
          '@apply text-[0.875rem] leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8':
            {},
        },
        '.body-2': {
          '@apply font-light text-[0.875rem] leading-6 md:text-base': {},
        },
        '.caption': {
          '@apply text-sm': {},
        },
        '.tagline': {
          '@apply font-sans font-light text-xs tracking-tagline uppercase': {},
        },
        '.quote': {
          '@apply font-sans text-lg leading-normal': {},
        },
        '.button': {
          '@apply font-sans text-xs font-bold uppercase tracking-wider': {},
        },
      });
    }),
  ],
};
