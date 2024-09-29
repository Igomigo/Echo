/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10634e",
        secondary: "#09382c"
      },
      maxHeight: {
        height: "80vh"
      }
    },
  },
  plugins: [],
}
