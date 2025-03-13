/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  safelist: [
    'px-5',
    'px-6',
    'px-7',
    'px-8',
    'px-9',
    'px-10',
    /^px-\d+$/,
  ],
  theme: {
    extend: {
      fontFamily: {
        "Chakra": ["Chakra Petch", "sans-serif"],
        "Bebas": ["Bebas Neue", "serif"]
      },
      colors: {
        body: "#4E4E4E",
        primary: "#7A7A7A",
        secondary: "#5c6068",
        accent: "#4178F0",
        success: "#2F8D2F",
        warning: "#D4B037",
        danger: "#A53C3C",
        danger2: "#D60000",
        black: "#333333",
        white: "#EEEEEE"
      }
    },
    fontSize: {
      xxs: '0.3rem',
      xs: '0.7rem',
      sm: '0.8rem',
      base: '1rem',
      l: '1.3rem',
      xl: '1.5rem',
      xxl: '2rem',
    },
    padding: {
      '1': '0.25rem',  // Default px-1
      '2': '0.5rem',   // Default px-2
      '3': '0.75rem',  // Default px-3
      '4': '1rem',     // Default px-4
      '5': '1.25rem',  // Custom px-5
      '6': '1.5rem',   // Custom px-6
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
    }
  },
  plugins: [],
}

