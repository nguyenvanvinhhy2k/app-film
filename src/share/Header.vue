<template>
  <div class="flex place-content-between ">
    <router-link to="/">
    <div class="flex mt-[30px]">
      <img
        class="w-9 h-9 mr-[8px] mt-[-2px]"
        src="../assets/images/icon.png"
        alt=""
      />
      <p class="text-xl mb-[40px] items-center">FilmHot</p>
    </div>
</router-link>
    <div class="relative mt-[30px] text-[25px]">
      <input
        class="border rounded-full bg-gray-900 outline-none border-gray-600 text-[15px] px-[20px] w-[250px] h-[40px]"
        type="text"
        placeholder="Search..."
      />
      <button class="absolute right-4 top-[0.4rem] text-[20px]">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </button>

      <div
        v-if="false"
        style=""
        class="absolute mt-[5px] overflow-hiden overflow-y-auto bg-gray-700 h-[210px] w-[250px]"
      >
        <div class="top-0 left-0 cursor-pointer display-none hover:opacity-75">
          <p class="text-[15px] border-b border-gray-500 pl-[10px] ;">
            S Diary
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
