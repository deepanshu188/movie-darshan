// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: "https://api.themoviedb.org/3",
      apiKey:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWIxMjBlY2FhODI0NWExYzgxZDU1MzM0NTQ0ZmE1YyIsIm5iZiI6MTcyMzQ4MDAwMy4yNDg2MjgsInN1YiI6IjY2YmEzNjQwMWYwYjQxNTU1NWJkYzYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fvxAK3b7UXcfHbvsELTOCIWD_Beb5EDT5xyWDFX4Phg",
    },
  },
  ssr: false,
  nitro: {
    ignore: ["/*"],
  },

  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@pinia/nuxt", "@nuxt/image"],
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-08-14",
});
