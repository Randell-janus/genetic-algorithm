module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
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
