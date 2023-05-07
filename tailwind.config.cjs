/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "node_modules/preline/dist/*.js"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
