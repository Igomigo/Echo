/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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

