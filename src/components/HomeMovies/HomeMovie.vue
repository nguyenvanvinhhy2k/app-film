<template>
  <Carousel
    :perPageCustom="[
      [768, 3],
      [1024, 4],
    ]"
  >
    <Slide v-for="movie in movies" :key="movie.id" class="min-w-[22%]">
      <div class="flex mt-[10px] justify-center relative">
        <div class="flex overflow-x-auto">
          <div
            class="mx-[8px] min-w-[22%] rounded-lg bg-dark-lighten group cursor-pointer"
            @click="moveDetailMovie(movie.id)"
          >
            <div class="w-[100%]">
              <img
                :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
                alt=""
                class="object-cover hover:opacity-75 w-[100%] rounded-lg"
              />
              <h1
                class="group-hover:text-primary transition duration-300 pb-1 px-2 m-0 text-lg max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {{ movie.title }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  </Carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "HomeMovies",
  components: { Carousel, Slide },
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  methods: {
    moveDetailMovie(id) {
      this.$emit("moveDetailMovie", id);
      console.log(id);
    },
  },
};
</script>

<style scoped></style>
