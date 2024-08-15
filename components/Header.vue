<template>
    <div class="bg-[#121212] p4 flex items-center gap-4">
        <p class="text-white font-bold text-3xl">MD</p>
        <input
            class="p3 rounded-md outline-green border-none w-full text-sm"
            placeholder="Search Movie"
            v-model="q"
            @input="resetPage"
        />
        <select
            class="p3 rounded-md outline-green text-sm"
            v-model="genre"
            @change="resetPage"
        >
            <option value="">All</option>
            <option
                v-for="item in data?.genres"
                :key="item.id"
                :value="item.id"
            >
                {{ item.name }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { useMovieStore } from "@/stores/movie.store";
import { storeToRefs } from "pinia";

const emit = defineEmits(["refetch"]);

const store = useMovieStore();
const { q, genre, page } = storeToRefs(store);

const { apiKey, baseURL } = useRuntimeConfig()?.public;

const { data } = useFetch("/genre/movie/list", {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
    },
    baseURL,
    query: {
        language: "en",
    },
});

function resetPage() {
    store.data = [];
    page.value = 1;
    emit("refetch");
}
</script>
