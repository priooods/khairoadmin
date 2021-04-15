<template>
    <transition name="fade" mode="out-in">
        <div class="cabangdrawer py-3 px-3" v-show="show">
          <div class="back d-flex justify-content-start col-1" @click="backpresed">
              <i class='bx bx-left-arrow-alt ml-n3'></i>
              <h2 class="ml-1">Tutup</h2>
          </div>
          <h1 class="mt-3">{{type == 1 ? "Tambah Cabang Baru" : type == 2 ? "Update Cabang" : "Detail Cabang" }}</h1>
          <p>{{type == 1 ? "Harap masukan semua data dengan lengkap untuk membuat data baru" 
                : type == 2 ? "Harap tetap masukan semua data untuk melakukan update profile" : "Detail lengkap dari data cabang"}}</p>
          <div class="mt-3" v-if="type == 1 || type == 2">
            <b-form class="w-100">
              <b-form-group id="lay-name">
                <label for="name">Nama Cabang</label>
                <b-form-input class="search" size="sm" 
                  v-model="form.name" id="name" type="text" 
                  required placeholder="Masukan Nama Cabang">
                </b-form-input>
              </b-form-group>
              <b-form-group id="lay-kota">
                <label for="kota">Kota Cabang</label>
                <b-form-input class="search" size="sm" 
                  v-model="form.kota" id="kota" type="text" 
                  required placeholder="Lokasi Kota Cabang">
                </b-form-input>
              </b-form-group>
              <b-form-group id="lay-provinsi">
                <label for="provinsi">Provinsi Cabang</label>
                <b-form-input class="search" size="sm" 
                  v-model="form.provinsi" id="provinsi" type="text" 
                  required placeholder="Lokasi Provinsi Cabang">
                </b-form-input>
              </b-form-group>
              <b-form-group id="lay-alamat">
                <label for="alamat">Alamat Lengkap</label>
                <b-form-textarea class="search" size="sm" 
                  v-model="form.alamat" id="alamat" type="text" 
                  required placeholder="Alamat Lengkap lokasi Cabang">
                </b-form-textarea>
              </b-form-group>
            </b-form>
          </div>
          <div class="row justify-content-center" v-if="type == 3 ">
              <vs-button size="small" class="col-10" @click="type = 2">Perbaharui data</vs-button>
            </div>
          <div class="mt-3 w-100" v-if="type == 3 || type == 4">
            <div class="row">
              <p class="col-md-4">Nama Cabang</p>
              <p class="col-md-8">{{form.name}}</p>
              <p class="col-md-4">Code</p>
              <p class="col-md-8">{{form.code}}</p>
              <p class="col-md-4">Kota</p>
              <p class="col-md-8">{{form.kota}}</p>
              <p class="col-md-4">Provinsi</p>
              <p class="col-md-8">{{form.provinsi}}</p>
              <p class="col-md-4">Alamat</p>
              <p class="col-md-8">{{form.alamat}}</p>
            </div>
            <p class="mt-2">Mitra Terdaftar</p>
            <div v-if="form.mitra">
              <ul v-for="(dt, i) in form.mitra" v-bind:key="i" class="list-unstyled">
                <li class="row">
                  <p class="col-md-4">No</p>
                  <p class="col-md-8">{{i + 1}}</p>
                </li>
                <li class="row">
                  <p class="col-md-4">Code</p>
                  <p class="col-md-8">{{dt.code}}</p>
                </li>
                <li class="row">
                  <p class="col-md-4">Nama</p>
                  <p class="col-md-8">{{dt.fullname}}</p>
                </li>
                <li class="row">
                  <p class="col-md-4">No Tlp</p>
                  <p class="col-md-8">{{dt.no_tlp}}</p>
                </li>
                <li class="row">
                  <p class="col-md-4">Alamat</p>
                  <p class="col-md-8">{{dt.alamat}}</p>
                </li>
              </ul>
            </div>
            <p v-else class="text-uppercase text-bold">tidak ada mitra terdaftar pada cabang</p>
          </div>
          <div class="row" v-if="type == 2">
            <vs-button danger v-if="$store.state.operat.user.type == 'SuperUser'|| $store.state.operat.user.type == 'SuperExtra'" 
                class="col-md mx-3 buton"
                @click="deleted">Hapus Cabang</vs-button>
            <vs-button warn v-if="$store.state.operat.user.type == 'SuperUser' || $store.state.operat.user.type == 'Admin'|| $store.state.operat.user.type == 'SuperExtra'" 
                class="col-md mx-3 buton"
                @click="updatecabang">Update Cabang</vs-button>
          </div>
          <div class="row" v-if="type == 1">
            <vs-button primary class="col mx-3 buton" @click="addnew">Tambah Pengguna</vs-button>
          </div>
        </div>
    </transition>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
export default {
    name: "CabangDrawer",
    mixins: [Notifikasi],
    props: {
        show: Boolean,
        type: Number,
        data: null,
    },
    computed:{
        form(){
            return {...this.data}
        }
    },
    methods:{
        backpresed(){
            return this.$emit('closeable', false);
        },
        addnew(){
          this.helper_loading("Menambah Data Cabang...");
          if (this.checknull()) {
            return this.helper_global_form_notif();
          }
          this.$store.dispatch('mitra/AddCabang', this.form);
          this.helper_check_request("Berhasil Menambah Cabang", "Refresh halaman apabila data cabang belum ditambahkan pada table");
          return this.backpresed();
        },
        checknull(){
          return this.form.name == null || this.form.kota == null || this.form.provinsi == null 
              || this.form.alamat == null
              || this.form.name == 0 || this.form.kota == 0 || this.form.provinsi == 0 
              || this.form.alamat == 0 
        },
        updatecabang(){
          this.helper_loading("Mengganti Data Cabang...");
          if (this.checknull()) {
            return this.helper_global_form_notif();
          }
          this.$store.dispatch('mitra/UpdateCabang', this.form);
          this.helper_check_request("Berhasil Mengganti Data Cabang", "Refresh halaman apabila data cabang belum terupdate pada table");
          return this.backpresed();
        },
        deleted(){
          this.helper_loading("Menghapus Data Cabang...");
          this.$store.dispatch('mitra/DeleteCabang', this.form);
          this.helper_check_request("Berhasil Menghapus Cabang", "Refresh halaman apabila data cabang belum terhapus pada table");
          return this.backpresed();
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/fonts/font.scss";
.cabangdrawer{
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
  .cabangdrawer{
    width: 100%;
  }
}
</style>