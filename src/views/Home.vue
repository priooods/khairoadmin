<template>
  <div class="Home views">
      <h1 class="ml-3">Dashboard</h1>
      
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
.views{
  height: 100vh !important;
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
</style>