import type { Config } from 'tailwindcss';

// Plugins:
import { fontFamily } from 'tailwindcss/defaultTheme';
import twTypography from '@tailwindcss/typography';
import twAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark'],
  plugins: [twTypography, twAnimate],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      typography: {
        default: {
          css: {
            code: {
              '&::before': {
                display: 'none'
              },
              '&::after': {
                display: 'none'
              }
            }
          }
        },
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' }
          }
        }
      },
      fontFamily: {
        sans: ['InterVariable', ...fontFamily.sans],
        mono: ['GeistMono', ...fontFamily.mono],
        gambarino: ['Gambarino', ...fontFamily.sans]
      }
    }
  }
};

export default config;
