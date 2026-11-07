import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50: "#F5F1FF", 100: "#EDE7FF", 200: "#DCD0FF", 300: "#C4AEFF", 400: "#A783FF", 500: "#8B5CF6", 600: "#7540E8", 700: "#642BD0", 800: "#5123A8", 900: "#3D1B7A" }
      },
      boxShadow: { soft: "0 12px 35px rgba(54, 30, 93, .07)" }
    }
  },
  plugins: []
};
export default config;
