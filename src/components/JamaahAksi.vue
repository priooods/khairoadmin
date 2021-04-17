<template>
  <transition name="fade" mode="out-in">
        <div class="jamaah-aksi px-3 py-2" v-show="show">
            <vs-button class="ml-n1 bc" size="small" @click="backpresed">Tutup</vs-button>
            <div v-if="checkval == 1">
              <h1 class="mt-2">Detail Jamaah</h1>
            <div class="row mt-3">
              <p class="col-md-6 col-4">Status Bayar</p>
              <p class="col-md-6 col-8 text-bold">{{detail.bayar ? detail.bayar : '--'}}</p>
              <p class="col-md-6 col-4">Code</p>
              <p class="col-md-6 col-8">{{detail.code ? detail.code : '--'}}</p>
              <p class="col-md-6 col-4">Nama Umrah</p>
              <p class="col-md-6 col-8">{{detail.nama_lengkap ? detail.nama_lengkap : '---' | uppercase}}</p>
              <p class="col-md-6 col-4">Nama Ayah</p>
              <p class="col-md-6 col-8">{{detail.nama_ayah | uppercase}}</p>
              <p class="col-md-6 col-4">Tempat/Tanggal Lahir</p>
              <p class="col-md-6 col-8">{{detail.ttl | uppercase}}</p>
              <p class="col-md-6 col-4">No KTP</p>
              <p class="col-md-6 col-8">{{detail.no_ktp}}</p>
              <p class="col-md-6 col-4">No Telepon</p>
              <p class="col-md-6 col-8">{{detail.no_telp}}</p>
              <p class="col-md-6 col-4">Gender</p>
              <p class="col-md-6 col-8">{{detail.gender | uppercase}}</p>
              <p class="col-md-6 col-4">Gol Darah</p>
              <p class="col-md-6 col-8">{{detail.darah ? detail.darah : '--'}}</p>
              <p class="col-md-6 col-4">Alamat</p>
              <p class="col-md-6 col-8">{{detail.alamat | uppercase}}</p>
              <p class="col-md-6 col-4">Nama Mahram</p>
              <p class="col-md-6 col-8">{{detail.nama_mahram ? detail.nama_mahram : '--' | uppercase}}</p>
              <div class="col-12 row" v-show="detail.passport">
                  <p class="col-md-6 col-4">Nama Passport</p>
                  <p class="col-md-6 col-8">{{detail.passport ? detail.passport.nama : '--' | uppercase}}</p>
                  <p class="col-md-6 col-4">No Passport</p>
                  <p class="col-md-6 col-8">{{detail.passport ? detail.passport.nomor : '--' }}</p>
                  <p class="col-md-6 col-4">Kota Passport</p>
                  <p class="col-md-6 col-8">{{detail.passport ? detail.passport.kota : '--' | uppercase}}</p>
                  <p class="col-md-6 col-4">Keluar Passport</p>
                  <p class="col-md-6 col-8">{{detail.passport ? detail.passport.tgl_keluar : '--'}}</p>
                  <p class="col-md-6 col-4">Tanggal Kadaluarsa Passport</p>
                  <p class="col-md-6 col-8">{{detail.passport ? detail.passport.tgl_keluar : '--'}}</p>
              </div>
              <div class="col-12 row" v-show="detail.pesanan">
                  <p class="col-md-6 col-4">Jadwal Berangkat</p>
                  <p class="col-md-6 col-8">{{detail.pesanan ? detail.pesanan.jadwal.berangkat : '--'}}</p>
                  <p class="col-md-6 col-4">Jadwal Pulang</p>
                  <p class="col-md-6 col-8">{{detail.pesanan ? detail.pesanan.jadwal.pulang : '--'}}</p>
                </div>
          </div>
            </div>
            <div v-else>
              <h1 class="mt-2">Jamaah Belum Lunas</h1>
              <div class="row mt-3" v-for="(data,i) in detail" v-bind:key="i">
                  <p class="col-md-6 col-4">Nama Jamaah</p>
                  <p class="col-md-6 col-8 text-bold">{{ data.jamaah.nama_lengkap}}</p>
                  <p class="col-md-6 col-4">No Jamaah</p>
                  <p class="col-md-6 col-8 text-bold">{{data.jamaah.code}}</p>
                </div>
            </div>
          <!-- <vs-button size="small" danger>Hapus Paket</vs-button> -->
        </div>
   </transition>
</template>

<script>
import Vue2Filters from 'vue2-filters'
export default {
    name:"JamaahAksi",
    mixins: [Vue2Filters.mixin],
    props:{
        data: null,
        show: Boolean,
        checkval: null
    },
    computed:{
        detail(){
            return {...this.data}
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
.jamaah-aksi{
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
  .jamaah-aksi{
    width: 100%;
  }
  .bc{
      width: 160px;
  }
}
</style>