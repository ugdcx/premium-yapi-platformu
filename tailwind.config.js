module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cloud: "#F7F7F5",
        surface: "#FFFFFF",
        stoneDark: "#050505",
        dark: "#050505",
        muted: "#6A6A6A",
        line: "#E5E5E5",
        graphite: "#1C1C1E",
        metal: "#D1D1D6",
        soft: "#F3F3F1",
        border: "rgb(17 17 17 / 0.12)"
      },
      boxShadow: {
        premium: "0 18px 50px rgb(10 10 10 / 0.05)",
        card: "0 10px 30px rgb(10 10 10 / 0.04)"
      }
    }
  },
  plugins: [],
};
