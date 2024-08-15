<template>
    <div
        class="md:w-[200px] bg-[#1a1a1a] rounded-b-md min-h-[390px] relative"
        role="article"
        aria-labelledby="movie-title"
        aria-describedby="movie-details"
        @mouseover="fadedImage = true"
        @mouseleave="fadedImage = false"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            :fill="
                store.savedMoviesList.includes(item.id.toString())
                    ? 'red'
                    : 'white'
            "
            viewBox="0 0 24 24"
            class="size-6 absolute z-10 cursor-pointer right-1 top-1"
            v-if="fadedImage"
            @click="store.saveMovie(item.id)"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
        </svg>
        <NuxtImg
            class="object-cover w-full"
            :class="{ 'opacity-40': fadedImage }"
            height="250"
            :lazy="true"
            :src="
                item.poster_path
                    ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`
                    : '/no_image.jpg'
            "
            :alt="item.original_title"
        />
        <div class="p4">
            <div class="flex items-center gap-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="yellow"
                    viewBox="0 0 24 24"
                    class="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                </svg>
                <p class="text-white">
                    {{ item.vote_average?.toFixed(1) }}
                </p>
            </div>
            <p class="text-white font-semibold my1 text">
                {{ displayTitle }}
            </p>
            <p class="text-white">{{ item.release_date }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSaveMovieStore } from "@/stores/saveMovie.store";
const store = useSaveMovieStore();

const fadedImage = ref(false);

type Item = {
    id: number;
    title: string;
    poster_path: string;
    original_title: string;
    vote_average: number;
    release_date: string;
};

type Props = {
    item: Item;
};

const props = defineProps<Props>();

const displayTitle = computed(() =>
    props.item.title.length > 30
        ? `${props.item.title.slice(0, 30)}...`
        : props.item.title,
);
</script>
