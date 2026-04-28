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
        premium: "0 16px 42px rgb(28 27 25 / 0.07)",
        card: "0 10px 28px rgb(28 27 25 / 0.055)"
      }
    }
  },
  plugins: [],
};
