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
                <apexchart type="bar" class="w-full" height="200" :options="chartJamaah2" :series="seriesJamaahBar"></apexchart>
                <div class="bg-blue-400 md:ml-2 rounded text-white px-2 py-2 md:w-2/6 w-full ml-auto h-full">
                    <p class="font-semibold">Data Jamaah Tahun Ini</p>
                    <p class="text-xs">Semua jamaah yang didaftarkan</p>
                    <div class="grid grid-cols-2 gap-1 mt-3">
                        <p class="text-xs font-semibold">Total Jamaah</p>
                        <p class="text-xs text-bold">: {{Totaljamaah.length}} Jamaah</p>
                        <p class="text-xs font-semibold">Jamaah sudah berangkat</p>
                        <p class="text-xs text-bold">: {{udahberangkat.length}} Jamaah</p>
                        <p class="text-xs font-semibold">Jamaah sudah pulang</p>
                        <p class="text-xs text-bold">: {{udahpulang.length}} Jamaah</p>
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
                    <TableDefault @clickrow="rowclick" @changepage="changepage" @searching="searchJamaah" @clearsearch="cs_Jamaah" :column="Jamaah" :data="jamaahlist" 
                        :totalpage="$store.state.jamaah.jamaahall.pages ? $store.state.jamaah.jamaahall.pages.total_pages * 10 : 0" 
                        :placeholder="'Cari Nama Jamaah...'" :key="'nama_lengkap'" class="mt-3">
                    </TableDefault>
                </div>
            </div>
      </div>
    <Modal v-model="showpanduan" title="Panduan Table Jamaah" ok-text="OK" cancel-text="Cancel">
        <h2 class="font-bold">Column</h2>
        <div class="flex w-full mt-2">
            <p>1</p>
            <div class="ml-2">
                <p class="text-xs font-semibold">Nomor</p>
                <p class="text-xs mt-1">Warna <span class="text-bold text-red-600">Merah</span> Pada Column Nomor menunjukan bahwa jamaah belum menambahkan biaya kamar. Harap click pada baris table tersebut lalu click tombol <span class="text-bold text-red-600">Atur Harga Kamar</span></p>
            </div>
        </div>
        <div class="flex w-full mt-2">
            <p>2</p>
            <div class="ml-2">
                <p class="text-xs font-semibold">Nama Jamaah</p>
                <p class="text-xs mt-1">Warna <span class="text-bold text-green-600">Hijau</span> Pada Column Nama Jamaah menunjukan bahwa jamaah sudah berangkat umrah</p>
            </div>
        </div>
        <div class="flex w-full mt-2">
            <p>2</p>
            <div class="ml-2">
                <p class="text-xs font-semibold">Code</p>
                <p class="text-xs mt-1">Warna <span class="text-bold text-red-600">Merah</span> Pada Column Code menunjukan bahwa jamaah belum melengkapi semua berkas yang diminta. Harap click pada baris table tersebut lalu click tombol <span class="text-bold text-red-600">Simpan Berkas</span></p>
            </div>
        </div>
        <div class="flex w-full mt-2">
            <p>3</p>
            <div class="ml-2">
                <p class="text-xs font-semibold">Usia</p>
                <p class="text-xs mt-1">Warna <span class="text-bold text-yellow-600">Kuning</span> Pada Column Usia menunjukan bahwa jamaah berjenis kelamin Wanita dan usianya kurang dari 45 Tahun</p>
            </div>
        </div>
        <div class="flex w-full mt-2">
            <p>2</p>
            <div class="ml-2">
                <p class="text-xs font-semibold">Status</p>
                <p class="text-xs mt-1">Warna <span class="text-bold text-red-600">Merah</span> Pada Column Status menunjukan bahwa jamaah belum melunasi semua biaya umrah. Harap click pada baris table tersebut lalu click tombol <span class="text-bold text-red-600">Bayar Umrah</span></p>
            </div>
        </div>
    </Modal>
    <JamaahDrawer @closeable="tutupform" :show="showform"></JamaahDrawer>
    <JamaahAksi @closeable="tutupdetail" :checkval.sync="checkopen" :show.sync="showform" :data.sync="detailjamaah"></JamaahAksi>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import Excel from '../model/Excel';
import Charts from '../model/Charts';
import JamaahData from '../plugins/JamaahData';
import TableDefault from '../components/TableDefault';
import JamaahAksi from '../components/JamaahAksi';
import JamaahDrawer from '../components/JamaahDrawer';
export default {
    components:{JamaahDrawer,JamaahAksi, TableDefault},
    mixins: [Vue2Filters.mixin, Excel,JamaahData,Charts],
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
            return this.$store.state.jamaah.jamaahall.data ? this.$store.state.jamaah.jamaahall.data.filter((as) => {
                return as.gender === "Wanita"
            }) : []
        },
        pria(){
            return this.$store.state.jamaah.jamaahall.data ? this.$store.state.jamaah.jamaahall.data.filter((as) => {
                return as.gender === "Pria"
            }) : []
        },
        berkas(){
            return this.$store.state.jamaah.jamaahall.data ? this.$store.state.jamaah.jamaahall.data.filter((as) => {
                return as.pasfoto == null && as.ktp == null && as.kk == null && as.vaksin == null;
            }) : []
        },
        bayar(){
            return this.$store.state.jamaah.jamaahall.data ? this.$store.state.jamaah.jamaahall.data.filter((as) => {
                return as.bayar === "BELUM LUNAS"
            }) : []
        },
    },
    created(){
        this.$store.dispatch('jamaah/Alljamaah').then(()=>{}).finally(() => {
            this.$store.dispatch('mitra/AllMitra').then(()=>{}).finally(() => {});
            this.$store.dispatch('jamaah/JamaahBelumBayar').then(()=>{}).finally(() => {
                this.$store.dispatch('umrah/AllUmrah').then(() => {}).finally(() => {
                    console.log(this.$store.state.umrah.umrahall.data,'umrah array');
                });
            });
        });
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
        changepage(v){
            this.$store.dispatch("jamaah/Alljamaah",{ page: v })
        },
        searchJamaah(v){
            this.$store.dispatch('jamaah/Searchjamaah',{nama_lengkap: v});
        },
        cs_Jamaah(){
            this.$store.dispatch("jamaah/Alljamaah")
        },
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