/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        custom: "3px 3px 10px 0px #6e6e6e", // カスタムシャドウを追加
      },
    },
  },
  variants: {},
  plugins: [],
};
