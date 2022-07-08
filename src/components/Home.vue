<template>
  <div class="flex">
    <NavBar />
    <div class="grow px-8 mt-[30px] overflow-hidden overflow-y-auto w-full">
      <!-- SLIDE -->
      <div
        class="h-0 pb-[42%] relative carousel-inner overflow-hidden w-full slide rounded-[8px]"
      >
        <div
          v-for="(upComing, i) in upComings"
          :key="i"
          :class="`${active === i ? 'active' : 'left-full'}`"
          class="absolute top-0 left-0 w-full h-full hover:opacity-75 object-cover cursor-pointer block overflow-auto rounded-[8px]"
          @click="moveDetailMovie(upComing.id)"
        >
          <img
            class="w-screen h-screen object-cover rounded-[8px]"
            :src="`https://image.tmdb.org/t/p/original/${upComing.poster_path}`"
            alt=""
          />
          <h1
            class="scale-100 absolute left-[7%] bottom-[10%] text-xl md:text-3xl max-w-[86%] whitespace-nowrap text-ellipsis"
          >
            {{ upComing.title }}
          </h1>
        </div>

        <div
          class="text-[40px] absolute top-[37%] ml-[20px] cursor-pointer"
          @click="active--"
        >
          <font-awesome-icon icon="fa-solid fa-chevron-left" />
        </div>
        <div
          class="text-[40px] absolute top-[37%] right-[0] mr-[20px] cursor-pointer"
          @click="active++"
        >
          <font-awesome-icon icon=" fa-solid fa-chevron-right" />
        </div>
      </div>
      <h1 class="text-[25px] mt-[30px]">Movies Hot</h1>
      <!-- FILM HOT-->
      <HomeMovie :movies="populars" @moveDetailMovie="moveDetailMovie" />
      <h1 class="text-[25px] mt-[30px]">Movies Now Playing</h1>
      <!-- FILM NOW_PLAY-->
      <HomeMovie :movies="upComings" @moveDetailMovie="moveDetailMovie" />
      <!-- FILM NOW_PLAY-->
      <h1 class="text-[25px] mt-[30px]">Movies UpComing</h1>
      <HomeMovie
        :movies="nowPlayings"
        @moveDetailMovie="moveDetailMovie"
        class="mb-[40px]"
      />
    </div>
    <SideBar :movies="topRaties" />
  </div>
</template>

<script>
import NavBar from "../share/NavBar.vue";
import SideBar from "../share/SideBar.vue";
import HomeMovie from "./HomeMovies/HomeMovie.vue";

const key = "?api_key=998585fd1110d356426ebf9cb7c2f24d";

export default {
  name: "HomeComponent",
  components: {
    HomeMovie,
    NavBar,
    SideBar,
  },
  data() {
    return {
      populars: [],
      upComings: [],
      nowPlayings: [],
      topRaties: [],
      active: 0,
    };
  },
  async mounted() {
    await this.Upcoming();
    await this.NowPlaying();
    await this.TopRated();
    await this.Popular();
    let i = 0;
    setInterval(() => {
      if (i > this.upComings.length - 1) {
        i = 0;
      }
      this.active = i;
      i++;
    }, 2000);
  },
  methods: {
    async Popular() {
      try {
        const respone = await this.$http.get(`/movie/popular${key}`);
        this.populars = respone.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    async Upcoming() {
      try {
        const respone = await this.$http.get(`movie/upcoming${key}`);
        this.upComings = respone.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    async NowPlaying() {
      try {
        const respone = await this.$http.get(`movie/now_playing${key}`);
        this.nowPlayings = respone.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    async TopRated() {
      try {
        const respone = await this.$http.get(`movie/top_rated${key}`);
        this.topRaties = respone.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    moveDetailMovie(id) {
      this.$router.push(`/film/${id}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}
.scrollable {
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100vh - 20px);
}
.VueCarousel-dot-container {
  margin-top: 0;
}
</style>
