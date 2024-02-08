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
      blue: {
        50: "#E4ECF1",
        100: "#CAD9E3",
        200: "#91B0C4",
        300: "#5C8AA8",
        400: "#3C5C71",
        500: "#1F2F3A",
        600: "#19262F",
        700: "#141E25",
        800: "#0C1317",
        900: "#070B0D",
        950: "#040507"
      },
      red: {
        50: "#FDE7E7",
        100: "#FCD0CF",
        200: "#F9A19F",
        300: "#F6716F",
        400: "#F34744",
        500: "#F01513",
        600: "#C5100D",
        700: "#900B09",
        800: "#600806",
        900: "#300403",
        950: "#180202"
      },
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
            success: {
              DEFAULT: "#f6f6f6",
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
