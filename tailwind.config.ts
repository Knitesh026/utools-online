import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1340px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        blue: {
          DEFAULT: "hsl(var(--blue))",
          foreground: "#ffffff",
        },
        pink: {
          DEFAULT: "hsl(var(--pink))",
          foreground: "hsl(var(--foreground))",
        },
        yellow: "hsl(var(--yellow))",
        lime: "hsl(var(--lime))",
        sky: "hsl(var(--sky))",
        peach: "hsl(var(--peach))",
        lilac: "hsl(var(--lilac))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        icon: {
          primary: "hsl(var(--icon-primary))",
          secondary: "hsl(var(--icon-secondary))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        hard: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.06)",
        "hard-sm": "0 1px 2px rgba(15, 23, 42, 0.04), 0 2px 6px rgba(15, 23, 42, 0.04)",
        "hard-lg": "0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 20px 36px -8px rgba(15, 23, 42, 0.1)",
        "hard-xl": "0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 32px 64px -12px rgba(15, 23, 42, 0.14)",
        studio: "0 0 0 1px rgba(15, 23, 42, 0.06), 0 2px 4px rgba(15, 23, 42, 0.03), 0 12px 24px -4px rgba(15, 23, 42, 0.06)",
        "studio-hover": "0 0 0 1px rgba(225, 29, 72, 0.2), 0 8px 20px -4px rgba(15, 23, 42, 0.08), 0 24px 48px -12px rgba(225, 29, 72, 0.12)",
        "studio-lg": "0 0 0 1px rgba(15, 23, 42, 0.07), 0 8px 16px -4px rgba(15, 23, 42, 0.05), 0 24px 48px -8px rgba(15, 23, 42, 0.09)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        button: "var(--shadow-button)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.23, 1, 0.32, 1)",
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.65", transform: "scale(0.95)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.22s cubic-bezier(0.23, 1, 0.32, 1)",
        "accordion-up": "accordion-up 0.18s cubic-bezier(0.23, 1, 0.32, 1)",
        "fade-in": "fade-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.25s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2.5s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
