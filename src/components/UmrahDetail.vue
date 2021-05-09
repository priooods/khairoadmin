<template>
  <div class="umrah-aksi" v-show="show == 3">
      <div class="cursor-pointer md:w-1/6 mt-4 md:mt-0 hover:text-red-500" @click="backpresed">
          <i class='bx bx-left-arrow-alt inline'></i>
          <h2 class="inline ml-2">Tutup</h2>
      </div>
      <h6 class="mt-2 font-bold text-xl hidden md:block">Detail Umrah</h6>
      <div class="grid grid-cols-2 gap-2 mt-3">
        <div v-show="showedit">
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
            <p class="text-md">: {{detail.biaya | currency("Rp. ")}}</p>
            <p class="text-md font-semibold">Durasi Umrah</p>
            <p class="text-md">: {{detail.durasi}} Hari</p>
            <p v-if="detail.jadwal" class="text-md font-semibold">Jadwal Berangkat</p>
            <p v-if="detail.jadwal" class="text-md">: {{detail.jadwal.berangkat | moment("DD MMMM YYYY")}}</p>
            <p v-if="detail.jadwal" class="text-md font-semibold">Jadwal Pulang</p>
            <p v-if="detail.jadwal" class="text-md">: {{detail.jadwal.pulang | moment("DD MMMM YYYY")}}</p>
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
        <div v-show="!showedit">
          <p class="font-semibold text-xs mb-2">Ubah Data Paket Umrah</p>
          <Form ref="form" class="md:grid w-full grid-cols-2 md:gap-2" :inline="false" :model="detail">
            <FormItem label="Nama Paket" prop="nama">
                <Input v-model="detail.nama" type="text" placeholder="Masukan Nama Paket"></Input>
            </FormItem>
            <FormItem label="Durasi Paket" prop="durasi">
                <Input v-model="detail.durasi" type="number" placeholder="Masukan Durasi Paket"></Input>
            </FormItem>
            <FormItem label="Tahun Paket ( Hijriah )" prop="tahun">
                <Input v-model="detail.tahun" type="number" placeholder="contoh: 1976"></Input>
            </FormItem>
            <FormItem label="Kuota Paket" prop="kuota">
                <Input v-model="detail.kuota" type="number" placeholder="Masukan Kuota Paket"></Input>
            </FormItem>
            <FormItem label="Biaya Paket" prop="biaya">
                <Input v-model="detail.biaya" type="number" placeholder="Masukan biaya Paket"></Input>
            </FormItem>
          </Form>
          <div class="flex mt-3">
            <Button type="primary" class="mr-1" @click="updated">Simpan</Button>
            <Button type="error" class="ml-1" @click="showedit = !showedit">Tutup</Button>
          </div>
        </div>
      </div>
    <Button type="primary" v-show="showedit" class="mt-5" @click="showedit = !showedit">Ubah Paket</Button>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import Notifikasi from '../model/Notifikasi';
export default {
    mixins: [Vue2Filters.mixin, Notifikasi],
    name: 'UmrahAksi',
    props:{
        show: Number,
        data: null
    },
    data() {
      return {
        showedit: true,
        forms: {
          nama: '',
          durasi: '',
          tahun: '',
          kuota: '',
          biaya: '',
          id: ''
        },
      }
    },
    computed:{
        detail(){
            return {...this.data};
        }
    },
    methods: {
        backpresed(){
          this.showedit = true;
          return this.$emit('closeable', 1);
        },
        updated(){
          this.helper_loading("Mengupdate Data Paket..")
          this.forms.nama = this.detail.nama;
          this.forms.durasi = this.detail.durasi;
          this.forms.tahun = this.detail.tahun;
          this.forms.kuota = this.detail.kuota;
          this.forms.biaya = this.detail.biaya;
          this.forms.id = this.detail.id;
          this.$store.dispatch('umrah/UpdateUmrah', this.forms);
          this.helper_check_request("Update Berhasil", "Refresh ulang halaman untuk melihat data terbaru !");
        }
    },
}
</script>
