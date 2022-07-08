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
                <div class="flex-auto px-4 lg:px-10 py-10 pt-[20px]">
                  <div
                    class="text-gray-700 text-center mb-3 font-bold text-[30px]"
                  >
                    <h1>Đăng kí</h1>
                  </div>
                  <form>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >User name</label
                      ><input
                        v-model="name"
                        type="text"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style="transition: all 0.15s ease 0s"
                      />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Email</label
                      ><input
                        v-model="email"
                        type="email"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style="transition: all 0.15s ease 0s"
                      />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Password</label
                      ><input
                        v-model="password"
                        type="password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style="transition: all 0.15s ease 0s"
                      />
                    </div>

                    <div class="text-center mt-6">
                      <button
                        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style="transition: all 0.15s ease 0s"
                        @click.prevent="signUp()"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                  <p class="text-[16px] text-red-500 mt-[10px] text-center">
                    {{ error }}
                  </p>
                  <div class="flex flex-wrap mt-6">
                    <div class="w-1/2">
                      <a href="#" class="text-gray-700"
                        ><small>Quên mật khẩu?</small></a
                      >
                    </div>
                    <div class="w-1/2 text-right">
                      <router-link to="/login" href="#" class="text-gray-700"
                        ><small>Đi tới đăng nhập</small></router-link
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
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default {
  name: "login-page",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async signUp() {
      const email = this.email;
      const password = this.password;
      const name = this.name;
      try {
        const repon = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        let myToast = this.$toasted.show("OK!");
        myToast.text("Đăng kí thành công !!!").goAway(1500);
        this.$router.push("/login");
        console.log(repon);
        updateProfile(repon.user, {
          displayName: name,
          photoURL:
            "https://lh3.googleusercontent.com/a/AATXAJynqsD6KNLwZjLPymu65sqANMSqrgLcxu1bPAcJ=s96-c",
        });
      } catch (error) {
        console.log(error.message);
        this.error = "Email đã tồn tại";
      }
    },
  },
};
</script>

<style scoped>
.i {
  background-image: url("../../assets/images/register.png");
}
</style>
