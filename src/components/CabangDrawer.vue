<template>
  <div class="py-3 px-3" v-show="show">
    <div class="cursor-pointer hover:text-red-500" @click="backpresed">
        <i class='bx bx-left-arrow-alt inline'></i>
        <h2 class="ml-2 inline">Tutup</h2>
    </div>
    <h1 class="mt-3">{{type == 1 ? "Tambah Cabang Baru" : type == 2 ? "Update Cabang" : "Detail Cabang" }}</h1>
    <p>{{type == 1 ? "Harap masukan semua data dengan lengkap untuk membuat data baru" 
          : type == 2 ? "Harap tetap masukan semua data untuk melakukan update profile" : "Detail lengkap dari data cabang"}}</p>
    <div class="mt-3" v-if="type == 1 || type == 2">
      <Form class="md:w-2/6 w-full" :model="form">
        <FormItem class="add-style" label="Nama Cabang">
          <Input class="search" 
            v-model="form.name" id="name" type="text" 
            placeholder="Masukan Nama Cabang">
          </Input>
        </FormItem>
        <FormItem class="add-style" label="Kota Cabang">
          <Input class="search" 
            v-model="form.kota" id="kota" type="text" 
            placeholder="Lokasi Kota Cabang">
          </Input>
        </FormItem>
        <FormItem class="add-style" label="Provinsi Cabang">
          <Input class="search" 
            v-model="form.provinsi" id="provinsi" type="text" 
            placeholder="Lokasi Provinsi Cabang">
          </Input>
        </FormItem>
        <FormItem class="add-style" label="Alamat Langkap">
          <Input class="search" 
            v-model="form.alamat" :autosize="true" type="textarea" 
            placeholder="Alamat Lengkap lokasi Cabang">
          </Input>
        </FormItem>
      </Form>
    </div>
    <div class="mt-3 md:grid grid-cols-2 gap-2" v-if="type == 3 || type == 4">
      <div class="block sticky top-10">
        <div class="mt-3 md:hidden" v-if="type == 3 ">
          <Button type="primary" @click="type = 2">Perbaharui data</Button>
        </div>
        <p class="font-bold text-md mt-3">Informasi Cabang</p>
        <div class="grid grid-cols-2 gap-2 mt-3">
          <p class="font-semibold">Nama Cabang</p>
          <p class="col-md-8">{{form.name}}</p>
          <p class="font-semibold">Code</p>
          <p class="col-md-8">{{form.code}}</p>
          <p class="font-semibold">Kota</p>
          <p class="col-md-8">{{form.kota}}</p>
          <p class="font-semibold">Provinsi</p>
          <p class="col-md-8">{{form.provinsi}}</p>
          <p class="font-semibold">Alamat</p>
          <p class="col-md-8">{{form.alamat}}</p>
        </div>
        <div class="mt-3 hidden md:block" v-if="type == 3 ">
          <Button type="primary" @click="type = 2">Perbaharui data</Button>
        </div>
      </div>
      <div v-if="form.mitra">
        <p class="mt-3 text-md font-bold">Perwakilan Terdaftar</p>
        <div v-for="(dt, i) in form.mitra" v-bind:key="i" class="list-unstyled">
          <div class="grid grid-cols-2 gap-1 mt-3">
            <p class="col-md-4 font-semibold">No</p>
            <p class="col-md-8 text-red-500">{{i + 1}}</p>
            <p class="font-semibold">Code</p>
            <p class="col-md-8">{{dt.code}}</p>
            <p class="font-semibold">Nama</p>
            <p class="col-md-8">{{dt.fullname}}</p>
          </div>
        </div>
      </div>
      <p v-else class="text-uppercase text-bold">tidak ada mitra terdaftar pada cabang</p>
    </div>
    <div v-if="type == 2">
      <Button type="error" v-if="$store.state.operat.user.type == 'SuperUser'|| $store.state.operat.user.type == 'SuperExtra'" @click="deleted">Hapus Cabang</Button>
      <Button type="info" class="ml-2" v-if="$store.state.operat.user.type == 'SuperUser' || $store.state.operat.user.type == 'Admin'|| $store.state.operat.user.type == 'SuperExtra'" @click="updatecabang">Update Cabang</Button>
    </div>
    <Button v-if="type == 1" type="primary" @click="addnew">Tambah Cabang</Button>
  </div>
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