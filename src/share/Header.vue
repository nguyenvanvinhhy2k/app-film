<template>
  <div class=" relative flex max-w-[1920px] mx-auto border-b-[1px] border-[#ccc] ">
  <div id="app" class="text-[#4f4f4f] w-full xl:max-w-[calc(100%-160px)] 2xl:max-w-[calc(100%-500px)] mx-auto px-[16px] xl:px-0 lg:justify-between flex justify-between items-center">
    <div class="flex items-center">
    <router-link to="/">
      <img
        class="w-[120px] h-[55px]"
        src="https://www.sabavn.com/images/sabasports.svg?v=MsKCZsdq7zCHgbxR4C1agDSqvYYO-61WMFuLpYPisPw"
        alt=""
      />
    </router-link>

    <div class="ml-[100px]">
      <img src="https://www.sabavn.com/uploads/banner/466L%E1%BB%8Bch-thi-%C4%91%E1%BA%A5u-2.png" alt="">
    </div>

    </div>
    <div class=" flex items-center">
    <div class="relative">
       <button class="absolute left-3 top-[1px] text-[20px]">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </button>
      <input
        class="border rounded-full pl-[40px] bg-[#fff] outline-none border-gray-600 text-[14px] px-[15px] w-[230px] h-[33px]"
        type="text"
        placeholder="Search..."
      />
    </div>

    <div class="ml-[20px] font-medium cursor-pointer hover:text-[#f12f19]">
      Đăng nhập
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
