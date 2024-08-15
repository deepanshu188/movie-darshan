export const useSaveMovieStore = defineStore("save Movie", () => {
  const savedMoviesList = ref();

  const getSavedMovies = (): string[] => {
    const savedMovies = localStorage.getItem("savedMovies");
    return savedMovies ? savedMovies.split(",") : [];
  };

  const setSaveMovie = (list: string[]) =>
    localStorage.setItem("savedMovies", list.join(","));

  function saveMovie(movieId: number) {
    const movieListToArray = getSavedMovies();
    const movieIdStr = movieId.toString();

    if (movieListToArray.includes(movieIdStr)) {
      const updatedList = movieListToArray.filter((id) => id !== movieIdStr);
      setSaveMovie(updatedList);
    } else {
      const updatedList = [...movieListToArray, movieIdStr];
      setSaveMovie(updatedList);
    }

    savedMoviesList.value = getSavedMovies();
  }

  onMounted(() => {
    savedMoviesList.value = getSavedMovies();
  });

  return { saveMovie, savedMoviesList };
});
