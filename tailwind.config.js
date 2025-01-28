/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "Chakra": ["Chakra Petch", "sans-serif"]
      },
      colors: {
        body: "#4E4E4E",
        primary: "#7A7A7A",
        secondary: "#5c6068",
        accent: "#4178F0",
        black: "#2E2E2E",
        white: "#EEEEEE"
      }
    },
    fontSize: {
      xxs: '0.3rem',
      xs: '0.5rem',
      sm: '0.8rem',
      base: '1rem',
      l: '1.3rem',
      xl: '1.5rem',
      xxl: '2rem',
    }
  },
  plugins: [],
}

