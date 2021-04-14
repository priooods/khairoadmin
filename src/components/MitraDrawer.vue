<template>
  <transition name="fade" mode="out-in">
      <div class="mitradrawer px-3 py-3" v-show="show">
          <div class="back d-flex justify-content-start col-1" @click="backpresed">
              <i class='bx bx-left-arrow-alt ml-n3'></i>
              <h2 class="ml-1">Tutup</h2>
          </div>
          <h1 class="mt-2">Detail Mitra</h1>
          <div class="row mt-3">
              <p class="col-md-4">Code</p>
              <p class="col-md-8">{{data.code}}</p>
              <p class="col-md-4">Nama Lengkap</p>
              <p class="col-md-8">{{data.fullname}}</p>
              <p class="col-md-4">No Handphone</p>
              <p class="col-md-8">{{data.no_tlp}}</p>
              <p class="col-md-4">Alamat</p>
              <p class="col-md-8">{{data.alamat}}</p>
          </div>
      </div>
  </transition>
</template>

<script>
export default {
    name: "mitradrawer",
    props:{
        show: Boolean,
        data: null
    },
    methods:{
        backpresed(){
            return this.$emit('closeable', false);
        },
    }
}
</script>

<style lang="scss">
@import "@/assets/fonts/font.scss";
.mitradrawer{
  position: fixed;
  right: 0;
  top: 0;
  width: 400px;
  bottom: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 2;
  h1{
    font-size: 16px;
    font-family: $font-bold;
  }
  .back{
    h2{
      font-size: 14px;
      font-family: $font-bold;
    }
  }
  .back:hover{
    color: $yellow;
    cursor: pointer;
    h2{
      color: $yellow;
    }
  }
}
@media (max-width: 700px){
  .mitradrawer{
    width: 100%;
  }
}
</style>