<template>
  <div class="min-h-screen flex">
    <NavBar />
    <div class="grow">
      <div
        class="mb-[120px]"
        v-for="discovery in discoveries"
        :key="discovery.id"
      >
        <div class="flex justify-center mt-[20px]">
          <div class="w-[50px] h-[50px] mt-[7px]">
            <img
              class="rounded-full object-cover w-[100%] h-[100%]"
              :src="`https://image.tmdb.org/t/p/original/${discovery.image}`"
              alt=""
            />
          </div>
          <div class="ml-[10px]">
            <p class="mb-[10px] text-xl">{{ discovery.title }}</p>
            <p class="mr-[150px]">{{ discovery.trainer }}</p>
          </div>
        </div>
        <div class="justify-center flex mt-[20px]">
          <div class="w-[400px]">
            <iframe
              allowfullscreen
              class="h-[230px] w-[100%]"
              :src="discovery.video"
              frameborder="0"
            ></iframe>
          </div>
          <div class="flex justify-center items-center">
            <div class="ml-[30px]">
              <div class="mb-[20px]">
                <p
                  class="w-[40px] h-[40px] mt-[150%] bg-gray-500 justify-center mb-[5px] text-rose-500 flex items-center rounded-full cursor-pointer"
                >
                  <font-awesome-icon icon="fa-solid fa-heart" />
                </p>
                <span class="ml-[15px]">{{ discovery.like }}</span>
              </div>
              <div class="mb-[20px]">
                <router-link :to="`/film/${discovery.movieID}`">
                  <p
                    class="w-[40px] h-[40px] bg-gray-500 justify-center flex items-center rounded-full cursor-pointer"
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-up-right-from-square"
                    />
                  </p>
                  <span>Open</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../share/NavBar.vue";
import { getDocs } from "firebase/firestore";
import { discoveriesColRef } from "../services/firebase";
export default {
  name: "DiscoveryComponent",
  components: { NavBar },
  data() {
    return {
      discoveries: [],
    };
  },
  created() {
    this.getDiscoveries();
  },
  methods: {
    async getDiscoveries() {
      const querySnapshot = await getDocs(discoveriesColRef);
      const discoveriesList = [];
      querySnapshot.forEach((doc) => {
        discoveriesList.push(doc.data());
        this.discoveries = discoveriesList;
      });
      console.log(discoveriesList);
    },
  },
};
</script>

<style scoped></style>
