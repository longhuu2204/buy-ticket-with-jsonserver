/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F62682",
        secondary: "#FFFF00",
      },
    },
  },
  plugins: [],
};
