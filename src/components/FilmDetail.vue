<template>
  <div class="px-[120px]">
    <Header />
    <div class="flex">
      <!-- RIGHT -->
      <div class="w-[77%]">
        <div class="w-[100%] ml-[-27px]">
          <div class="px-4 pt-1">
            <div
              class="responsive-container overflow-hidden relative w-[100%] pt-[540px]"
              v-for="movie in movies"
              :key="movie.id"
            >
              <iframe
                class="responsive-iframe absolute top-0 left-0 w-full h-full rounded-[10px]"
                style="border: 0"
                allow="autoplay; 
                encrypted-media"
                allowfullscreen
                :src="movie.url"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <h1 class="text-[30px] mt-[15px] mb-[10px] w-[63%]">
            {{ detailMovie.title }}
          </h1>
          <div class="flex mt-[15px]">
            <div
              class="bg-amber-400 text-black text-[18px] p-[10px] rounded hover:opacity-75"
            >
              <a @click.prevent="modelOpen = true">
                <span><font-awesome-icon icon="fa-solid fa-circle-play" /></span
                ><button class="px-[8px] font-semibold">Play Trailer</button>
              </a>
            </div>
            <div
              class="bg-amber-400 text-black text-[18px] p-[10px] rounded ml-[20px] mr-[60px] hover:opacity-75"
              @click="addFavouries(detailMovie)"
            >
              <span><font-awesome-icon icon="fa-solid fa-heart" /></span
              ><button class="px-[8px] font-semibold focus:outline-none">
                Favourite
              </button>
            </div>
          </div>
        </div>
        <div class="flex">
          <div>
            <font-awesome-icon
              class="text-amber-400 mr-[5px]"
              icon="fa-solid fa-star"
            />
            <span>{{ detailMovie.vote_average }}</span>
          </div>
          <div class="ml-[15px]">
            <font-awesome-icon
              class="text-gray-500 mr-[5px]"
              icon="fa-solid fa-calendar-days"
            /><span>{{ detailMovie.release_date }}</span>
          </div>
        </div>

        <div class="flex mt-[15px] mb-[15px] items-center">
          <span
            v-for="i in detailMovie.genres"
            :key="i.id"
            class="text-[15px] px-[10px] py-[6px] bg-gray-800 rounded-2xl mr-[10px]"
            >{{ i.name }}</span
          >
        </div>
        <p class="w-[90%]">
          {{ detailMovie.overview }}
        </p>

        <h1 class="text-[25px] mt-[10px] mb-[10px]">Casts</h1>

        <div class="flex mb-[20px]">
          <div
            class="max-w-[95%] h-[210px] overflow-x-auto rounded mr-[10px] overflow-auto flex"
          >
            <img
              v-for="cast in casts"
              :key="cast.id"
              class="mr-[20px] object-cover rounded"
              :src="`https://image.tmdb.org/t/p/original/${cast.profile_path}`"
              alt=""
            />
          </div>
        </div>

        <h1 class="text-[25px] my-[15px]">Comments</h1>

        <div class="mb-[30px] relative">
          <div class="mr-[10px] absolute top-[6px] left-[11px]">
            <img
              v-if="dataComments.userID"
              class="w-[28px] h-[28px] rounded-[50%]"
              :src="dataComments.photoURL"
              alt=""
            />
          </div>
          <input
            v-if="dataComments.userID"
            v-on:keyup.enter="submitComment"
            placeholder="Bình luận"
            v-model="dataComments.comment"
            class="w-[90%] h-[40px] border border-gray-700 rounded-full pl-[45px] bg-gray-900 focus:outline-none"
          />
          <div class="" v-if="!dataComments.userID">
            <div
              class="w-[90%] h-[40px] border border-gray-700 rounded-full px-4 bg-gray-900 focus:outline-none"
            />
            <p class="absolute top-2 left-6">
              You need
              <router-link class="text-sky-500" to="/login">Login</router-link>
              to comment
            </p>
          </div>
        </div>

        <div
          class="flex mb-[20px] items-center"
          v-for="comment in comments"
          :key="comment.id"
        >
          <div class="mr-[10px]">
            <img
              class="w-[40px] h-[40px] rounded-[50%]"
              :src="comment.photoURL"
              alt=""
            />
          </div>
          <div class="mr-[10px]">
            <p class="mb-[10px]">{{ comment.userName }}</p>
            <p class="text-slate-300 text-[13px]">{{ comment.comment }}</p>
          </div>
          <div class="mb-[28px] ml-[4px]">
            <p class="text-gray-500">
              {{ calculateCreatedTime(comment.created_at) }}
            </p>
          </div>
        </div>
      </div>

      <!-- LEFT -->
      <div class="w-[23%]">
        <h1 class="text-[25px] mb-[20px]">The Similar</h1>
        <div class="overflow-y-auto max-h-[525px]">
          <div
            class="flex mb-[10px]"
            v-for="samilar in samilars"
            :key="samilar.id"
            @click="moveDetailMovie(samilar.id)"
          >
            <div
              class="cursor-pointer min-w-[70px] h-[70px] mr-[10px] mb-[10px]"
            >
              <img
                class="h-full w-full object-cover hover:opacity-75"
                :src="`https://image.tmdb.org/t/p/original/${samilar.poster_path}`"
                alt=""
              />
            </div>
            <div class="cursor-pointer hover:opacity-75">
              <p class="text-[14px] mb-[15px]">{{ samilar.title }}</p>
              <div class="flex text-[16px] items-center">
                <font-awesome-icon
                  class="text-amber-400 mr-[5px]"
                  icon="fa-solid fa-star"
                />
                <span>{{ samilar.vote_average.toFixed(1) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Trailer v-model="modelOpen" :mediaURL="youtobeVideo" />
  </div>
</template>

<script>
import axios from "axios";
import Header from "../share/Header.vue";
import Trailer from "./videos/Trailer.vue";
import { database, ref, push, onValue } from "../services/firebase";
import {
  // commentsColRef,
  favouritesColRef,
  // moviesColRef,
} from "../services/firebase";
import { addDoc, getDocs, where, query } from "firebase/firestore";

const key = "?api_key=998585fd1110d356426ebf9cb7c2f24d";

export default {
  name: "FilmDetail",
  components: {
    Header,
    Trailer,
  },
  data() {
    return {
      detailMovie: {},
      favouries: [],
      samilars: [],
      casts: [],
      modelOpen: false,
      comments: [],
      docRef: null,
      option: null,
      movieID: this.$route.params.id,
      movies: [],
      dataComments: {
        comment: "",
        userName: JSON.parse(localStorage.getItem("user")),
        photoURL: JSON.parse(localStorage.getItem("photoURL")),
        MovieID: this.$route.params.id,
        userID: JSON.parse(localStorage.getItem("userID")),
        created_at: Date.now(),
      },
    };
  },

  mounted() {
    this.Casts(this.$route.params.id);
    this.DetailMovie(this.$route.params.id);
    this.Samilar(this.$route.params.id);
    this.getComments();
    this.submitComment(this.$route.params.id);
    this.getFavouries();
    this.getMovie();
    this.calculateCreatedTime();
  },
  computed: {
    youtobeVideo() {
      if (!this.detailMovie.videos) return;
      return `https://www.youtube.com/embed/${this.detailMovie.videos.results[0].key}`;
    },
  },
  methods: {
    async DetailMovie(id) {
      try {
        const respone = await this.$http.get(
          `movie/${id}${key}&append_to_response=videos`
        );
        this.detailMovie = respone.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async Samilar(id) {
      try {
        const respone = await this.$http.get(`movie/${id}/similar${key}`);
        this.samilars = respone.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    async Casts(id) {
      try {
        const respone = await this.$http.get(`movie/${id}/casts${key}`);
        this.casts = respone.data.cast;
      } catch (error) {
        console.log(error.message);
      }
    },
    async getMovie() {
      try {
        const repon = await axios.get(
          `http://localhost:8000/film/${this.movieID}`
        );
        this.movies = repon.data;
        console.log(repon.data);
      } catch (error) {
        console.log(error);
      }
    },
    async submitComment(e) {
      if (e.keyCode === 13) {
        await push(ref(database, "commentss"), this.dataComments);
        this.dataComments.comment = "";
      }
    },
    getComments() {
      onValue(ref(database, "commentss"), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          let commentsRealTime = [];
          for (const property in data) {
            if (data[property].MovieID === this.movieID) {
              commentsRealTime.push({ ...data[property] });
              this.comments = commentsRealTime;
            }
          }
        }
      });
    },
    async addFavouries(movie) {
      if (!this.dataComments.userID) {
        let myToast = this.$toasted.show("OK!", {
          className: ["toasting"],
          position: "top-right",
          duration: 50000,
        });
        myToast
          .text("Bạn cần đăng nhập để thực hiện chắc năng này")
          .goAway(1500);
        return;
      }

      if (this.dataComments.userID) {
        const movieExist = this.favouries.some(
          (item) => item.movieID === movie.id
        );
        console.log("dasdasd", this.favouries);

        if (movieExist) {
          let myToast = this.$toasted.show("OK!");
          myToast.text("Đã có trong danh sách yêu thích").goAway(1500);
          return;
        } else {
          const addedFavouries = await addDoc(favouritesColRef, {
            userID: this.dataComments.userID,
            movieID: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
          });
          this.getFavouries();
          let myToast = this.$toasted.show("OK!");
          myToast.text("Đã thêm vào danh sách yêu thích").goAway(1500);
          console.log(addedFavouries);
        }
      }
    },
    moveDetailMovie(id) {
      this.$router.push(`/film/${id}`);
      // this.Casts(id);
      // this.DetailMovie(id);
      // this.Samilar(id);
      this.$router.go();
    },
    async getFavouries() {
      const q = query(
        favouritesColRef,
        where("userID", "==", this.dataComments.userID)
      );
      const querySnapshot = await getDocs(q);
      const favouries = [];
      querySnapshot.forEach((doc) => {
        favouries.push(doc.data());
      });
      this.favouries = favouries;
      console.log(favouries);
    },
    getInstance(ins) {
      console.log(ins);
    },
    calculateCreatedTime(value) {
      let periods = {
        year: 365 * 30 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
      };
      let diff = Date.now() - value;
      for (const key in periods) {
        if (diff >= periods[key]) {
          let result = Math.floor(diff / periods[key]);
          return `${result} ${result === 1 ? key : key + "s"} ago`;
        }
      }
      return "Just now";
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.toasting {
  color: yellow;
  background-color: pink;
}
</style>
