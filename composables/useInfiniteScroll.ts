import { useMovieStore } from "@/stores/movie.store";
import { storeToRefs } from "pinia";

export default function useInfiniteScroll(refresh: Function) {
  const store = useMovieStore();

  onMounted(() => {
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        store.page++;
        refresh();
      }
    };
  });
}
