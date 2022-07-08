<template>
  <div id="app" class="bg-gray-900 text-white min-h-screen min-w-screen">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
  display: none;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  display: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  display: none;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.toasting {
  color: yellow;
  background-color: pink;
}

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
