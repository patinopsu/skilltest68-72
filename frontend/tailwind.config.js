module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "corporate"],
    darkTheme: "dark",
  },
}
