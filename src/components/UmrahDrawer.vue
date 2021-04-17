<template>
  <transition name="fade" mode="out-in">
      <div class="umrahdrawer px-3 py-3" v-show="show">
          <div class="back d-flex justify-content-start col-1" @click="backpresed">
              <i class='bx bx-left-arrow-alt ml-n3'></i>
              <h2 class="ml-1">Tutup</h2>
            </div>
            <p class="my-3">Harap lengkapi semua form yang tersedia pada form dibawah</p>
          <b-form class="row w-100 mt-2">
            <b-form-group id="lay-paket" class="col-md-6 col-12">
                <label for="paket">Nama Paket</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.nama" id="paket" type="text" 
                    required placeholder="Masukan Nama Paket">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-durasi" class="col-md-6 col-12">
                <label for="durasi">Durasi ( Hari )</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.durasi" id="durasi" type="number" 
                    required placeholder="Masukan Durasi Paket">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-jenis_paket" class="col-md-6 col-12">
                <label for="jenis_paket">Nama Jenis Paket</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.jenis_paket" id="jenis_paket" type="text" 
                    required placeholder="Masukan Jenis Paket">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-tahun" class="col-md-6 col-12">
                <label for="tahun">Tahun ( Hijriah )</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.tahun" id="tahun" type="number" 
                    required placeholder="Masukan Tahun">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-kuota" class="col-md-6 col-12">
                <label for="kuota">Kuota Paket ( Jamaah )</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.kuota" id="kuota" type="number" 
                    required placeholder="Masukan Kuota Paket">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-biaya" class="col-md-6 col-12">
                <label for="biaya">Biaya Paket</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.biaya" id="biaya" type="number" 
                    required placeholder="Masukan biaya Paket">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-tanggal_berangkat" class="col-md-6 col-12">
                <label for="tanggal_berangkat">Tanggal Berangkat</label>
                <b-form-datepicker class="search col my-auto" size="sm"
                    v-model="tanggal.tanggal.berangkat" id="tanggal_berangkat"
                    required placeholder="Tanggal Berangkat Umrah">
                </b-form-datepicker>
            </b-form-group>
            <b-form-group id="lay-tanggal_pulang" class="col-md-6 col-12">
                <label for="tanggal_pulang">Tanggal Pulang</label>
                <b-form-datepicker class="search col my-auto" size="sm"
                    v-model="tanggal.tanggal.pulang" id="tanggal_pulang"
                    required placeholder="Tanggal Pulang Umrah">
                </b-form-datepicker>
            </b-form-group>
            <div class="col-md-6 col-12">
                <label >Maskapai</label>
                <div class="row mx-1 mb-2" v-for="(mas, index) in maskapai.maskapai" v-bind:key="'mas' + index">
                    <b-form-select class="col search" v-model="mas.maskapai_id"
                        size="sm" required id="maskapai_paket" placeholder="Pilih Maskapai Paket">
                            <b-form-select-option 
                                v-for="(data,st) in datamaskapai" v-bind:key="st" 
                                :value="data.id">{{data.nama}}
                            </b-form-select-option>
                    </b-form-select>
                    <div class="col-md-1 col-1 my-auto pointers" @click="removemaskapai(index)" v-show="index || (!index && mas.maskapai_id.length > 1)"><i class="bx bx-minus"></i></div>
                    <div class="col-md-1 col-1 my-auto pointers" v-show="index == maskapai.maskapai.length - 1" @click="addmaskapai(index)"><i class="bx bx-plus"></i></div>
                </div> 
            </div>
            <div class="col-md-6 col-12">
                <label>Hotel</label>
                <div class="row mx-1 mb-2" v-for="(data, i) in hotel.hotel" v-bind:key="i">
                    <b-form-select class="col search" v-model="data.hotel_id"
                        size="sm" required id="hotel_paket" placeholder="Pilih Hotel Paket">
                            <b-form-select-option 
                                v-for="(ds,index) in datahotel" v-bind:key="index" 
                                :value="ds.id">{{ds.nama}}
                            </b-form-select-option>
                    </b-form-select>
                    <div class="col-md-1 col-1 my-auto pointers" @click="removehotel(i)" v-show="i || (!i && data.hotel_id.length > 1)"><i class="bx bx-minus"></i></div>
                    <div class="col-md-1 col-1 my-auto pointers" v-show="i == hotel.hotel.length - 1" @click="addhotel(i)"><i class="bx bx-plus"></i></div>
                </div>
            </div>
        </b-form>
        <div class="my-3 d-flex">
            <vs-button size="small" @click="buatumrah">Simpan Paket</vs-button>
            <!-- <vs-button danger size="small">Reset Form</vs-button> -->
        </div>
      </div>
  </transition>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
export default {
    name: "UmrahDrawer",
    mixins: [Notifikasi],
    props:{
        show: Boolean,
        data: null
    },
    data() {
        return {
            hotel:{
                hotel: [
                    { hotel_id: '' }
                ]
            },
            
            maskapai:{
                maskapai: [
                    { maskapai_id: '' }
                ]
            },
            tanggal:{
                tanggal:{
                    berangkat:null,
                    pulang:null
                }
            },
            formsUmrah: {
                nama: null,
                durasi: null,
                jenis_paket: null,
                tahun: null,
                kuota: null,
                biaya: null,
                tanggal: null,
                hotel: null,
                maskapai: null,

            }
        }
    },
    computed:{
        form(){
            return {...this.data};
        },
        datamaskapai(){
            return this.$store.state.umrah.maskapaiall;
        },
        datahotel(){
            return this.$store.state.umrah.hotelall;
        }
    },
    methods: {
        addhotel(){
            return this.hotel.hotel.push({hotel_id: ''})
        },
        removehotel(index){
            return this.hotel.hotel.splice(index, 1);
        },
        addmaskapai(){
            return this.maskapai.maskapai.push({maskapai_id: ''})
        },
        removemaskapai(index){
            return this.maskapai.maskapai.splice(index, 1);
        },
        buatumrah(){
            this.helper_loading("Membuat Paket...");
            if(this.checknull()){
                this.loading.close();
               return this.helper_global_form_notif();
            }
            this.formsUmrah = this.form;
            this.formsUmrah.maskapai = this.maskapai.maskapai;
            this.formsUmrah.hotel = this.hotel.hotel;
            this.formsUmrah.tanggal = this.tanggal.tanggal;
            console.log(this.formsUmrah);
            this.$store.dispatch('umrah/AddUmrah', this.formsUmrah);
            this.helper_check_request("Berhasil Menambah Paket", "Refresh halaman apabila data paket belum ditambahkan pada table");

        },
        backpresed(){
            return this.$emit('tutupumrah', false);
        },
        checknull(){
            return this.form.nama == null ||this.form.durasi == null ||this.form.jenis_paket == null ||this.form.tahun == null ||
                this.form.kuota == null ||this.form.biaya == null;
        }
    },
}
</script>

<style lang="scss">
@import "@/assets/fonts/font.scss";
.umrahdrawer{
  position: fixed;
  right: 0;
  top: 0;
  width: 600px;
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
  .umrahdrawer{
    width: 100%;
  }
}
</style>