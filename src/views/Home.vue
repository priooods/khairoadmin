<template>
  <div class="Home views host">
      <h1 class="ml-3 rd">Dashboard</h1>
      <div class="d-flex check justify-content-center align-items-center mx-2">
        <img src="../assets/logos.jpg" alt="">
        <h3 class="font-check">Selamat Datang di Sistem Informasi Manajement <br> Tour & Travel</h3>
      </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    // this.$store.dispatch('operat/resetState');
  }
}
</script>

<style lang="scss">
@import '../assets/fonts/font.scss';
.host{
  background: white !important;
}
.views{
  height: 100vh !important;
  img{
    width: 300px;
    height: 300px;
  }
  .rd{
    color: #0779e4;
  }
  // .font-check{
  //   margin-right: 50px;
  // }
  .names{
    h6{
      line-height: 14px;
      font-size: 15px;
    }
    .updt{
      line-height: 11px;
      font-size: 12px;
      color: $red;
      font-family: $font-moderat-bold;
      cursor: pointer;
    }
  }
  .search{
      font-size: 11px;
      font-family: $font-reguler;
  }
  .buton{
    max-height: 30px;
  }
}
@media (max-width: 700px) {
  .views{
    img{
      width: 100%;
      height: 100%;
    }
    .check{
      display: block !important;
      text-align: center;
      margin: 20px 10px 0px 10px;
    }
    .font-check{
      display: none;
      // margin-right: 0px !important;
      // font-size: 18px;
    }
  }
}
</style>