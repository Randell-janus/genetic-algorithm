module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      colors: {
        gray: {
          default: "#0925AD",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
