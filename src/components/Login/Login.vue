<template>
  <div>
    <main>
      <section class="absolute w-full h-full">
        <div
          class="absolute top-0 w-full h-full bg-gray-900 i"
          style="background-size: 100%; background-repeat: no-repeat"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
              >
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-gray-600 text-sm font-bold">
                      Sign in with
                    </h6>
                  </div>
                  <div class="btn-wrapper text-center">
                    <button
                      class="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                      type="button"
                      style="transition: all 0.15s ease 0s"
                      @click="signInFacebook"
                    >
                      <img
                        alt="..."
                        class="w-5 mr-1"
                        src="../../assets/images/facebook.png"
                      />
                      FaceBook</button
                    ><button
                      class="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                      type="button"
                      style="transition: all 0.15s ease 0s"
                      @click="signInGoogle"
                    >
                      <img
                        alt="..."
                        class="w-5 mr-1"
                        src="../../assets/images/google.png"
                      />Google
                    </button>
                  </div>
                  <hr class="mt-6 border-b-1 border-gray-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div
                    class="text-gray-700 text-center mb-3 font-bold text-[30px]"
                  >
                    <h1>Đăng nhập</h1>
                  </div>
                  <form>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Email</label
                      ><input
                        type="email"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style="transition: all 0.15s ease 0s"
                        v-model="email"
                      />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Password</label
                      ><input
                        type="password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style="transition: all 0.15s ease 0s"
                        v-model="password"
                      />
                    </div>

                    <div class="text-center mt-6">
                      <button
                        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style="transition: all 0.15s ease 0s"
                        @click="signInEmail"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div class="flex flex-wrap mt-6">
                    <div class="w-1/2">
                      <a href="#pablo" class="text-gray-700"
                        ><small>Quên mật khẩu?</small></a
                      >
                    </div>
                    <div class="w-1/2 text-right">
                      <router-link
                        to="/register"
                        href="#pablo"
                        class="text-gray-700"
                        ><small> Bạn chưa có tài khoản?</small></router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
export default {
  name: "login-page",
  components: {},
  data() {
    return {
      token: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async signInGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      await signInWithPopup(auth, provider)
        .then((results) => {
          this.token = results.user.accessToken;
          localStorage.setItem(
            "user",
            JSON.stringify(results.user.displayName)
          );
          localStorage.setItem("userID", JSON.stringify(results.user.uid));
          localStorage.setItem(
            "photoURL",
            JSON.stringify(results.user.photoURL)
          );
          this.$store.dispatch("getPhotoURL", results.user.photoURL);
          this.$store.dispatch("getUserID", results.user.uid);
          this.$store.dispatch("getUser", results.user.displayName);
          this.$router.push("/");
          console.log(results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async signInFacebook() {
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      await signInWithPopup(auth, provider)
        .then((results) => {
          this.token = results.user.accessToken;
          localStorage.setItem(
            "user",
            JSON.stringify(results.user.displayName)
          );
          localStorage.setItem(
            "photoURL",
            JSON.stringify(results.user.photoURL)
          );
          this.$store.dispatch("getPhotoURL", results.user.photoURL);
          localStorage.setItem("userID", JSON.stringify(results.user.uid));
          this.$store.dispatch("getUserID", results.user.uid);
          this.$store.dispatch("getUser", results.user.displayName);
          this.$router.push("/");
          console.log(results);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async signInEmail() {
      const email = this.email;
      const password = this.password;
      await signInWithEmailAndPassword(getAuth(), email, password)
        .then((results) => {
          this.token = results.user.accessToken;
          localStorage.setItem(
            "user",
            JSON.stringify(results.user.displayName)
          );
          localStorage.setItem(
            "photoURL",
            JSON.stringify(results.user.photoURL)
          );
          this.$store.dispatch("getPhotoURL", results.user.photoURL);
          localStorage.setItem("userID", JSON.stringify(results.user.uid));
          this.$store.dispatch("getUserID", results.user.uid);
          this.$store.dispatch("getUser", results.user.displayName);
          console.log(results);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.i {
  background-image: url("../../assets/images/register.png");
}
</style>
