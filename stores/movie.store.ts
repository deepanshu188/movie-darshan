export const useMovieStore = defineStore("movie", () => {
  const data = ref([]);
  const page = ref(1);
  const q = ref("");
  const genre = ref("");

  return { data, page, q, genre };
});
