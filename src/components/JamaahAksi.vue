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
              <p class="md:text-md text-xs font-semibold">Biaya Kamar</p>
              <p class="md:text-md text-xs">{{detail.pesanan.harga_kamar ? detail.pesanan.harga_kamar : 'Belum Ditambahkan' | currency('Rp. ')}}</p>
              <p class="md:text-md text-xs font-semibold text-red-500">Total Tagihan</p>
              <p class="md:text-md text-xs text-red-500">{{detail.tagihan ? detail.tagihan : '0' | currency('Rp. ')}}</p>
              <p class="md:text-md text-xs font-semibold text-green-500">Pembayaran Masuk</p>
              <p class="md:text-md text-xs text-green-500">{{detail.pesanan.bayar ? detail.pesanan.bayar : '0' | currency('Rp. ')}}</p>
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
              <p class="md:text-md text-xs font-semibold">Buku Nikah</p>
              <p class="md:text-md text-xs font-bold" :class="{'text-red-500' : detail.buku_nikah == null, 'text-green-500' : detail.buku_nikah != null}">{{detail.buku_nikah ? 'Sudah Di Setorkan' : 'Belum Di Setorkan'}}</p>
              <p class="md:text-md text-xs font-semibold">Akte Lahir</p>
              <p class="md:text-md text-xs font-bold" :class="{'text-red-500' : detail.akte_lahir == null, 'text-green-500' : detail.akte_lahir != null}">{{detail.akte_lahir ? 'Sudah Di Setorkan' : 'Belum Di Setorkan'}}</p>
              <p class="md:text-md text-xs font-semibold">Bukti Vaksin</p>
              <p class="md:text-md text-xs font-bold" :class="{'text-red-500' : detail.vaksin == null, 'text-green-500' : detail.vaksin != null}">{{detail.vaksin ? 'Sudah Di Setorkan' : 'Belum Di Setorkan'}}</p>
            </div>
            <div class="mt-5">
              <div v-show="showing.kamar">
                <Form class="md:w-3/6" ref="formkamar" :model="formkamar" :rules="ruleskamar">
                  <FormItem prop="harga_kamar" label="Harga Kamar">
                    <Input v-model="formkamar.harga_kamar" type="number" placeholder="tambahkan harga kamar"/>
                  </FormItem>
                </Form>
                <div class="flex mt-2">
                  <Button type="primary" class="mr-1" @click="bayarkamar">Simpan</Button>
                  <Button type="error" class="ml-1" @click="showing.kamar = false">Batal</Button>
                </div>
              </div>
              <div v-show="showing.bayar">
                <Form class="md:w-3/6" ref="formbayar" :model="formbayar" :rules="rulesbayar">
                  <FormItem prop="bayar" label="Bayar Tagihan">
                    <Input v-model="formbayar.bayar" type="number" placeholder="tambahkan biaya pembayaran umrah"/>
                  </FormItem>
                </Form>
                <div class="flex mt-2">
                  <Button type="primary" class="mr-1" @click="bayartagihan">Simpan</Button>
                  <Button type="error" class="ml-1" @click="showing.bayar = false">Batal</Button>
                </div>
              </div>
              <div class="grid md:grid-cols-3 grid-cols-1 md:w-5/6 gap-2 mt-3">
                <Button type="error" @click="deleteshow = !deleteshow" >Hapus Data</Button>
                <Button type="info" @click="showing.berkas = !showing.berkas" >Simpan Berkas</Button>
                <Button type="success" @click="showing.bayar = true" v-if="detail.bayar === 'BELUM LUNAS' && showing.bayar == false && showing.kamar == false">Bayar Umrah</Button>
                <Button type="primary" @click="showing.kamar = true" v-if="detail.pesanan.harga_kamar == null && showing.bayar == false && showing.kamar == false">Atur Harga Kamar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
          v-model="showing.berkas"
          title="Update Berkas"
          @on-ok="updatejamaah"
          okText="SImpan">
          <p class="text-xs font-semibold">Check apabila berkas jamaah sudah disetorkan dan sudah anda terima</p>
          <div class="mt-4 grid grid-cols-1 gap-2">
            <Checkbox v-model="berkas.kk">Berkas Kartu Keluarga</Checkbox>
            <Checkbox v-model="berkas.ktp">Berkas Kartu Tanda Penduduk</Checkbox>
            <Checkbox v-model="berkas.pasfoto">Berkas Pass Foto 4x6 5 lembar</Checkbox>
            <Checkbox v-model="berkas.akte_lahir">Berkas Akte Lahir</Checkbox>
            <Checkbox v-model="berkas.vaksin">Berkas Bukti Vaksin</Checkbox>
            <Checkbox v-model="berkas.buku_nikah">Berkas Buku Nikah</Checkbox>
          </div>
      </Modal>
      <Modal
          v-model="deleteshow"
          title="Hapus Jamaah"
          okText="Hapus"
          @on-ok="hapusjamaah"
          width="300">
          <p class="text-xs font-semibold">Apakah anda yakin ingin menghapus data jamaah ?</p>
          <p class="text-xs mt-2">Semua data jamaah yang dihapus akan mengubah semua data yang terhubung dengan data jamaah</p>
      </Modal>
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
        deleteshow: false,
        berkas: {
          kk: false,
          ktp: false,
          akte_lahir: false,
          pasfoto: false,
          vaksin: false,
          buku_nikah: false,
          id: ''
        },
        showing: {
          kamar: false,
          bayar: false,
          berkas: false
        },
        formkamar: {
          id: '',
          harga_kamar: '',
        },
        formbayar: {
          id: '',
          bayar: '',
        },
        ruleskamar:{
          harga_kamar: [
            { required: true, message: 'Harap Masukan Harga Kamar', trigger: 'blur' },
            { type: 'string', min: 5, message: 'Min 5 Char', trigger: 'blur' }
          ]
        },
        rulesbayar:{
          bayar: [
            { required: true, message: 'Harap Masukan Nominal Pembayaran', trigger: 'blur' },
            { type: 'string', min: 5, message: 'Min 5 Char', trigger: 'blur' }
          ]
        },
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
      bayartagihan(){
        this.helper_loading("Mengirim Pembayaran ..");
        this.$refs['formbayar'].validate((valid) => {
            if (valid) {
              this.formbayar.id = this.detail.pesanan.id;
              this.$store.dispatch('jamaah/BayarJamaah', this.formbayar)
              return this.helper_check_request('Success Pembayaran', 'Pembayaran jamaah telah berhasil dilakukan !');
              
            } else {
              this.loading.close();
              return false;
            }
        });
      },
      bayarkamar(){
        this.helper_loading("Mengirim Harga Kamar ..");
        this.$refs['formkamar'].validate((valid) => {
          if(valid){
            this.formkamar.id = this.detail.pesanan.id;
            this.$store.dispatch('jamaah/PesananUpdate', this.formkamar);
            return this.helper_check_request('Berhasil Menambah Harga', 'Harga kamar berhasil ditambahkan, Refresh ulang halaman untuk melihat data terbaru!');
          } else {
            this.loading.close();
            return false;
          }
        })
      },
      hapusjamaah(){
        this.helper_loading("Menghapus Jamaah ..");
        this.$store.dispatch('jamaah/HapusJamaah', this.detail.id);
        return this.helper_check_request('Berhasil Menghapus Jamaah', 'Refresh ulang halaman untuk mendapatkan data terbaru');
          
      },
      updatejamaah(){
        this.helper_loading("Menyimpan Berkas ..");
        this.berkas.id = this.detail.id;
        this.$store.dispatch('jamaah/UpdateJamaah', this.berkas);
        return this.helper_check_request('Success Menyimpan Berkan', 'Informasi Berkas sudah berhasil disimpan !');
      }
    },
}
</script>