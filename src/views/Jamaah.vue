<template>
  <div class="jamaah">
        <div v-show="showform == 1">
            <h1 class="hidden md:block">Jamaah</h1>
            <div class="grid md:grid-rows-1 md:grid-cols-4 grid-cols-1 gap-2 mt-5 md:mt-3">
                <div class="cursor-pointer rounded-md p-3 bg-gray-100">
                    <p class="font-medium">Total Keseluruhan Jamaah Pria</p>
                    <h5 class="flex mt-3 font-semibold">{{pria.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="cursor-pointer rounded-md p-3 bg-gray-100">
                    <p class="font-medium">Total Keseluruhan Jamaah Wanita</p>
                    <h5 class="flex mt-3 font-semibold">{{perempuan.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="cursor-pointer rounded-md text-white p-3 bg-red-400" >
                    <p class="font-medium">Total Jamaah yang belum lunas</p>
                    <h5 class="flex mt-3 font-semibold">{{bayar.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
                <div class="cursor-pointer rounded-md p-3 bg-gray-100" >
                    <p class="font-medium">Total Jamaah Belum Lengkap Berkas</p>
                    <h5 class="flex mt-3 font-semibold">{{berkas.length}}<p class="ml-2 my-auto"> / Orang</p></h5>
                </div>
            </div>
            <div class="my-5 bg-gray-100 p-2 md:flex justify-start">
                <apexchart type="area" class="w-full" height="200" :options="chartJamaah" :series="seriesJamaah"></apexchart>
                <div class="bg-blue-400 md:ml-2 rounded text-white px-2 py-2 md:w-2/6 w-full ml-auto h-full">
                    <p class="font-semibold">Data Jamaah Tahun Ini</p>
                    <p class="text-xs">Semua jamaah yang didaftarkan</p>
                    <div class="grid grid-cols-2 gap-1 mt-3">
                        <p class="text-xs font-semibold">Total Jamaah</p>
                        <p class="text-xs text-bold">: {{Totaljamaah.length}} Jamaah</p>
                        <p class="text-xs font-semibold">Jamaah Pria</p>
                        <p class="text-xs text-bold">: {{TotaljamaahPria.length}} Jamaah</p>
                        <p class="text-xs font-semibold">Jamaah Wanita</p>
                        <p class="text-xs text-bold">: {{TotaljamaahWanita.length}} Jamaah</p>
                        <p class="text-xs font-semibold">Jamaah sudah berangkat</p>
                        <p class="text-xs text-bold">: {{udahberangkat.length}} Jamaah</p>
                    </div>
                </div>
            </div>
            <div class="bg-gray-100 p-2">
                <div>
                    <div class="grid md:flex justify-end md:grid-cols-4 grid-cols-3">
                        <p class="mr-auto text-xs hidden md:block md:my-auto md:mb-0 mb-4">Tap items pada table untuk melihat detail lengkapnya</p>
                        <Button type="info" class="md:block inline" @click="showpanduan = !showpanduan" >Panduan</Button>
                        <download-excel
                            v-if="$cookies.get('type') == 1"
                            class="btn btn-default md:mx-2 md:my-auto mx-2 md:block inline"
                            :data="json_data"
                            :fields="json_fields"
                            worksheet="My Worksheet"
                            name="Manifest Jamaah.xls"
                        >
                            <Button type="success">Export Excel</Button>
                        </download-excel>
                        <Button type="primary" class="md:block inline" @click="showform = 2">Tambah Jamaah</Button>
                    </div>
                    <TableGlobal @clickrow="rowclick"  :column="Jamaah" :data="jamaahlist" :totalpage="$store.state.jamaah.jamaahall.length/5 * 10" :placeholder="'Cari Nama Jamaah...'" :key="'nama_lengkap'" class="mt-3"></TableGlobal>
                </div>
            </div>
      </div>
    <Modal v-model="showpanduan" title="Panduan Table Jamaah" ok-text="OK" cancel-text="Cancel">
        <div class="flex w-full">
            <p>1</p>
            <p class="ml-2">Warna Merah pada Column No Warna Merah pada Column No</p>
        </div>
    </Modal>
    <JamaahDrawer 
        @closeable="tutupform"
        :show.sync="showform">
    </JamaahDrawer>
    <JamaahAksi
        @closeable="tutupdetail"
        :checkval.sync="checkopen"
        :show.sync="showform"
        :data.sync="detailjamaah">
    </JamaahAksi>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import Excel from '../model/Excel';
import Charts from '../model/Charts';
import TableData from '../plugins/TableData';
import TableGlobal from '../components/TableGlobal';
import JamaahAksi from '../components/JamaahAksi';
import JamaahDrawer from '../components/JamaahDrawer';
import moment from 'moment-timezone';
export default {
    components:{JamaahDrawer,JamaahAksi, TableGlobal},
    mixins: [Vue2Filters.mixin, Excel,TableData,Charts],
    name: "Jamaah",
    data() {
        return {
            showform: 1,
            databelumbayar: [],
            detailjamaah: [],
            checkopen: 1,
            showpanduan: false,
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
                return as.pasfoto == null && as.ktp == null && as.kk == null && as.vaksin == null;
            })
        },
        bayar(){
            return this.$store.state.jamaah.jamaahall.filter((as) => {
                return as.bayar === "BELUM LUNAS"
            })
        },
        udahberangkat() {
            return this.$store.state.jamaah.jamaahall.filter((as) => {
                return moment(as.created_at).format("yyyy") == new Date().getFullYear() && moment(as.pesanan.jadwal.pulang).isBefore(
                    moment().format("yyyy-MM-DD")
                    );
            });
        },
    },
    created(){
        this.$store.dispatch('jamaah/Alljamaah', {mitra: null});
        this.$store.dispatch('jamaah/JamaahBelumBayar');
    },
    methods: {
        tutupform(value){
            return this.showform = value;
        },
        tutupdetail(value){
            return this.showform = value;
        },
        rowclick(value){
            console.log(value);
            this.checkopen = 3;
            this.showform = 3;
            return this.detailjamaah = value;
        },
        showPerempuan(){
            this.showform = 3;
            this.checkopen = 5;
            return this.detailjamaah = this.perempuan;
        },
        showPria(){
            this.showform = 3;
            this.checkopen = 6;
            return this.detailjamaah = this.pria;
        },
        berkasfail(){
            this.showform = 3;
            this.checkopen = 7;
            console.log(this.berkas);
            return this.detailjamaah = this.berkas;
        },
        showdetailss(){
            this.showform = 3;
            this.checkopen = 4;
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
.ivu-table .usia-column{
    background: #ffe268 !important;
}
.ivu-table .biaya-success {
    background: #00ff7b !important;
    color: #fff;
}
.ivu-table .biaya-danger {
    background: #ff6600 !important;
    color: #fff;
}
</style>