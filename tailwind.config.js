/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="nova-dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border, 0 0% 80%))",
        input: "hsl(var(--input, 0 0% 80%))",
        ring: "hsl(var(--ring, 24 35% 58%))",
        background: "var(--color-surface)",
        foreground: "var(--color-on-surface)",
        primary: {
          DEFAULT: "var(--color-brand-primary)",
          foreground: "var(--color-brand-light)",
        },
        secondary: {
          DEFAULT: "var(--color-surface-container)",
          foreground: "var(--color-on-surface)",
        },
        accent: {
          DEFAULT: "var(--color-brand-accent)",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--rounded-lg)",
        md: "var(--rounded-md)",
        sm: "var(--rounded-sm)",
      },
    },
  },
  plugins: [],
}
