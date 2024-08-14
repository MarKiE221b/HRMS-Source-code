const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Radio Canada Big"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        logoPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1.5s ease-in-out",
        logoPulse: "logoPulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [flowbite.plugin(), require("tw-elements-react/dist/plugin.cjs")],
};
