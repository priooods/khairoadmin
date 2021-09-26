<template>
  <div class="umrah-aksi" v-show="show == 3">
    <div class="cursor-pointer md:w-1/6 mt-4 md:mt-0 hover:text-red-500" @click="backpresed">
        <i class='bx bx-left-arrow-alt inline'></i>
        <h2 class="inline ml-2">Tutup</h2>
    </div>
    <h6 class="mt-2 font-bold text-xl hidden md:block">Detail Umrah</h6>
    <div v-show="showedit" class="grid md:grid-cols-2 grid-cols-1 gap-2 mt-3">
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
        <div>
          <div class="grid grid-cols-2 mt-2 gap-2 w-full" v-for="(data,i) in detail.hotel" :key="i">
            <p class="text-md font-semibold">Hotel {{i+1}}</p>
            <p class="text-md">: {{data.kota}} , {{data.nama}}</p>
          </div>
        </div>
        <div v-if="detail.aset">
          <div class="grid grid-cols-2 mt-2 gap-2 w-full" v-for="(data,i) in detail.aset" :key="i">
            <p class="text-md font-semibold">Assets {{i+1}}</p>
            <p class="text-md">: {{data.nama}}</p>
          </div>
        </div>
      </div>
      <div v-if="detail.pesanan_detail">
        <div v-if="detail.pesanan_detail.jamaah_all">
          <p class="font-semibold mb-3 text-xs text-red-500">Informasi Jamaah</p>
          <div class="flex" v-for="(data,i) in detail.pesanan_detail.jamaah_all" :key="i">
            <p class="font-semibold mr-2 mt-auto">{{i+1}}. </p>
            <div class="grid grid-cols-2 mt-2 gap-2 w-full">
              <p class="text-md font-semibold">Nama Jamaah</p>
              <p class="text-md">: {{data.nama_lengkap}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!showedit">
      <p class="font-semibold text-xs mb-2">Ubah Data Paket Umrah</p>
      <Form ref="form" class="md:grid w-full md:grid-cols-4 grid-cols-1 md:gap-2" :inline="false" :model="detail">
        <FormItem label="Nama Paket" prop="nama">
            <Input v-model="detail.nama" type="text" placeholder="Masukan Nama Paket"></Input>
        </FormItem>
        <FormItem label="Durasi Paket ( Hari )" prop="durasi">
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
        <div v-if="detail.maskapai">
          <FormItem label="Maskapai" prop="maskapai">
              <Input v-model="detail.maskapai[0].nama" type="text" placeholder="nama maskapai"></Input>
          </FormItem>
        </div>
        <div v-if="detail.hotel">
          <FormItem label="Hotel Madinah" prop="hotel[0].nama">
              <Input v-model="detail.hotel[0].nama" type="text" placeholder="Hotel Madinah"></Input>
          </FormItem>
        </div>
        <div v-if="detail.hotel">
          <FormItem label="Hotel Mekkah" prop="hotel[1].nama">
              <Input v-model="detail.hotel[1].nama" type="text" placeholder="Hotel Mekkah"></Input>
          </FormItem>
        </div>
      </Form>
      <div class="flex mt-3">
        <Button type="primary" class="mr-1" @click="updated">Simpan</Button>
        <Button type="error" class="ml-1" @click="showedit = !showedit">Tutup</Button>
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
          let loading = this.$vs.loading({
                text: "Mengupdate Data Paket...",
            });
          this.forms.nama = this.detail.nama;
          this.forms.durasi = this.detail.durasi;
          this.forms.tahun = this.detail.tahun;
          this.forms.kuota = this.detail.kuota;
          this.forms.biaya = this.detail.biaya;
          this.forms.id = this.detail.id;
          this.forms.maskapai = [{nama: this.detail.maskapai[0].nama}];
          this.forms.hotel = [{nama: this.detail.hotel[0].nama},{nama: this.detail.hotel[1].nama}]
          this.$store.dispatch('umrah/UpdateUmrah', this.forms).finally(() => {
            loading.close();
            this.$vs.notification({
                color: "success",
                duration: 3000,
                position: "top-right",
                title: "Update Berhasil",
                text: "Refresh ulang halaman apabila data tidak berubah, untuk melihat data terbaru !",
            });
            return this.backpresed();
          });
        }
    },
}
</script>
