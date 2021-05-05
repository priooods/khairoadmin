<template>
  <div class="jamaah">
        <div v-show="!showform">
            <h1>Jamaah</h1>
            <div class="grid md:grid-rows-1 md:grid-cols-4 grid-cols-1 gap-2 mt-3">
                <div class="cursor-pointer rounded-md p-3 bg-gray-100" @click="showPria">
                    <p class="font-medium">Total Keseluruhan Jamaah Pria</p>
                    <h5 class="flex mt-3 font-semibold">{{pria.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="cursor-pointer rounded-md p-3 bg-gray-100" @click="showPerempuan">
                    <p class="font-medium">Total Keseluruhan Jamaah Wanita</p>
                    <h5 class="flex mt-3 font-semibold">{{perempuan.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="cursor-pointer rounded-md text-white p-3 bg-red-500" @click="showdetailss">
                    <p class="font-medium">Total Jamaah yang belum lunas</p>
                    <h5 class="flex mt-3 font-semibold">{{bayar.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="cursor-pointer rounded-md p-3 bg-gray-100" @click="berkasfail">
                    <p class="font-medium">Total Jamaah Belum Lengkap Berkas</p>
                    <h5 class="flex mt-3 font-semibold">{{berkas.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
            </div>
            <div class="bg-gray-100 p-2 mt-4">
                <div>
                    <div class="flex justify-end">
                        <download-excel
                            v-if="$cookies.get('type') == 1"
                            class="btn btn-default md:mr-2 mr-1"
                            :data="json_data"
                            :fields="json_fields"
                            worksheet="My Worksheet"
                            name="Manifest Jamaah.xls"
                        >
                            <Button type="success">Download Excel</Button>
                        </download-excel>
                        <Button type="primary" @click="showform =!showform">Tambah Jamaah Baru</Button>
                    </div>
                    <TableGlobal :column="Jamaah" :data="jamaahlist" :totalpage="$store.state.jamaah.jamaahall.length/5 * 10" :placeholder="'Cari Nama Jamaah...'" :key="'nama_lengkap'" class="mt-3"></TableGlobal>
                    <!-- <div class="tables">
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
                    </div> -->
                </div>
            </div>
      </div>
    <JamaahDrawer 
        @closeable="tutupform"
        :show.sync="showform">
    </JamaahDrawer>
    <!-- <JamaahDetail
        @closeable="tutupdetail"
        :checkval.sync="checkopen"
        :show.sync="showdetail"
        :data.sync="detailjamaah">
    </JamaahDetail> -->
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import Excel from '../model/Excel';
import TableData from '../plugins/TableData';
import TableGlobal from '../components/TableGlobal';
// import JamaahDetail from '../components/JamaahAksi';
import JamaahDrawer from '../components/JamaahDrawer';
export default {
    components:{JamaahDrawer, TableGlobal},
    mixins: [Vue2Filters.mixin, Excel,TableData],
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
    },
    created(){
        // if(this.$cookies.get('type') == 1){
        //     this.$store.dispatch('jamaah/Alljamaah', {mitra: null});
        // } else {
        //     this.$store.dispatch('jamaah/Alljamaah', {mitra: this.$store.state.mitra.user.id});
        // }
        this.$store.dispatch('jamaah/Alljamaah', {mitra: null});
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