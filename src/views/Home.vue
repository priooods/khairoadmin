<template>
  <div class="Home">
      <h1 class="hidden md:block">Dashboard</h1>
      <div class="md:flex check justify-center items-center text-center">
        <img src="../assets/logos.jpg" alt="">
        <h3 class="font-bold text-xl text-black">Selamat Datang di Sistem Informasi Manajement Tour & Travel</h3>
      </div>
  </div>
</template>

<script>
export default {
  name: "Home",
}
</script>

<style lang="scss">
img{
  width: 300px;
  height: 300px;
}
@media (max-width: 700px) {
  img{
    width: 100%;
    height: 100%;
  }
}
</style>