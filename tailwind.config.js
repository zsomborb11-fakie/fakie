/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0b",
        accent: "#d62828",
        muted: "#9a9a9a"
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
}
