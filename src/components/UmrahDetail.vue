<template>
  <div class="umrah-aksi" v-show="show == 3">
      <div class="cursor-pointer md:w-1/6 mt-4 md:mt-0 hover:text-red-500" @click="backpresed">
          <i class='bx bx-left-arrow-alt inline'></i>
          <h2 class="inline ml-2">Tutup</h2>
      </div>
      <h6 class="mt-2 font-bold text-xl hidden md:block">Detail Umrah</h6>
      <div class="grid grid-cols-2 gap-2 mt-3">
        <div>
          <p class="font-semibold mb-3 text-xs text-red-500">Informasi Umum</p>
          <div class="grid grid-cols-2 gap-2 mt-2 mb-3">
            <p class="text-md font-semibold">Code</p>
            <p class="text-md">: {{detail.code ? detail.code : '---'}}</p>
            <p class="text-md font-semibold">Nama Umrah</p>
            <p class="text-md">: {{detail.nama ? detail.nama : '---'}}</p>
            <p class="text-md font-semibold">Kuota Jamaah</p>
            <p class="text-md">: {{detail.kuota}} Orang</p>
            <p class="text-md font-semibold">Tahun</p>
            <p class="text-md">: {{detail.tahun}} Hijriah</p>
            <p class="text-md font-semibold">Biaya Umrah</p>
            <p class="text-md">: {{detail.biaya}}</p>
            <p class="text-md font-semibold">Durasi Umrah</p>
            <p class="text-md">: {{detail.durasi}}</p>
            <p v-if="detail.jadwal" class="text-md font-semibold">Jadwal Berangkat</p>
            <p v-if="detail.jadwal" class="text-md">: {{detail.jadwal.berangkat}}</p>
            <p v-if="detail.jadwal" class="text-md font-semibold">Jadwal Pulang</p>
            <p v-if="detail.jadwal" class="text-md">: {{detail.jadwal.pulang}}</p>
          </div>
          <p class="font-semibold mb-3 text-xs text-red-500">Informasi Lainnya</p>
          <div class="grid grid-cols-2 mt-2 gap-2 w-full">
            <p class="text-md font-semibold">Sisa Kuota</p>
            <p class="text-md">: {{detail.sisa}}</p>
          </div>
          <div class="grid grid-cols-2 mt-2 gap-2 w-full" v-for="(data,i) in detail.maskapai" :key="i">
            <p class="text-md font-semibold">Maskapai</p>
            <p class="text-md">: {{data.nama}}</p>
          </div>
        </div>
      </div>
    <!-- <vs-button size="small" danger>Hapus Paket</vs-button> -->
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'
export default {
    mixins: [Vue2Filters.mixin],
    name: 'UmrahAksi',
    props:{
        show: Number,
        data: null
    },
    computed:{
        detail(){
            return {...this.data};
        }
    },
    methods: {
        backpresed(){
            return this.$emit('closeable', 1);
        }
    },
}
</script>
