<template>
  <transition name="fade" mode="out-in">
    <div class="userview py-3 px-3" v-show="show">
      <div class="back d-flex justify-content-start col-1" @click="backpresed">
        <i class='bx bx-left-arrow-alt ml-n3'></i>
        <h2 class="ml-1">Tutup</h2>
      </div>
      <h1 class="mt-3">{{type == 1 ? "Buat Pengguna Baru" : type == 2 ? "Details Pengguna" : "Update Profile" }}</h1>
      <p>{{type == 1 ? "Harap masukan semua data dengan lengkap untuk membuat data baru" 
        : type == 2 ? "Update pengguna apabila diperlukan" : "Harap masukan semua data untuk melakukan update profile"}}</p>
      <b-form class="mt-3 w-100">
        <b-form-group id="lay-username">
            <label for="username">Username</label>
            <b-form-input size="sm" v-model="forms.username" id="username" type="text" required placeholder="Masukan Username">
            </b-form-input>
        </b-form-group>
        <b-form-group id="lay-password">
            <label for="password">Password</label>
            <b-form-input size="sm" v-model="forms.password" id="password" type="password" required placeholder="Masukan Password">
            </b-form-input>
        </b-form-group>
        <b-form-group id="lay-fullname">
            <label for="fullname">Fullname</label>
            <b-form-input size="sm" v-model="forms.fullname" id="fullname" type="text" required placeholder="Masukan Nama Lengkap">
            </b-form-input>
        </b-form-group>
        <b-form-group id="lay-jabatan">
            <label for="jabatan">Jabatan</label>
            <b-form-input size="sm" v-model="forms.jabatan" id="jabatan" type="text" required placeholder="Masukan Jabatan Pengguna">
            </b-form-input>
        </b-form-group>
        <b-form-group id="lay-type" 
        v-if="$store.state.operat.user.type == 'SuperUser' || $store.state.operat.user.type == 'SuperExtra'">
            <label for="type">Access</label>
            <b-form-select v-model="forms.type" 
              :options="$store.state.operat.user.type == 'SuperExtra' ? options 
              : $store.state.operat.user.type == 'SuperUser'? options2 : options3" 
              size="sm" required id="type" placeholder="Masukan Access Pengguna"></b-form-select>
        </b-form-group>
      </b-form>
      <div class="row" v-if="type == 2">
        <vs-button danger v-if="$store.state.operat.user.type == 'SuperUser'|| $store.state.operat.user.type == 'SuperExtra'" 
            class="col-md mx-3 buton"
            @click="deleted">Hapus Pengguna</vs-button>
        <vs-button warn v-if="$store.state.operat.user.type == 'SuperUser'|| $store.state.operat.user.type == 'SuperExtra'" 
            class="col-md mx-3 buton"
            @click="updated">Update Pengguna</vs-button>
      </div>
      <div class="row" v-if="type == 3">
        <vs-button primary class="col mx-3 buton" @click="updated">Updated Pengguna</vs-button>
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
    name: "UserView",
    props: {
      show: Boolean,
      datauser: null,
      type: Number
    },
    mixins: [Notifikasi],
    data(){
      return {
        options: [
          { value: 'Admin', text: 'Admin' },
          { value: 'Operator', text: 'Operator' },
          { value: 'SuperExtra', text: 'SuperExtra' },
          { value: 'SuperUser', text: 'SuperUser'}
        ],
        options2: [
          { value: 'Admin', text: 'Admin' },
          { value: 'Operator', text: 'Operator' },
          { value: 'SuperUser', text: 'SuperUser'}
        ],
        options3: [
          { value: 'Admin', text: 'Admin' },
          { value: 'Operator', text: 'Operator' },
        ],
        validasi: {
          username: null,
          password: null,
          fullname: null,
          jabatan: null,
          type: null
        },
      }
    },
    computed:{
      forms(){
        return {...this.datauser}
      }
    },
    methods:{
      backpresed(){
        return this.$emit('closeable', false);
      },
      updated() {
        this.helper_loading("Mengirim Permintaan Update..");
        if (this.checknull()) {
          this.loading.close();
          this.notif();
        }
        this.$store.dispatch("operat/updateOperator", this.forms);
        return this.helper_check_request('success', 3000, 'top-right','Berhasil Melakukan Update !',
         'Pengguna berhasil di update, kembali untuk melihat data terbaru')
      },
      deleted(){
        this.helper_loading("Mengirim Permintaan Hapus..");
        if (this.checknull()) {
          this.notif();
        }
        this.$emit('deleteuser', this.datauser.username);
        this.$store.dispatch("operat/deleteOperator", this.datauser.username);
        return this.helper_check_request('success', 3000, 'top-right','Berhasil Menghapus Pengguna !',
         'Pengguna berhasil di hapus, kembali untuk melihat data terbaru');
      },
      addnew(){
        this.helper_loading("Mengirim Permintaan Pengguna Baru..");
        if (this.checknull()) {
          this.notif();
        }
        this.$store.dispatch("operat/addoperator", this.forms);
        this.$store.dispatch("operat/allOperator");
        return this.helper_check_request('success', 3000, 'top-right','Berhasil Menambah Pengguna Baru !',
         'Pengguna baru berhasil di simpan, kembali untuk melihat data terbaru');
      },
      checknull(){
        return this.forms.password == null || this.forms.username == null || this.forms.fullname == null || this.forms.type == null || this.forms.jabatan == null 
        || this.forms.password == 0 || this.forms.username == 0 || this.forms.fullname == 0 || this.forms.type == 0 
        || this.forms.jabatan == 0
      },
      notif(){
        return this.$vs.notification({
          color: "danger",
          duration: 5000,
          position: "top-left",
          title: "Gagal melakukan permintaan",
          text: "Harap lengkapi semua form yang tersedia untuk melakukan aksi !",
        });
      }
    },
    mounted() {
    },
}
</script>

<style lang="scss">
@import "@/assets/fonts/font.scss";
.userview{
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
  .userview{
    width: 100%;
  }
}
</style>