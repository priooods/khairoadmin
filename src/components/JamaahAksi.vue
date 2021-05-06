<template>
  <div class="jamaah-aksi" v-show="show == 3">
      <div class="cursor-pointer hover:text-yellow-500" @click="backpresed">
          <i class='bx bx-left-arrow-alt inline'></i>
          <h2 class="ml-1 inline">Kembali</h2>
      </div>
      <div v-if="checkval == 3">
        <h1 class="mt-2">Detail Jamaah</h1>
          <div class="mt-3" v-if="detail.bayar !== 'LUNAS'">
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
          </div>
          <div class="mt-3" v-if="detail.hotel_id == null">
            <Button type="primary" block v-show="closeshow == 0" @click="callUmrahdetail">Tambah Detail</Button>
            <div class="row" v-show="closeshow == 3">
              <!-- <b-form-group id="lay-maskapai" class="col-12 add-style">
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
              </b-form-group> -->
              <div class="col-12 row mt-3">
                <Button type="primary" class="col" block @click="updatedetails" success>Update</Button>
                <Button type="primary" class="col" block @click="closeshow = 0" danger>Tutup</Button>
              </div>
            </div>
          </div>
          <div class="row mt-3" v-show="closeshow == 0">
            <p class="col-md-6 mt-2 col-4">Status Bayar</p>
            <p class="col-md-6 mt-2 col-8 text-bold">{{detail.bayar ? detail.bayar : '--'}}</p>
            <p class="col-md-6 mt-2 col-4">Tagihan</p>
            <p class="col-md-6 mt-2 col-8 text-bold">{{detail.tagihan ? detail.tagihan : 0 | currency('Rp. ')}}</p>
            <p class="col-md-6 mt-2 col-4">Code</p>
            <p class="col-md-6 mt-2 col-8">{{detail.code ? detail.code : '--'}}</p>
            <p class="col-md-6 mt-2 col-4">Nama Jamaah</p>
            <p class="col-md-6 mt-2 col-8">{{detail.nama_lengkap ? detail.nama_lengkap : '---' | uppercase}}</p>
            <p class="col-md-6 mt-2 col-4">Nama Ayah</p>
            <p class="col-md-6 mt-2 col-8">{{detail.nama_ayah | uppercase}}</p>
            <p class="col-md-6 mt-2 col-4">Tempat/Tanggal Lahir</p>
            <p class="col-md-6 mt-2 col-8">{{detail.ttl | uppercase}}</p>
            <p class="col-md-6 mt-2 col-4">No KTP</p>
            <p class="col-md-6 mt-2 col-8">{{detail.no_ktp}}</p>
            <p class="col-md-6 mt-2 col-4">Usia</p>
            <p class="col-md-6 mt-2 col-8">{{detail.umur ? detail.umur : 0 | uppercase}} Tahun</p>
            <p class="col-md-6 mt-2 col-4">No Telepon</p>
            <p class="col-md-6 mt-2 col-8">{{detail.no_telp}}</p>
            <p class="col-md-6 mt-2 col-4">Gender</p>
            <p class="col-md-6 mt-2 col-8">{{detail.gender | uppercase}}</p>
            <p class="col-md-6 mt-2 col-4">Gol Darah</p>
            <p class="col-md-6 mt-2 col-8">{{detail.darah ? detail.darah : '--'}}</p>
            <p class="col-md-6 mt-2 col-4">Alamat</p>
            <p class="col-md-6 mt-2 col-8">{{detail.alamat | uppercase}}</p>
            <p class="col-md-6 mt-2 col-4">Nama Mahram</p>
            <p class="col-md-6 mt-2 col-8">{{detail.nama_mahram ? detail.nama_mahram : '--' | uppercase}}</p>
            <div class="col mt-2 row" v-show="detail.passport">
                <p class="col-md-6 mt-2 col-4">Nama Passport</p>
                <p class="col-md-6 mt-2 col-8">{{detail.passport ? detail.passport.nama : '--' | uppercase}}</p>
                <p class="col-md-6 mt-2 col-4">No Passport</p>
                <p class="col-md-6 mt-2 col-8">{{detail.passport ? detail.passport.nomor : '--' }}</p>
                <p class="col-md-6 mt-2 col-4">Kota Passport</p>
                <p class="col-md-6 mt-2 col-8">{{detail.passport ? detail.passport.kota : '--' | uppercase}}</p>
                <p class="col-md-6 mt-2 col-4">Keluar Passport</p>
                <p class="col-md-6 mt-2 col-8">{{detail.passport ? detail.passport.tgl_keluar : '--'}}</p>
                <p class="col-md-6 mt-2 col-4">Tanggal Kadaluarsa Passport</p>
                <p class="col-md-6 mt-2 col-8">{{detail.passport ? detail.passport.tgl_keluar : '--'}}</p>
            </div>
            <div class="col-12 mt-2 row" v-show="detail.pesanan">
                <p class="col-md-6 mt-2 col-4">Nama Paket</p>
                <p class="col-md-6 mt-2 col-8">{{detail.pesanan ? detail.pesanan.umrah.nama : '--'}}</p>
                <p class="col-md-6 mt-2 col-4">Biaya Umrah</p>
                <p class="col-md-6 mt-2 col-8">{{detail.pesanan ? detail.pesanan.umrah.biaya : '--' | currency('Rp. ')}}</p>
                <p class="col-md-6 mt-2 col-4">Jadwal Berangkat</p>
                <p class="col-md-6 mt-2 col-8">{{detail.pesanan ? detail.pesanan.jadwal.berangkat : '--'}}</p>
                <p class="col-md-6 mt-2 col-4">Jadwal Pulang</p>
                <p class="col-md-6 mt-2 col-8">{{detail.pesanan ? detail.pesanan.jadwal.pulang : '--'}}</p>
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