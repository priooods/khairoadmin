<template>
  <div class="jamaah views px-3">
        <div v-show="!showform">
            <h1>Jamaah</h1>
            <div class="row mt-3">
                <div class="mt-2 col-md-2 mx-2 bg h-100">
                    <p>Total Keseluruhan Jamaah Gender Pria</p>
                    <h5 class="d-flex">{{pria.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="mt-2 col-md-2 mx-2 bg h-100">
                    <p>Total Keseluruhan Jamaah Gender Wanita</p>
                    <h5 class="d-flex">{{perempuan.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="mt-2 col-md-2 mx-2 bg h-100">
                    <p>Total Semua Jamaah yang belum lunas</p>
                    <h5 class="d-flex">{{bayar.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="mt-2 col-md-2 mx-2 bg h-100">
                    <p>Total Jamaah Belum Lengkap Berkas</p>
                    <h5 class="d-flex">{{berkas.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
            </div>
            <div class="d-flex justify-content-end my-2">
                <vs-button size="small" @click="showform =!showform">Tambah Jamaah Baru</vs-button>
            </div>
            <div class="bg mt-4">
                <p>Tap pada item untuk melihat detail dari jamaah</p>
                <div class="tables">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Code</th>
                                <th>No KTP</th>
                                <th>Nama Lengkap</th>
                                <th>Nama Ayah</th>
                                <th>Gender</th>
                                <th>Darah</th>
                                <th>No Telp</th>
                                <th>Kota</th>
                                <th>Provinsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data,i) in $store.state.jamaah.jamaahall" v-bind:key="i">
                                <td data-label="No">{{i + 1}}</td>
                                <td data-label="Code">{{data.code}}</td>
                                <td data-label="No KTP">{{data.no_ktp}}</td>
                                <td data-label="Nama Lengkap">{{data.nama_lengkap}}</td>
                                <td data-label="Nama Ayah">{{data.nama_ayah}}</td>
                                <td data-label="Gender">{{data.gender}}</td>
                                <td data-label="Darah">{{data.darah ? data.darah : '--'}}</td>
                                <td data-label="No Telp">{{data.no_telp}}</td>
                                <td data-label="Kota">{{data.kota}}</td>
                                <td data-label="Provinsi">{{data.provinsi}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          <!-- <div class="bg mt-3">
                <div class="col">
                    <div class="row justify-content-end">
                        <p class="mr-auto col">Lihat Semua data jamaah dalam table <br>Tap pada item untuk melihat detail dari Jamaah</p>
                        <div class="col-md-2">
                            <vs-button size="small">Tambah Jamaah</vs-button>
                        </div>
                    </div>
                    <div class="tables">
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Code</th>
                                    <th>No KTP</th>
                                    <th>Nama Lengkap</th>
                                    <th>TTL</th>
                                    <th>Gender</th>
                                    <th>Paket Umrah</th>
                                    <th>Mitra</th>
                                    <th>No Telp</th>
                                    <th>Kota</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
          </div> -->
      </div>
      <JamaahForm 
      @closeable="tutupform"
      :show.sync="showform"></JamaahForm>
  </div>
</template>

<script>
import JamaahForm from '../components/JamaahDrawer';
export default {
    components:{JamaahForm},
    name: "Jamaah",
    data() {
        return {
            showform: false
        }
    },
    computed:{
        perempuan(){
            return this.$store.state.jamaah.jamaahall.filter((as) => {
                return as.gender == 'Wanita'
            })
        },
        pria(){
            return this.$store.state.jamaah.jamaahall.filter((as) => {
                return as.gender == 'Pria'
            })
        },
        //BELUM LUNAS
        berkas(){
            return this.$store.state.jamaah.jamaahall.filter((as) => {
                return as.passport == null
            })
        },
        bayar(){
            return this.$store.state.jamaah.jamaahall.filter((as) => {
                return as.bayar == "BELUM LUNAS"
            })
        }
    },
    mounted(){
        this.$store.dispatch('jamaah/Alljamaah');
        
    },
    methods: {
        tutupform(){
            return this.showform = false;
        }
    },
}
</script>

<style lang="scss">
.views{
    height: 100vh !important;
}
</style>