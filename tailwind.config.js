/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('@/img/background.jpeg')",
        "login-pattern": "url('@/img/LoginCover01.jpeg')",
        "note-pattern": "url('@/img/123.jpeg')",
      },
    },
  },
  plugins: [],
};
