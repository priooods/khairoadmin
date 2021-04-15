<template>
  <transition name="fade" mode="out-in">
      <div class="mitradrawer px-3 py-3" v-show="show">
          <div class="back d-flex justify-content-start col-1" @click="backpresed">
              <i class='bx bx-left-arrow-alt ml-n3'></i>
              <h2 class="ml-1">Tutup</h2>
          </div>
          <h1 class="mt-2">Detail Mitra</h1>
          <div class="row mt-3">
              <p class="col-md-6 col-4">Code</p>
              <p class="col-md-6 col-8">{{data.code}}</p>
              <p class="col-md-6 col-4">Nama Lengkap</p>
              <p class="col-md-6 col-8">{{data.fullname}}</p>
              <p class="col-md-6 col-4">No Handphone</p>
              <p class="col-md-6 col-8">{{data.no_tlp}}</p>
              <p class="col-md-6 col-4">Alamat</p>
              <p class="col-md-6 col-8">{{data.alamat}}</p>
          </div>
          <vs-button block size="small" v-show="checkAccess == 1 && showaction == false" @click="showaction = !showaction">Lakukan Aksi</vs-button>
          <div class="row justify-content-center" v-show="showaction">
            <vs-button danger class="col-5" block size="small" @click="hapusData">Hapus Mitra</vs-button>
            <!-- <vs-button warn class="col-5" block size="small">Edit Mitra</vs-button> -->
            <vs-button class="col-10" block size="small" @click="showaction = !showaction">Cancel</vs-button>
          </div>
      </div>
  </transition>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
export default {
    name: "mitradrawer",
    mixins: [Notifikasi],
    props:{
        show: Boolean,
        data: null
    },
    data() {
      return {
        showaction: false
      }
    },
    computed:{
      checkAccess(){
        return this.$cookies.get('type');
      }
    },
    methods:{
        backpresed(){
            return this.$emit('closeable', false);
        },
        hapusData(){
          this.helper_loading("Menghapus Mitra...");
          this.$store.dispatch('mitra/DeleteMitra', this.data.username);
          this.helper_check_request("Berhasil Menghapus Mitra", "Mitra anda berhasil dihapus, Refresh halaman apabila mitra pada table belum hilang");
          return this.backpresed();
        }
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