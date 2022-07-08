<template>
  <div class="px-[120px]">
    <Header />
    <div class="flex justify-between items-center">
      <div class="text-white-400 text-[30px]">
        <h1>Watch Favouries</h1>
      </div>
      <div
        class="text-sky-500 cursor-pointer hover:opacity-75"
        @click="removeFavouriesAll"
      >
        <span><font-awesome-icon icon="fa-solid fa-trash" /></span> Clear
      </div>
    </div>
    <div class="infinite-scroll-component flex flex-wrap mt-[30px]">
      <div
        class="w-[18.2%] mr-[22px] mb-[22px] overflow-hidden bg-dark-lighten group cursor-pointer rounded relative"
        v-for="listFavourie in listFavouries"
        :key="listFavourie.id"
      >
        <div
          class="absolute text-sky-600 text-[30px] right-[4%] top-0 hover:opacity-75"
          @click="removeFavouries(listFavourie.id)"
        >
          <span><font-awesome-icon icon="fa-solid fa-xmark" /></span>
        </div>
        <img
          class="w-screen object-cover"
          :src="`https://image.tmdb.org/t/p/original/${listFavourie.poster_path}`"
          alt=""
          @click="moveDetailMovie(listFavourie.movieID)"
        />
        <h1
          class="transition duration-300 pb-1 px-2 m-0 text-lg max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {{ listFavourie.title }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { favouritesColRef } from "../services/firebase";
import Header from "../share/Header.vue";
export default {
  name: "ExploreComponent",
  components: { Header },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("userID")),
      listFavouries: [],
    };
  },
  created() {
    this.getFavouries();
  },
  methods: {
    async getFavouries() {
      const q = query(favouritesColRef, where("userID", "==", this.userID));
      const querySnapshot = await getDocs(q);
      const listFavouries = [];
      querySnapshot.forEach((doc) => {
        let listFavouriesData = doc.data();
        listFavouriesData.id = doc.id;
        listFavouriesData.userID = doc.userID;
        listFavouries.push(listFavouriesData);
        console.log(listFavouriesData);
      });
      this.listFavouries = listFavouries;
      console.log(listFavouries);
    },
    async removeFavouries(id) {
      console.log(id)
      try {
        if (confirm("Bạn chắc có muốn xóa")) {
          await deleteDoc(doc(favouritesColRef, id));
          this.getFavouries();
          let myToast = this.$toasted.show("OK!");
          myToast.text("Xóa thành công !!!").goAway(1500);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async removeFavouriesAll() {
      try {
        if (confirm("Bạn chắc có muốn xóa tất cả")) {
          await deleteDoc(doc(favouritesColRef, this.userID));
          this.getFavouries();
        }
      } catch (error) {
        console.log(error);
      }
    },
    moveDetailMovie(id) {
      this.$router.push(`/film/${id}`);
    },
  },
};
</script>

<style scoped></style>
