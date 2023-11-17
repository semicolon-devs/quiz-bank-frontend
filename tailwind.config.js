import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      light: "#f6f6f6",
      dark: "#202020",
      blue: "#1F2F3A",
      red: "#F01513",
      green: "#13F02A",
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            primary: {
              DEFAULT: "#1F2F3A",
              foreground: "#ffffff",
            },
            danger: {
              DEFAULT: "#F01513",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#202020",
              foreground: "#ffffff",
            },
            focus: "#1F2F3A",
          },
        },
        dark: {
          // ...
          colors: {},
        },
        // ... custom themes
      },
    }),
  ],
};
