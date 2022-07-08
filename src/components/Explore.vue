<template>
  <div class="px-[120px] pt-[30px]">
    <!-- <div class="">
      <router-link to="/">
        <div class="">
          <img
            class="w-9 h-9 mr-[8px] mt-[-2px]"
            src="../assets/images/icon.png"
            alt=""
          />
          <p class="text-xl mb-[40px] items-center">FilmHot</p>
        </div>
      </router-link>
    </div> -->
    <div class="flex text-[30px]">
      <router-link to="/">
        <div class="mr-[20px] text-sky-400 cursor-pointer">Home</div>
      </router-link>
      <div class="mr-[20px] cursor-pointer">TV Series</div>
      <div class="mr-[20px] cursor-pointer">Movie</div>
    </div>
    <div class="flex justify-between items-center">
      <div class="flex">
        <div
          @click="isShow = 1"
          class="bg-gray-700 px-[10px] py-[5px] mr-[10px] mt-[20px] outline-none rounded cursor-pointer hover:opacity-75"
        >
          Up Comings
        </div>
        <div
          @click="isShow = 2"
          class="bg-gray-700 px-[10px] py-[5px] mr-[10px] mt-[20px] outline-none rounded cursor-pointer hover:opacity-75"
        >
          Popular
        </div>
        <div
          @click="isShow = 3"
          class="bg-gray-700 px-[10px] py-[5px] mr-[10px] mt-[20px] outline-none rounded cursor-pointer hover:opacity-75"
        >
          Top Rated
        </div>
        <div
          @click="isShow = 4"
          class="bg-gray-700 px-[10px] py-[5px] mr-[10px] mt-[20px] outline-none rounded cursor-pointer hover:opacity-75"
        >
          Now Playing
        </div>
      </div>
      <!-- Search -->
      <div class="relative mt-[30px] text-[25px] mr-[50px] mb-[10px]">
        <input
          class="border rounded-full bg-gray-900 outline-none border-gray-600 text-[15px] px-[20px] w-[250px] h-[40px]"
          type="text"
          placeholder="Search..."
          v-model="search"
        />
        <button class="absolute right-4 top-[0.45rem] text-[20px]">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
        <div
          v-if="false"
          style=""
          class="absolute mt-[5px] overflow-hiden overflow-y-auto bg-gray-700 h-[210px] w-[250px]"
        >
          <div
            class="top-0 left-0 cursor-pointer display-none hover:opacity-75"
          >
            <p class="text-[15px] border-b border-gray-500 pl-[10px] ;">
              S Diary
            </p>
          </div>
        </div>
      </div>
    </div>
    <Movies
      :movies="searchUpComings"
      v-if="isShow === 1"
      @moveDetailMovie="moveDetailMovie"
    />
    <Movies
      :movies="populars"
      v-if="isShow === 2"
      @moveDetailMovie="moveDetailMovie"
    />
    <Movies
      :movies="searchTopRated"
      v-if="isShow === 3"
      @moveDetailMovie="moveDetailMovie"
    />
    <Movies
      :movies="nowPlaying"
      v-if="isShow === 4"
      @moveDetailMovie="moveDetailMovie"
    />
    <div
      class="text-sky-700 text-center flex justify-center py-[30px]"
      style=""
    >
      <pagination
        class="pb-[20px]"
        :records="total"
        v-model="pageIndex"
        :per-page="pageSize"
        @paginate="getPage"
      >
      </pagination>
    </div>
  </div>
</template>

<script>
// import { debounce } from "debounce";
import Movies from "./CategoriesMovies/Movies.vue";
import Pagination from "vue-pagination-2";
const key = "?api_key=998585fd1110d356426ebf9cb7c2f24d";

export default {
  name: "ExploreComponent",
  components: { Movies, Pagination },
  data() {
    return {
      search: "",
      isShow: 1,
      populars: [],
      upComings: [],
      topRaties: [],
      nowPlaying: [],
      pageIndex: 1,
      pageSize: 20,
      total: 0,
    };
  },
  async mounted() {
    await this.loadListUpComing();
    await this.loadListPopular();
    await this.loadListTopRated();
    await this.loadListNowPlay();
  },
  computed: {
    searchUpComings() {
      if (this.search) {
        return this.upComings.filter((movie) =>
          movie.title.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.upComings;
      }
    },
    searchTopRated() {
      if (this.search) {
        return this.topRaties.filter((movie) =>
          movie.title.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.topRaties;
      }
    },
  },
  methods: {
    async loadListUpComing() {
      try {
        const respone = await this.$http.get(
          `/movie/upcoming${key}&language=en-US&page=${this.pageIndex}`
        );
        this.upComings = respone.data.results;
        this.total = respone.data.total_results;
      } catch (error) {
        console.log(error.message);
      }
    },
    async loadListPopular() {
      try {
        const respone = await this.$http.get(
          `/movie/popular${key}&language=en-US&page=${this.pageIndex}`
        );
        this.populars = respone.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    async loadListTopRated() {
      try {
        const respone = await this.$http.get(
          `/movie/top_rated${key}&language=en-US&page=${this.pageIndex}`
        );
        this.topRaties = respone.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    async loadListNowPlay() {
      try {
        const respone = await this.$http.get(
          `/movie/now_playing${key}&language=en-US&page=${this.pageIndex}`
        );
        this.nowPlaying = respone.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    moveDetailMovie(id) {
      this.$router.push(`/film/${id}`);
    },
    // handleInput: debounce(function (e) {
    //   this.search = e.target.value;
    // }, 500),
    // handleInput(e) {
    //   this.search = e.target.value;
    // },
    getPage() {
      if (this.isShow === 1) {
        this.loadListUpComing();
      }
      if (this.isShow === 2) {
        this.loadListPopular();
      }
      if (this.isShow === 3) {
        this.loadListTopRated();
      }
      if (this.isShow === 4) {
        this.loadListNowPlay();
      }
    },
  },
};
</script>

<style scoped></style>
