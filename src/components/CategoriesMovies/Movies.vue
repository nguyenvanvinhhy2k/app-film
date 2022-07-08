<template>
  <div class="infinite-scroll-component flex flex-wrap mt-[30px]">
    <div
      class="w-[18.2%] mr-[22px] mb-[22px] overflow-hidden bg-dark-lighten group cursor-pointer rounded"
      v-for="movie in movies"
      :key="movie.id"
      @click="moveDetailMovie(movie.id)"
    >
      <img
        class="w-screen object-cover hover:opacity-75"
        :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
        alt=""
      />
      <h1
        class="group-hover:text-primary transition duration-300 pb-1 px-2 m-0 text-lg max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {{ movie.title }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoviesComponent",
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

<style lang="scss" scoped></style>
