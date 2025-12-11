module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        neon: "0 0 10px rgba(147,51,234,1), 0 0 20px rgba(147,51,234,0.6)",
      },
      colors: {
        neon: "#9333ea",
        surface: "#0f1724",
      },
    },
  },
  plugins: [],
};
