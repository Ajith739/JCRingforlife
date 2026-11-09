/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        canvas: {
          DEFAULT: "hsl(var(--canvas))",
          alt: "hsl(var(--canvas-alt))",
        },
        ink: {
          DEFAULT: "hsl(var(--ink))",
          soft: "hsl(var(--ink-soft))",
          muted: "hsl(var(--ink-muted))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        aion: {
          midnight: "var(--finish-midnight, #1A1F2C)",
          silver: "var(--finish-silver, #DCDDE1)",
          rose: "var(--finish-rose, #E6B8A2)",
          teal: "hsl(var(--aion-teal))",
          cyan: "hsl(var(--aion-cyan))",
          violet: "hsl(var(--aion-violet))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 60px -30px rgba(10, 22, 40, 0.28)",
        glow: "0 24px 60px -24px rgba(24, 120, 224, 0.35)",
        card: "0 1px 2px rgba(10, 22, 40, 0.04), 0 12px 32px -18px rgba(10, 22, 40, 0.18)",
      },
    },
  },
  plugins: [],
}

