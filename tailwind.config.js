// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4B5EAA', // Soft blue
        secondary: '#D6E6FF', // Light blue
        background: '#F1F5F9', // Light gray
        text: '#1F2937', // Dark gray
      },
    },
  },
  plugins: [],
};
