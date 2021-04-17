<template>
    <transition name="fade" mode="out-in">
        <div class="hotel py-3 px-3" v-show="show">
            <div class="back d-flex justify-content-start col-1" @click="backpresed">
              <i class='bx bx-left-arrow-alt ml-n3'></i>
              <h2 class="ml-1">Tutup</h2>
            </div>
            <div class="mt-3">
                <b-form class="w-100 row mt-2">
                    <b-form-group id="lay-nama-hotel" class="col-12">
                        <label for="nama-hotel">Nama Hotel</label>
                        <b-form-input class="search" size="sm" 
                            v-model="form.nama" id="nama-hotel" type="text" 
                            required placeholder="Masukan Nama Hotel">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="lay-nama-kota" class="col-12">
                        <label for="nama-kota">Nama Kota</label>
                        <b-form-input class="search" size="sm" 
                            v-model="form.kota" id="nama-kota" type="text" 
                            required placeholder="Masukan Kota Hotel">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="lay-alamat-kota" class="col-12">
                        <label for="alamat-kota">Alamat</label>
                        <b-form-input class="search" size="sm" 
                            v-model="form.alamat" id="alamat-kota" type="text" 
                            required placeholder="Masukan Alamat Hotel">
                        </b-form-input>
                    </b-form-group>
                </b-form>
                <div class="d-flex justify-content-start" v-if="data == null">
                    <vs-button size="small" @click="simpan">Simpan</vs-button>
                    <vs-button danger size="small" @click="resets">Reset</vs-button>
                </div>
                <div class="d-flex justify-content-start" v-else>
                    <vs-button danger size="small" @click="deleted">Delete</vs-button>
                    <vs-button size="small" @click="editing">Simpan Edit</vs-button>
                </div>
            </div>
            
        </div>
    </transition>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
export default {
    name: "hotel",
    mixins: [Notifikasi],
    props:{
        show: Boolean,
        data:null,
    },
    data() {
        return {
            formediting:{
                id: null,
                nama: null,
                kota: null,
                alamat: null
            }
        }
    },
    computed: {
        form(){
            return {...this.data};
        }
    },
    methods:{
        backpresed(){
            return this.$emit('closeable', false);
        },
        simpan(){
            this.helper_loading("Menyimpan Hotel..")
            if(this.form.nama == null || this.form.alamat == null ||this.form.kota == null ) {
                this.loading.close();
                return this.helper_global_form_notif();
            } 
            this.$store.dispatch('umrah/AddHotel', this.form);
            return this.helper_check_request("Berhasil Menyimpan Hotel", "Hotel baru berhasil disimpan. Refresh ulang halaman apabila data pada table belum bertambah");
        },
        deleted(){
            this.helper_loading("Menghapus Hotel...");
            this.$store.dispatch('umrah/DeleteHotel', this.data.id);
            return this.helper_check_request("Berhasil Mengirim Permintaan", "Hotel berhasil dihapus, refresh halaman apabila data belum hilang pada table");
        },
        editing(){
            this.formediting.id = this.data.id;
            this.formediting.nama = this.form.nama;
            this.formediting.kota = this.form.kota;
            this.formediting.alamat = this.form.alamat;
            this.helper_loading("Mengupdate Hotel..")
            if(this.form.nama == null || this.form.alamat == null ||this.form.kota == null ) {
                this.loading.close();
                return this.helper_global_form_notif();
            } 
            this.$store.dispatch('umrah/UpdateHotel', this.formediting);
            return this.helper_check_request("Berhasil Mengubah Hotel", "Hotel berhasil diubah. Refresh ulang halaman apabila data pada table belum berubah");
        

        },
        resets(){
            this.form.alamat = null
            this.form.nama = null
            this.form.kota = null
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/fonts/font.scss";
.hotel{
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
  .hotel{
    width: 100%;
  }
}
</style>