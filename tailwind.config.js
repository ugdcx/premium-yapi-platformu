module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5EFE6",
        surface: "#FFFFFF",
        stoneDark: "#1C1B19",
        dark: "#1C1B19",
        muted: "#6B665E",
        gold: "#C6A85B",
        border: "rgb(0 0 0 / 0.08)"
      },
      boxShadow: {
        premium: "0 18px 48px rgb(28 27 25 / 0.08)"
      }
    }
  },
  plugins: [],
};
