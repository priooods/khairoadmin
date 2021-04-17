<template>
  <div class="jamaah views px-3">
        <div v-show="!showform">
            <h1>Jamaah</h1>
            <div class="row mt-3">
                <div class="mt-2 col-md mx-2 bg">
                    <p>Total Keseluruhan Jamaah Pria</p>
                    <h5 class="d-flex">{{pria.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="mt-2 col-md mx-2 bg">
                    <p>Total Keseluruhan Jamaah Wanita</p>
                    <h5 class="d-flex">{{perempuan.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="mt-2 col-md mx-2 bg cursor" @click="showdetailss">
                    <p>Total Jamaah yang belum lunas</p>
                    <h5 class="d-flex">{{bayar.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="mt-2 col-md mx-2 bg">
                    <p>Total Jamaah Belum Lengkap Berkas</p>
                    <h5 class="d-flex">{{berkas.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
            </div>
            <div class="d-flex justify-content-end my-2">
                <vs-button size="small" @click="showform =!showform">Tambah Jamaah Baru</vs-button>
            </div>
            <div class="bg mt-4">
                <div class="position-relative">
                      <div class="row justify-content-start">
                          <!-- <p class="my-auto mr-auto">Tap pada item untuk melihat detail dari jamaah</p> -->
                      <download-excel
                            class="btn btn-default"
                            :data="json_data"
                            :fields="json_fields"
                            worksheet="My Worksheet"
                            name="Manifest Jamaah.xls"
                        >
                        <vs-button size="small">Download Excel</vs-button>
                        </download-excel>
                      </div>
                      <b-form-input class="search mt-2 mb-3 w-100" size="sm" v-model="searching" type="text" placeholder="Cari Nama Jamaah ..."></b-form-input>
                <div>
                    <div class="tables">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nomer Jamaah</th>
                                <th>NIK</th>
                                <th>Nama Lengkap</th>
                                <th>Gender</th>
                                <th>Tempat Lahir</th>
                                <th>No Telp</th>
                                <th>Usia</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data,i) in filteredUmrah" v-bind:key="i" @click="showdetails(data)">
                                <td data-label="No">{{i + 1}}</td>
                                <td data-label="Nomer Jamaah">{{data.code | uppercase}}</td>
                                <td data-label="NIK">{{data.no_ktp | uppercase}}</td>
                                <td data-label="Nama Lengkap">{{data.nama_lengkap | uppercase}}</td>
                                <td data-label="Gender">{{data.gender ? data.gender : '--' | uppercase}}</td>
                                <td data-label="Tempat Lahir">{{data.ttl | uppercase}}</td>
                                <td data-label="No Telp">{{data.no_telp | uppercase}}</td>
                                <td data-label="Usia">{{data.usia | uppercase}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
                </div>
            </div>
      </div>
      <JamaahForm 
      @closeable="tutupform"
      :show.sync="showform"></JamaahForm>
      <JamaahDetail
      @closeable="tutupdetail"
      :checkval.sync="checkopen"
      :show.sync="showdetail"
      :data.sync="detailjamaah"
      ></JamaahDetail>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import Excel from '../model/Excel';
import JamaahDetail from '../components/JamaahAksi';
import JamaahForm from '../components/JamaahDrawer';
export default {
    components:{JamaahForm,JamaahDetail},
    mixins: [Vue2Filters.mixin, Excel],
    name: "Jamaah",
    data() {
        return {
            showform: false,
            showdetail:false,
            databelumbayar: [],
            detailjamaah: [],
            searching: '',
            checkopen: 1,
        }
    },
    computed:{
        perempuan(){
            return this.$store.state.jamaah.jamaahall.filter((as) => {
                return as.gender === "Wanita"
            })
        },
        pria(){
            return this.$store.state.jamaah.jamaahall.filter((as) => {
                return as.gender === "Pria"
            })
        },
        berkas(){
            return this.$store.state.jamaah.jamaahall.filter((as) => {
                return as.passport == null
            })
        },
        bayar(){
            return this.$store.state.jamaah.jamaahall.filter((as) => {
                return as.bayar == "BELUM LUNAS"
            })
        },
        listJamaah(){
            return this.$store.state.jamaah.jamaahall;
        },
      filteredUmrah() {
        const search = this.searching.toLowerCase().trim();
        if (!search) return this.listJamaah;
        return this.listJamaah.filter(c => c.nama_lengkap.toLowerCase().indexOf(search) > -1);
      },
    },
    mounted(){
        this.$store.dispatch('jamaah/Alljamaah');
        this.$store.dispatch('jamaah/JamaahBelumBayar');
    },
    methods: {
        tutupform(){
            return this.showform = false;
        },
        tutupdetail(){
            return this.showdetail = false;
        },
        showdetails(value){
            console.log(value);
            this.checkopen = 1;
            this.showdetail = true;
            return this.detailjamaah = value;
        },
        showdetailss(){
            this.showdetail = true;
            this.checkopen = 2;
            console.log(this.$store.state.jamaah.jamaahbayar);
            return this.detailjamaah = this.$store.state.jamaah.jamaahbayar;
        }
    },
}
</script>

<style lang="scss">
.views{
    height: 100vh;
    .cursor{
        cursor: pointer;
    }

}
</style>