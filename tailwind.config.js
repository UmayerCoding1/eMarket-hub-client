/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {Poppins: "'Poppins', sans-serif",
          Rubik: "'Rubik Wet Paint', system-ui"
      },
      boxShadow: {custom: "0 0 15px rgba(0, 0, 0, 0.5)"}
    },
  },
  plugins: [],
}

