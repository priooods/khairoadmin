<template>
  <div class="jamaah-aksi" v-show="show == 3">
      <div class="cursor-pointer md:mt-0 mt-5 hover:text-yellow-500" @click="backpresed">
          <i class='bx bx-left-arrow-alt inline'></i>
          <h2 class="ml-1 inline">Kembali</h2>
      </div>
      <div v-if="checkval == 3" class="mb-7">
        <h1 class="mt-2 hidden md:block">Detail Jamaah</h1>
        <div class="grid md:grid-cols-2 gap-2">
          <div>
            <!-- <div class="mt-3" v-if="detail.bayar !== 'LUNAS'">
              <Button type="primary" block v-show="closeshow == 0" @click="closeshow = 1">Bayar Tagihan</Button>
              <div class="mt-3" v-show="closeshow == 1">
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="bayar" label="Nominal Bayar">
                        <Input type="number" v-model="formInline.bayar" placeholder="Masukan Nominal Bayar"></Input>
                    </FormItem>
                </Form>
                <div class="row mt-3">
                  <Button type="primary" class="col" block @click="bayarr" success>Bayar</Button>
                  <Button type="primary" class="col" block @click="closeshow = 0" danger>Tutup</Button>
                </div>
              </div>
            </div> -->
            <!-- <div class="mt-3" v-if="detail.hotel_id == null">
              <Button type="primary" block v-show="closeshow == 0" @click="callUmrahdetail">Tambah Detail</Button>
              <div class="row" v-show="closeshow == 3">
                <b-form-group id="lay-maskapai" class="col-12 add-style">
                  <label for="maskapai">Pilih Maskapai <span>*</span></label>
                    <b-form-select class="search" v-model="form.maskapai_id"
                        size="sm" required id="maskapai" placeholder="Pilih maskapai Umrah">
                            <b-form-select-option
                                v-for="(data,st) in $store.state.umrah.umrahdetail.maskapai" v-bind:key="st" 
                                :value="data.id">{{data.nama}}
                            </b-form-select-option>
                    </b-form-select>
                </b-form-group>
                <b-form-group id="lay-hotel" class="col-12 add-style">
                  <label for="hotel">Pilih Hotel <span>*</span></label>
                    <b-form-select class="search" v-model="form.hotel_id"
                        size="sm" required id="hotel" placeholder="Pilih hotel Umrah">
                            <b-form-select-option
                                v-for="(data,st) in $store.state.umrah.umrahdetail.hotel" v-bind:key="st" 
                                :value="data.id">{{data.nama}}
                            </b-form-select-option>
                    </b-form-select>
                </b-form-group>
                <div class="col-12 row mt-3">
                  <Button type="primary" class="col" block @click="updatedetails" success>Update</Button>
                  <Button type="primary" class="col" block @click="closeshow = 0" danger>Tutup</Button>
                </div>
              </div>
            </div> -->
            <p class="text-xs font-bold uppercase my-4">Informasi Umum</p>
            <div class="grid grid-cols-2 w-full gap-2">
              <p class="md:text-md text-xs font-semibold">Status Bayar</p>
              <p class="md:text-md text-xs">{{detail.bayar ? detail.bayar : '--'}}</p>
              <p class="md:text-md text-xs font-semibold">Tagihan</p>
              <p class="md:text-md text-xs">{{detail.tagihan ? detail.tagihan : 0 | currency('Rp. ')}}</p>
              <p class="md:text-md text-xs font-semibold">Code</p>
              <p class="md:text-md text-xs">{{detail.code ? detail.code : '--'}}</p>
              <p class="md:text-md text-xs font-semibold">Nama Jamaah</p>
              <p class="md:text-md text-xs">{{detail.nama_lengkap ? detail.nama_lengkap : '---'}}</p>
              <p class="md:text-md text-xs font-semibold">Nama Ayah</p>
              <p class="md:text-md text-xs">{{detail.nama_ayah}}</p>
              <p class="md:text-md text-xs font-semibold">Tempat/Tanggal Lahir</p>
              <p class="md:text-md text-xs">{{detail.ttl}}</p>
              <p class="md:text-md text-xs font-semibold">No KTP</p>
              <p class="md:text-md text-xs">{{detail.no_ktp}}</p>
              <p class="md:text-md text-xs font-semibold">Usia</p>
              <p class="md:text-md text-xs">{{detail.umur ? detail.umur : 0}}</p>
              <p class="md:text-md text-xs font-semibold">No Telepon</p>
              <p class="md:text-md text-xs">{{detail.no_telp}}</p>
              <p class="md:text-md text-xs font-semibold">Gender</p>
              <p class="md:text-md text-xs">{{detail.gender}}</p>
              <p class="md:text-md text-xs font-semibold">Gol Darah</p>
              <p class="md:text-md text-xs">{{detail.darah ? detail.darah : '--'}}</p>
              <p class="md:text-md text-xs font-semibold">Alamat</p>
              <p class="md:text-md text-xs">{{detail.alamat}}</p>
              <p class="md:text-md text-xs font-semibold">Nama Mahram</p>
              <p class="md:text-md text-xs">{{detail.nama_mahram ? detail.nama_mahram : '--'}}</p>
            </div>
            <div class="grid grid-cols-2 w-full gap-2 mt-2" v-show="detail.passport">
                <p class="md:text-md text-xs font-semibold">Nama Passport</p>
                <p class="md:text-md text-xs">{{detail.passport ? detail.passport.nama : '--'}}</p>
                <p class="md:text-md text-xs font-semibold">No Passport</p>
                <p class="md:text-md text-xs">{{detail.passport ? detail.passport.nomor : '--' }}</p>
                <p class="md:text-md text-xs font-semibold">Kota Passport</p>
                <p class="md:text-md text-xs">{{detail.passport ? detail.passport.kota : '--'}}</p>
                <p class="md:text-md text-xs font-semibold">Keluar Passport</p>
                <p class="md:text-md text-xs">{{detail.passport ? detail.passport.tgl_keluar : '--' | moment("DD MMMM YYYY")}}</p>
                <p class="md:text-md text-xs font-semibold">Expired Passport</p>
                <p class="md:text-md text-xs">{{detail.passport ? detail.passport.tgl_keluar : '--' | moment("DD MMMM YYYY")}}</p>
            </div>
          </div>
          <div>
            <p class="text-xs font-bold uppercase my-4">Informasi Pesanan</p>
            <div class="grid grid-cols-2 w-full gap-2" v-show="detail.pesanan">
              <p class="md:text-md text-xs font-semibold">Nama Paket</p>
              <p class="md:text-md text-xs">{{detail.pesanan ? detail.pesanan.umrah.nama : '--'}}</p>
              <p class="md:text-md text-xs font-semibold">Biaya Umrah</p>
              <p class="md:text-md text-xs">{{detail.pesanan ? detail.pesanan.umrah.biaya : '--' | currency('Rp. ')}}</p>
              <p class="md:text-md text-xs font-semibold">Jadwal Berangkat</p>
              <p class="md:text-md text-xs">{{detail.pesanan ? detail.pesanan.jadwal.berangkat : '--' | moment("DD MMMM YYYY")}}</p>
              <p class="md:text-md text-xs font-semibold">Jadwal Pulang</p>
              <p class="md:text-md text-xs">{{detail.pesanan ? detail.pesanan.jadwal.pulang : '--' | moment("DD MMMM YYYY")}}</p>
            </div>
            <p class="text-xs font-bold uppercase my-4">Informasi Berkas</p>
            <div class="grid grid-cols-2 w-full gap-2">
              <p class="md:text-md text-xs font-semibold">Pass Foto</p>
              <p class="md:text-md text-xs font-bold" :class="{'text-red-500' : detail.pasfoto == null, 'text-green-500' : detail.pasfoto != null}">{{detail.pasfoto ? 'Sudah Di Setorkan' : 'Belum Di Setorkan'}}</p>
              <p class="md:text-md text-xs font-semibold">KTP</p>
              <p class="md:text-md text-xs font-bold" :class="{'text-red-500' : detail.ktp == null, 'text-green-500' : detail.ktp != null}">{{detail.ktp ? 'Sudah Di Setorkan' : 'Belum Di Setorkan' }}</p>
              <p class="md:text-md text-xs font-semibold">Kartu Keluarga</p>
              <p class="md:text-md text-xs font-bold" :class="{'text-red-500' : detail.kk == null, 'text-green-500' : detail.kk != null}">{{detail.kk ? 'Sudah Di Setorkan' : 'Belum Di Setorkan'}}</p>
              <p class="md:text-md text-xs font-semibold">Akte Lahir</p>
              <p class="md:text-md text-xs font-bold" :class="{'text-red-500' : detail.akte_lahir == null, 'text-green-500' : detail.akte_lahir != null}">{{detail.akte_lahir ? 'Sudah Di Setorkan' : 'Belum Di Setorkan'}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="checkval == 4">
        <h1 class="mt-2">Jamaah Belum Lunas</h1>
        <div class="row mt-3" v-for="(data,i) in detail" v-bind:key="i">
            <p class="col-md-6 col-4">Nama Jamaah</p>
            <p class="col-md-6 col-8 text-bold">{{ data.jamaah.nama_lengkap}}</p>
            <p class="col-md-6 col-4">No Jamaah</p>
            <p class="col-md-6 col-8 text-bold">{{data.jamaah.code}}</p>
          </div>
      </div>
      <div v-if="checkval == 5">
        <h1 class="mt-2">Jamaah Wanita</h1>
        <div class="row mt-3" v-for="(data,i) in detail" v-bind:key="i">
            <p class="col-md-6 col-4">Nama Jamaah</p>
            <p class="col-md-6 col-8 text-bold">{{ data.nama_lengkap}}</p>
            <p class="col-md-6 col-4">No Jamaah</p>
            <p class="col-md-6 col-8 text-bold">{{data.code}}</p>
          </div>
      </div>
      <div v-if="checkval == 6">
        <h1 class="mt-2">Jamaah Pria</h1>
        <div class="row mt-3" v-for="(data,i) in detail" v-bind:key="i">
            <p class="col-md-6 col-4">Nama Jamaah</p>
            <p class="col-md-6 col-8 text-bold">{{ data.nama_lengkap}}</p>
            <p class="col-md-6 col-4">No Jamaah</p>
            <p class="col-md-6 col-8 text-bold">{{data.code}}</p>
          </div>
      </div>
      <div v-if="checkval == 7">
        <h1 class="mt-2">Berkas Passport Belum Lengkap</h1>
        <div class="row mt-3" v-for="(data,i) in detail" v-bind:key="i">
            <p class="col-md-6 col-4">Nama Jamaah</p>
            <p class="col-md-6 col-8 text-bold">{{ data.nama_lengkap}}</p>
            <p class="col-md-6 col-4">No Jamaah</p>
            <p class="col-md-6 col-8 text-bold">{{data.code}}</p>
          </div>
      </div>
    <!-- <vs-button type="primary" danger>Hapus Paket</vs-button> -->
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import Notifikasi from '../model/Notifikasi';
export default {
    name:"JamaahAksi",
    mixins: [Vue2Filters.mixin, Notifikasi],
    props:{
        data: null,
        show: Number,
        checkval: null
    },
    data() {
      return {
        closeshow: 0,
        closekamar: 0,
        formInline: {
            bayar: '',
        },
        checklog: false,
        ruleInline: {
            bayar: [
                { required: true, message: 'Harap Masukan Nominal Pembayaran', trigger: 'blur' }
            ],
        },
        form:{
          hotel_id: '',
          maskapai_id: '',
          id: ''
        }
      }
    },
    computed:{
        detail(){
            return {...this.data}
        }
    },
    methods: {
      callUmrahdetail(){
        this.closeshow = 3;
        return this.$store.dispatch('umrah/FindUmrah', this.detail.pesanan.umrah_id);
      },
      backpresed(){
        this.closeshow = 0;
        return this.$emit('closeable', 1);
      },
      bayarr(){
        this.helper_loading("Mengirim Pembayaran ..");
        this.$refs['formInline'].validate((valid) => {
            if (valid) {
              this.$store.dispatch('jamaah/BayarJamaah', {id: this.detail.pesanan.id, bayar: this.formInline.bayar})
              this.helper_check_request('Success Pembayaran', 'Pembayaran jamaah telah berhasil dilakukan !');
              this.closeshow = 0;
              return this.backpresed();
            } else {
              this.loading.close();
              return false;
            }
        });
      },
      updatedetails(){
        this.helper_loading("Mengirim Pembayaran ..");
        if(this.form.maskapai_id.length == 0 || this.form.hotel_id == 0){
          this.loading.close();
          return this.helper_global_form_notif();
        } 
        this.form.id = this.detail.pesanan.id;
        this.$store.dispatch('jamaah/PesananUpdate', this.form);
        this.helper_check_request('Success Menambah Detail', 'Pesanan Jamaah berhasil ditambahkan !');
        this.closeshow = 0;
        return this.backpresed();
      }
    },
}
</script>