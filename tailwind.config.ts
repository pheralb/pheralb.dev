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
      fontFamily: {
        sans: ['InterVariable', ...fontFamily.sans],
        mono: ['GeistMono', ...fontFamily.mono]
      },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' }
          }
        }
      }
    }
  }
};

export default config;
