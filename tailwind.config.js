module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F4F1EC",
        surface: "#FFFFFF",
        stoneDark: "#111111",
        dark: "#111111",
        muted: "#6B665E",
        gold: "#C6A85B",
        soft: "#E9E3D8",
        border: "rgb(0 0 0 / 0.08)"
      },
      boxShadow: {
        premium: "0 18px 48px rgb(28 27 25 / 0.08)"
      }
    }
  },
  plugins: [],
};
