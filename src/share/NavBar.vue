<template>
  <div
    class="w-[90vw] max-w-[288px] min-h-screen border-r-2 border-gray-800 pt-8 pl-16"
  >
    <div class="fixed top-0 pt-[30px]">
      <div class="flex">
        <img
          class="w-6 h-6 mr-[8px] mt-[3px]"
          src="../assets/images/icon.png"
          alt=""
        />
        <p class="text-xl mb-[40px] items-center">FilmHot</p>
      </div>
      <div class="">
        <ul class="text-gray-400">
          <p class="">MENU</p>
          <router-link to="/">
            <li
              class="py-[10px] mt-[10px] hover:text-gray-100 cursor-pointer flex items-center text-cyan-400"
            >
              <font-awesome-icon icon="fa-solid fa-house-chimney" />
              <p class="ml-[10px]">Home</p>
            </li>
          </router-link>
          <router-link to="/discovery">
            <li
              class="py-[10px] hover:text-gray-100 cursor-pointer flex items-center"
            >
              <font-awesome-icon icon="fa-solid fa-compass" />

              <p class="ml-[10px]">Discovery</p>
            </li>
          </router-link>
          <router-link to="/explore">
            <li
              class="py-[10px] hover:text-gray-100 cursor-pointer flex items-center"
            >
              <font-awesome-icon icon="fa-solid fa-tv" />
              <p class="ml-[10px]">Explore</p>
            </li>
          </router-link>
          <router-link to="/favouries">
            <li
              class="py-[10px] hover:text-gray-100 cursor-pointer flex items-center"
            >
              <font-awesome-icon icon="fa-solid fa-heart" />
              <p class="ml-[10px]">Favourite</p>
            </li>
          </router-link>
        </ul>
      </div>

      <div class="text-gray-400 mt-[30px]">
        <p class="py-[10px]">PERSONAL</p>
        <div class="">
          <h1 class="text-[18px] mb-[16px]">{{ user }}</h1>
        </div>
        <div
          class="flex items-center hover:text-gray-100 mt-[10px]"
          v-if="!user"
        >
          <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
          <router-link to="/login">
            <p class="cursor-pointer ml-[10px]">Sign In</p>
          </router-link>
        </div>
        <div
          class="flex items-center hover:text-gray-100 mt-[10px]"
          v-if="user"
          @click="logout"
        >
          <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
          <p class="cursor-pointer ml-[10px]">Log out</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$store.state.user = null;
          this.$store.state.userID = null;
          this.$store.state.photoURL = null;
          localStorage.removeItem("photoURL");
          localStorage.removeItem("user");
          localStorage.removeItem("userID");
          this.getAuth();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
