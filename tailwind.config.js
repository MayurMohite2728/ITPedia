/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
		borderColor: {
    border: 'hsl(var(--border))',
  },
        background: 'hsl(var(--background, 0 0% 100%))',
        foreground: 'hsl(var(--foreground, 0 0% 0%))',
        primary: { DEFAULT: 'hsl(var(--primary, 220 90% 56%))' },
        secondary: { DEFAULT: 'hsl(var(--secondary, 340 82% 52%))' },
        muted: { DEFAULT: 'hsl(var(--muted, 210 16% 93%))' },
      },
    },
  },
  plugins: [],
};
