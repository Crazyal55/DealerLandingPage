import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        panel: '#101010',
        line: '#262626',
        text: '#f3f3f3',
        muted: '#b2b2b2',
        accent: '#d5ff53'
      }
    }
  },
  plugins: []
};

export default config;
