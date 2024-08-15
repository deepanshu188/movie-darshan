<template>
    <div>
        <Header @refetch="refresh" aria-label="Main navigation" />
        <section
            class="p4 bg-black min-h-[93vh] flex justify-center"
            aria-live="polite"
        >
            <div
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 md:gap-6 2xl:gap-10"
                aria-label="Movies list"
            >
                <MovieCard v-for="item in data" :key="item.id" :item="item" />
                <div
                    v-if="status === 'pending'"
                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    aria-live="polite"
                >
                    <Spinner />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useMovieStore } from "@/stores/movie.store";
import { storeToRefs } from "pinia";

const store = useMovieStore();
const { data, page, q, genre } = storeToRefs(store);

const { apiKey, baseURL } = useRuntimeConfig()?.public;

const { refresh, error, status } = useAsyncData("movies", () =>
    $fetch(`${q.value ? "/search/movie" : "discover/movie"}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        baseURL,
        query: {
            ...(q.value && { query: q.value }),
            ...(genre.value && { with_genres: genre.value }),
            language: "en-US",
            page: page.value,
        },
        onResponse({ response }) {
            if (!data.value.length) {
                data.value = response._data.results;
            } else {
                data.value.push(...response._data.results);
            }
        },
    }),
);

useInfiniteScroll(refresh);

useHead({
    title: "Movie Darshan",
    meta: [
        {
            name: "description",
            content: "All New Movie Updates At Once Place.",
        },
    ],
});

// poxoce5601@alientex.com
</script>
