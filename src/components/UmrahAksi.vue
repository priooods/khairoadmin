<template>
   <transition name="fade" mode="out-in">
        <div class="umrah-aksi px-3 py-2" v-show="show">
            <vs-button class="ml-n1 bc" size="small" @click="backpresed">Tutup</vs-button>
            <h1 class="mt-2">Detail Umrah</h1>
            <div class="row mt-3">
              <p class="col-md-6 mt-2 col-4">Code</p>
              <p class="col-md-6 mt-2 col-8">{{detail.code ? detail.code : '---'}}</p>
              <p class="col-md-6 mt-2 col-4">Nama Umrah</p>
              <p class="col-md-6 mt-2 col-8">{{detail.nama ? detail.nama : '---'}}</p>
              <p class="col-md-6 mt-2 col-4">Jenis Paket</p>
              <p class="col-md-6 mt-2 col-8">{{detail.jenis_paket}}</p>
              <p class="col-md-6 mt-2 col-4">Kuota Jamaah</p>
              <p class="col-md-6 mt-2 col-8">{{detail.kuota}} Orang</p>
              <p class="col-md-6 mt-2 col-4">Tahun</p>
              <p class="col-md-6 mt-2 col-8">{{detail.tahun}} Hijriah</p>
              <p class="col-md-6 mt-2 col-4">Biaya Umrah</p>
              <p class="col-md-6 mt-2 col-8">{{detail.biaya | currency('Rp. ')}}</p>
              <p class="col-md-6 mt-2 col-4">Durasi Umrah</p>
              <p class="col-md-6 mt-2 col-8">{{detail.durasi}} Hari</p>
              <p v-if="detail.maskapai" class="col-12 mt-2 text-bold">Maskapai</p>
              <div class="col-12 mt-2 row" v-show="detail.maskapai" v-for="(data, a) in detail.maskapai" v-bind:key="a">
                  <p class="col-md-6 col-4">Nama</p>
                  <p class="col-md-6 col-8">{{data.nama}}</p>
              </div>
              <p v-if="detail.hotel" class="col-12 text-bold mt-2">Hotel</p>
              <div class="col-12 mt-2 row" v-show="detail.hotel" v-for="(data, i) in detail.hotel" v-bind:key="i">
                  <div class="d-flex">
                      <div class="col-1 mt-2">{{i + 1}}</div>
                      <div class="col row">
                          <p class="col-md-6 mt-2 col-4">Nama</p>
                          <p class="col-md-6 mt-2 col-8">{{data.nama}}</p>
                          <p class="col-md-6 mt-2 col-4">Kota</p>
                          <p class="col-md-6 mt-2 col-8">{{data.kota}}</p>
                          <p class="col-md-6 mt-2 col-4">Alamat</p>
                          <p class="col-md-6 mt-2 col-8">{{data.alamat}}</p>
                      </div>
                  </div>
                  <p v-if="data.kamar" class="col-12 text-bold mt-2">Kamar</p>
                  <div class="mt-2 col-12" v-for="(kmr, k) in data.kamar" v-bind:key="k">
                      <div class="row">
                          <div class="col-1 mt-2">{{k + 1}}</div>
                          <div class="col row">
                              <p class="col-md-6 mt-2 col-4">Nama Kamar</p>
                              <p class="col-md-6 mt-2 col-8">{{kmr.nama}}</p>
                              <p class="col-md-6 mt-2 col-4">Kapasitas</p>
                              <p class="col-md-6 mt-2 col-8">{{kmr.kapasitas}} Orang</p>
                              <p class="col-md-6 mt-2 col-4">Harga</p>
                              <p class="col-md-6 mt-2 col-8">{{kmr.harga | currency('Rp. ')}}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- <vs-button size="small" danger>Hapus Paket</vs-button> -->
        </div>
   </transition>
</template>

<script>
import Vue2Filters from 'vue2-filters'
export default {
    mixins: [Vue2Filters.mixin],
    name: 'UmrahAksi',
    props:{
        show: Boolean,
        data: null
    },
    computed:{
        detail(){
            return {...this.data};
        }
    },
    methods: {
        backpresed(){
            return this.$emit('closeable', false);
        }
    },
}
</script>

<style lang="scss">
@import "@/assets/fonts/font.scss";
.umrah-aksi{
  position: fixed;
  right: 0;
  top: 0;
  width: 400px;
  bottom: 0;
  overflow-y: auto;
  height: 100vh;
  z-index: 2;
  .text-bold{
      font-weight: bold;
  }
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
  .umrah-aksi{
    width: 100%;
  }
  .bc{
      width: 160px;
  }
}
</style>