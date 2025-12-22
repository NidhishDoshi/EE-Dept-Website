export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom color scheme - Purple and Orange
        primary: {
          50: "#f5e6ff",
          100: "#e6ccf7",
          200: "#cc99ef",
          300: "#b366e7",
          400: "#9933df",
          500: "#550886", // Main purple
          600: "#4a0775",
          700: "#3f0664",
          800: "#340553",
          900: "#290442",
        },
        secondary: {
          50: "#fff2e6",
          100: "#ffe0c2",
          200: "#ffc299",
          300: "#ffa366",
          400: "#ff8533",
          500: "#ff630e", // Orange accent
          600: "#e6590d",
          700: "#cc4f0b",
          800: "#b3450a",
          900: "#993b08",
        },
        accent: {
          light: "#7c3aab",
          DEFAULT: "#550886",
          dark: "#3d0661",
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
    },
  },
};
