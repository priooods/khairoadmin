<template>
  <div class="jamaah views px-3">
        <div v-show="!showform">
            <h1>Jamaah</h1>
            <div class="row mt-3">
                <div class="mt-2 col-md mx-2 bg cursor" @click="showPria">
                    <p>Total Keseluruhan Jamaah Pria</p>
                    <h5 class="d-flex">{{pria.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="mt-2 col-md mx-2 bg cursor" @click="showPerempuan">
                    <p>Total Keseluruhan Jamaah Wanita</p>
                    <h5 class="d-flex">{{perempuan.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="mt-2 col-md mx-2 bg cursor bg-rd" @click="showdetailss">
                    <p>Total Jamaah yang belum lunas</p>
                    <h5 class="d-flex">{{bayar.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="mt-2 col-md mx-2 bg cursor" @click="berkasfail">
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
                            v-if="$cookies.get('type') == 1"
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
                            <tr v-for="(data,i) in datatable" v-bind:key="i" @click="showdetails(data)">
                                <td data-label="No">{{i + 1}}</td>
                                <td data-label="Nomer Jamaah">{{data.code | uppercase}}</td>
                                <td data-label="NIK">{{data.no_ktp | uppercase}}</td>
                                <td data-label="Nama Lengkap">{{data.nama_lengkap | uppercase}}</td>
                                <td data-label="Gender">{{data.gender ? data.gender : '--' | uppercase}}</td>
                                <td data-label="Tempat Lahir">{{data.ttl | uppercase}}</td>
                                <td data-label="No Telp">{{data.no_telp | uppercase}}</td>
                                <td data-label="Usia">{{data.usia ? data.usia : 0 | uppercase}} Tahun</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="totalpage" :current="1"  @on-change="setPage"></Page>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
      </div>
    <JamaahForm 
        @closeable="tutupform"
        :show.sync="showform">
    </JamaahForm>
    <JamaahDetail
        @closeable="tutupdetail"
        :checkval.sync="checkopen"
        :show.sync="showdetail"
        :data.sync="detailjamaah">
    </JamaahDetail>
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
            showdetail: false,
            databelumbayar: [],
            detailjamaah: [],
            searching: '',
            checkopen: 1,
            datatable: [],
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
                return as.bayar === "BELUM LUNAS"
            })
        },
        listJamaah(){
            return this.$store.state.jamaah.jamaahall;
        },
        totalpage(){
            return this.$store.state.jamaah.jamaahall.length/5 * 10
        },
    },
    mounted(){
        if(this.$cookies.get('type') == 1){
            this.$store.dispatch('jamaah/Alljamaah', {mitra: null});
        } else {
            this.$store.dispatch('jamaah/Alljamaah', {mitra: this.$store.state.mitra.user.id});
        }
        this.$store.dispatch('jamaah/JamaahBelumBayar');
        this.setPage(1);
    },
    watch:{
      searching: function (value){
        const search = value.toLowerCase().trim();
        if (!search) return this.setPage(1);
        return this.datatable = this.listJamaah.filter(c => c.nama_lengkap.toLowerCase().indexOf(search) > -1); 
      }
    },
    methods: {
        setPage(val){
            return this.datatable = this.listJamaah.slice((val - 1) * 5, val * 5);
        },
        tutupform(){
            return this.showform = false;
        },
        tutupdetail(){
            return this.showdetail = false;
        },
        showdetails(value){
            this.checkopen = 1;
            this.showdetail = true;
            return this.detailjamaah = value;
        },
        showPerempuan(){
            this.showdetail = true;
            this.checkopen = 3;
            return this.detailjamaah = this.perempuan;
        },
        showPria(){
            this.showdetail = true;
            this.checkopen = 4;
            return this.detailjamaah = this.pria;
        },
        berkasfail(){
            this.showdetail = true;
            this.checkopen = 5;
            console.log(this.berkas);
            return this.detailjamaah = this.berkas;
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
    min-height: 100vh !important;
    .cursor{
        cursor: pointer;
    }
}
.bg-rd{
    background: rgb(255, 89, 89) !important;
    color: white !important;
}
</style>