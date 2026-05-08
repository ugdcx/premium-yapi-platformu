module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F7F5",
        surface: "#FFFFFF",
        stoneDark: "#0A0A0A",
        dark: "#0A0A0A",
        muted: "#6B7280",
        gold: "#E5E7EB",
        graphite: "#2F2F2F",
        metal: "#D1D5DB",
        soft: "#F1F2F3",
        border: "rgb(10 10 10 / 0.10)"
      },
      boxShadow: {
        premium: "0 18px 50px rgb(10 10 10 / 0.08)",
        card: "0 12px 34px rgb(10 10 10 / 0.06)"
      }
    }
  },
  plugins: [],
};
