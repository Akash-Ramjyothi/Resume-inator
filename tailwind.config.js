const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // Content paths for purging unused styles
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./src/**/*.{md,mdx}", // Added markdown support
  ],
  
  // Dark mode with class strategy for better control
  darkMode: "class", // Changed from false to 'class' for dark mode support
  
  theme: {
    extend: {
      // Typography
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
        heading: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      
      // Font sizes with line heights
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }], // 10px
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em" }],
      },
      
      // Color system with expanded palette
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: "#5271ff",
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#5271ff",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        
        // Semantic colors
        blue: {
          DEFAULT: "#5271ff",
          50: "#f0f4ff",
          100: "#e0e8ff",
          200: "#c0d0ff",
          300: "#a0b8ff",
          400: "#8090ff",
          500: "#5271ff",
          600: "#3a55e5",
          700: "#2a40c4",
          800: "#1a2ca3",
          900: "#0a1882",
        },
        red: {
          DEFAULT: "#FF0000",
          50: "#fff0f0",
          100: "#ffe0e0",
          200: "#ffc0c0",
          300: "#ffa0a0",
          400: "#ff8080",
          500: "#ff0000",
          600: "#e00000",
          700: "#c00000",
          800: "#a00000",
          900: "#800000",
        },
        green: {
          DEFAULT: "#007500",
          50: "#e6f3e6",
          100: "#cce6cc",
          200: "#99cc99",
          300: "#66b366",
          400: "#339933",
          500: "#007500",
          600: "#006000",
          700: "#004d00",
          800: "#003a00",
          900: "#002600",
        },
        gray: {
          light: "#F3F4F6",
          dark: "#1F2937",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        
        // Status colors
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
      },
      
      // Spacing scale additions
      spacing: {
        "18": "4.5rem",   // 72px
        "88": "22rem",    // 352px
        "128": "32rem",   // 512px
        "144": "36rem",   // 576px
      },
      
      // Border radius
      borderRadius: {
        "xl": "1rem",     // 16px
        "2xl": "1.5rem",  // 24px
        "3xl": "2rem",    // 32px
      },
      
      // Box shadows
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "glow": "0 0 15px rgba(82, 113, 255, 0.5)",
        "inner-lg": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      },
      
      // Animation utilities
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "fade-out": "fadeOut 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-up": "scaleUp 0.2s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      
      // Backdrop blur
      backdropBlur: {
        xs: "2px",
      },
      
      // Transition properties
      transitionProperty: {
        "height": "height",
        "spacing": "margin, padding",
      },
      
      // Z-index scale
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      
      // Custom screens
      screens: {
        "xs": "475px",
        "print": { raw: "print" },
        "hover-hover": { raw: "(hover: hover)" },
        "dark": { raw: "(prefers-color-scheme: dark)" },
      },
      
      // Container configuration
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  
  // Variants with modern syntax (Tailwind CSS v3+)
  variants: {
    extend: {
      backgroundColor: ["active", "disabled", "even", "odd"],
      textColor: ["disabled"],
      cursor: ["disabled"],
      opacity: ["disabled"],
      transform: ["hover", "focus", "active", "group-hover"],
      transitionProperty: ["hover", "focus"],
      animation: ["hover", "focus", "group-hover"],
      outline: ["active", "focus-visible"],
      ringWidth: ["hover", "active", "focus-visible"],
      ringColor: ["hover", "active", "focus-visible"],
      scale: ["active", "group-hover"],
    },
  },
  
  // Plugins
  plugins: [
    require("@tailwindcss/forms"),      // Better form styling
    require("@tailwindcss/typography"), // Prose styles for content
    require("@tailwindcss/aspect-ratio"), // Aspect ratio utilities
    require("@tailwindcss/line-clamp"), // Line clamp utilities
  ],
  
  // Core plugins configuration
  corePlugins: {
    // Enable/disable specific core plugins if needed
    // preflight: true, // CSS reset
    // container: true,
  },
  
  // Prefix for utilities (if needed to avoid conflicts)
  // prefix: "tw-",
  
  // Important selector strategy
  // important: "#app",
};
