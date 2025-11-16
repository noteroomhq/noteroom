import { bg } from "zod/locales";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primaryBlueLm: "#42ACDE",     
        primaryBlueDarkLm: "#0F92CF",
        primaryBlueLightLm: "#A0D5EE",
        // Dark mode colors
        primaryBlueDm: "#04DBF7",     
        primaryBlueDarkDm: "#25A4B4",
        primaryBlueLightDm: "#0F7D8D",
        // Light mode colors
        bgPrimaryLm: "#FFFFFF",   
        bgSecondaryLm: "#f4f4f2",
        bgAccentLm: "#f9fafb",
        textPrimaryLm: "#111827",  
        textSecondaryLm: "#4b5563", 
        textaccentLm: "#9ca3af",
        // Dark mode colors
        bgPrimaryDm: "#101010",   
        bgSecondaryDm: "#1b1f23",
        bgAccentDm: "#1b1f23",
        textPrimaryDm: "#f9fafb",  
        textSecondaryDm: "#6b7280", 
        textaccentDm: "#6b7280",
        
      },

      extend: {
        fontFamily: {
          sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"], 
          inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
          heading: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
          bengali: ["Hind Siliguri", "Inter", "system-ui", "sans-serif"],
          spaceGrotesk: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        },
      },


      fontSize: {
        // desktop heading sizes
        h1: ["72px", { lineHeight: "64px", fontWeight: "700" }],
        h2: ["56px", { lineHeight: "48px", fontWeight: "600" }],
        h3: ["40px", { lineHeight: "40px", fontWeight: "600" }],
        h4: ["28px", { lineHeight: "1.5rem", fontWeight: "600" }],
        h5: ["24px", { lineHeight: "1.2rem", fontWeight: "600" }],

        // mobile heading sizes
        h1mbl: ["48px", { lineHeight: "40px", fontWeight: "700" }],
        h2mbl: ["36px", { lineHeight: "32px", fontWeight: "600" }],
        h3mbl: ["28px", { lineHeight: "1.5rem", fontWeight: "600" }],
        h4mbl: ["20px", { lineHeight: "1.2rem", fontWeight: "600" }],
        h5mbl: ["18px", { lineHeight: "1.2rem", fontWeight: "600" }],

        // Large body text
        bodyLarge: ["18px", { lineHeight: "28px", fontWeight: "400" }],
        // Desktop font sizes
        bodydesk: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        smalldesk: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        // Mobile font sizes
        bodymbl: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        smallmbl: ["14px", { lineHeight: "20px", fontWeight: "400" }]
      },

      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px"
      },

      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px"
      },

      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.05)",
        modal: "0 8px 24px rgba(0, 0, 0, 0.1)"
      }
    }
  },
  plugins: []
};
