<template>
  <div class="w-full h-full">
     <Header />
     <Menu />
     <Content />
     <Footer />
  </div>
</template>

<script>

import Header from "./share/Header.vue";
import Menu from "./share/Menu.vue";
import Content from "./share/Content.vue";
import Footer from "./share/Footer.vue";

const key = "?api_key=998585fd1110d356426ebf9cb7c2f24d";

export default {
  name: "HomeComponent",
  components: {
    Header,
    Menu,
    Content,
    Footer
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
