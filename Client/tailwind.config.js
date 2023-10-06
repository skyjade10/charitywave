/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{jsx,tsx,html,js,ts}"
  ],
  theme: {
    extend: {
      spacing:{
        '2/3': '66.666667%'
      },
    },
  },
  plugins: [],
}

