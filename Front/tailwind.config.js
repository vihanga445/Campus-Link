/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#011f4b",
        "mid-blue": "#03396c",
        "light-blue": "#005b96",
        "very-light-blue": "#b3cde0",
      },
    },
  },
  darkMode: "class",
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
