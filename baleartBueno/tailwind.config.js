/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ["'Playwrite IN'", "sans-serif"], // Agrega la fuente aquí
      },
    },
  },
  plugins: [],
}