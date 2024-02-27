const { withTV } = require("tailwind-variants/transformer");

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        950: "#040507",
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
        950: "#180202",
      },
      green: {
        50: "#E7FDE9",
        100: "#CFFCD4",
        200: "#9FF9A8",
        300: "#6FF67D",
        400: "#44F356",
        500: "#13F02A",
        600: "#0DC51F",
        700: "#099017",
        800: "#06600F",
        900: "#033008",
        950: "#021804",
      },
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [],
});
