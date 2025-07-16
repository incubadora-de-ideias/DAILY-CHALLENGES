/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xxs: "0.6rem",
        mxxs: "0.7rem",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ipilOrange: "#D96F32",
        medBlue: "#00467B",
        ipilOrangeLight: "#eb5d0b",
        informaticBg: "#155e99",
        pageBackground: "#eeeded",
        ipilGray: "#2c2c30",
        headerIcons: "#ffad4259",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      screens: {
        first: "1020px",
        statistic: "357px",
        break: "630px",
        break2: "430px",
        navigation: "870px",
        navigation2: "775px",
        nav: "652px",
        med: "530px",
        sideBar: "800px",
        xxl: "1800px",
        sxl: "1550px"

      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
