<template>
  <div
    class="text-4xl w-[90vw] max-w-[350px] min-h-screen p-8 overflow-hidden border-l-2 border-gray-800"
  >
    <div class="fixed top-0 pt-[30px] overflow scroll-smooth scrollbar">
      <div class="relative">
        <input
          class="border rounded-full bg-gray-900 outline-none border-gray-600 text-[15px] px-[20px] w-[250px]"
          type="text"
          placeholder="Search..."
          @input="moviesSearch"
          v-model="search"
        />
        <button class="absolute right-[4.5rem] top-2 text-[20px]">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>

        <div
          id="scrollTo"
          v-show="search.length != 0"
          style=""
          class="absolute mt-[5px] overflow-hiden overflow-y-auto bg-gray-700 h-[350px] w-[250px]"
        >
          <div
            class="top-0 left-0 cursor-pointer display-none hover:opacity-75 flex"
            v-for="listMoviesSearch in listMoviesSearchs"
            :key="listMoviesSearch.id"
            @click="moveDetailMovie(listMoviesSearch.id)"
          >
            <img
              v-if="!busy"
              class="rounded-[8px] m-[5px] min-w-[48px] h-[48px] object-cover hover:opacity-75"
              :src="`https://image.tmdb.org/t/p/original/${listMoviesSearch.poster_path}`"
              alt=""
            />
            <img
              v-if="busy"
              class="rounded-[8px] m-[5px] min-w-[48px] h-[48px] object-cover hover:opacity-75"
              src="../assets/images/image_not_found.jpg"
              alt=""
            />
            <p
              class="text-[15px] w-[100%] border-b pl-[5px] whitespace-nowrap overflow-hidden text-ellipsis leading-[54px]"
            >
              {{
                listMoviesSearch.original_title
                  ? listMoviesSearch.original_title
                  : listMoviesSearch.original_name
              }}
            </p>
          </div>
          <!-- <div class="facebook-card">
            <skeleton-loader-vue
              type="circle"
              :width="200"
              :height="200"
              animation="fade"
            />
          </div> -->
          <!-- <div class="">
            <img src="" alt="anh that" />
          </div> -->
        </div>
      </div>
      <h1 class="text-[20px] my-[20px]">Top Rated</h1>
      <div class="max-h-[580px] overflow-y-auto">
        <div
          class="flex mb-[10px]"
          v-for="topRate in topRates"
          :key="topRate.id"
          @click="moveDetailMovie(topRate.id)"
        >
          <div class="cursor-pointer">
            <img
              class="rounded-[8px] mr-[10px] min-w-[100px] h-[60px] object-cover hover:opacity-75"
              :src="`https://image.tmdb.org/t/p/original/${topRate.poster_path}`"
              alt=""
            />
          </div>
          <div
            class="cursor-pointer hover:opacity-75 overflow-hidden group mb-[10px]"
          >
            <h1
              class="text-[14px] leading-[20px] group-hover:text-primary max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {{ topRate.title }}
            </h1>
            <div class="flex text-[16px] items-center">
              <font-awesome-icon
                class="text-amber-400 mr-[5px]"
                icon="fa-solid fa-star"
              />
              <span>{{ topRate.vote_average }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const key = "?api_key=998585fd1110d356426ebf9cb7c2f24d";
import { debounce } from "debounce";

export default {
  data() {
    return {
      topRates: [],
      listMoviesSearchs: [],
      search: "",
      busy: true,
      filterSearch: "",
      page: 1,
    };
  },
  created() {
    this.fetchSearch(this.search);
    this.topRate();
  },

  mounted() {
    const lazyLoad = document.getElementById("scrollTo");
    if (lazyLoad) {
      lazyLoad.addEventListener(
        "scroll",
        function () {
          let scrollTop = lazyLoad.scrollTop;
          let scrollHeight = lazyLoad.scrollHeight;
          let clientHeight = lazyLoad.clientHeight;
          if (scrollTop + clientHeight >= scrollHeight - 10) {
            this.page += 1;
            this.fetchSearch(this.search);
          }
        }.bind(this)
      );
    }
  },
  methods: {
    async topRate() {
      try {
        const respone = await this.$http.get(`movie/top_rated${key}`);
        this.topRates = respone.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    async fetchSearch(term) {
      this.busy = true;
      try {
        const response = await this.$http.get(
          `search/multi${key}&page=${this.page}&query=${term}`
        );
        console.log("search", response.data.results);
        // const append = response.data.results.slice(
        //   this.listMoviesSearchs.length,
        //   this.listMoviesSearchs.length + this.limit
        // );
        this.listMoviesSearchs = response.data.results;
        this.busy = false;
      } catch (error) {
        console.log(error.message);
      }
    },
    moveDetailMovie(id) {
      this.$router.push(`/film/${id}`);
      this.$router.go();
    },
    moviesSearch: debounce(function (e) {
      this.fetchSearch(e.target.value);
    }, 700),
  },
};
</script>

<style scoped></style>
