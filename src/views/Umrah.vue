<template>
    <div class="umrah">
        <div v-show="opens == 1">
            <h1 class="hidden md:block">Umrah</h1>
            <div class="bg-gray-50 md:p-3 p-2 md:mt-5 mt-3 w-full">
                <div class="md:flex grid grid-cols-2 gap-2 justify-end">
                    <p class="my-auto hidden md:block mr-auto">Lihat semua data paket umrah</p>
                    <Button type="info" @click="showpanduan = !showpanduan">Panduan</Button>
                    <Button type="primary" @click="opens = 2">Tambah Paket</Button>
                </div>
                <TableDefault 
                    class="w-full" @clickrow="rowclick" :column="Umrah" :keys="'code'" 
                    @changepage="changepage" @searching="searchUmrah" @clearsearch="cs_Umrah"
                    :totalpage="$store.state.umrah.umrahall.pages ? $store.state.umrah.umrahall.pages.total_pages * 10 : 0"
                    :placeholder="'Cari Code Umrah...'" :data="umrahlist">
                </TableDefault>
            </div>
        </div>
        <Modal v-model="showpanduan" title="Panduan Table Umrah" ok-text="OK" cancel-text="Cancel">
            <h2 class="font-bold">Column</h2>
            <div class="flex w-full mt-2">
                <p>1</p>
                <div class="ml-2">
                    <p class="text-xs font-semibold">Sisa Kuota</p>
                    <p class="text-xs mt-1">Warna <span class="text-bold text-red-600">Merah</span> Pada Column Sisa Kuota menunjukan bahwa kuota umrah sudah habis</p>
                </div>
            </div>
            <div class="flex w-full mt-2">
                <p>1</p>
                <div class="ml-2">
                    <p class="text-xs font-semibold">Sisa Kuota</p>
                    <p class="text-xs mt-1">Warna <span class="text-bold text-yellow-600">Kuning</span> Pada Column Sisa Kuota menunjukan bahwa kuota umrah kurang dari 5</p>
                </div>
            </div>
            <div class="flex w-full mt-2">
                <p>2</p>
                <div class="ml-2">
                    <p class="text-xs font-semibold">Berangkat</p>
                    <p class="text-xs mt-1">Warna <span class="text-bold text-green-600">Merah</span> Pada Column Berangkat menunjukan bahwa paket umrah sudah berangkat</p>
                </div>
            </div>
            <div class="flex w-full mt-2">
                <p>2</p>
                <div class="ml-2">
                    <p class="text-xs font-semibold">Pulang</p>
                    <p class="text-xs mt-1">Warna <span class="text-bold text-red-600">Merah</span> Pada Column Pulang menunjukan bahwa paket umrah sudah ditutup</p>
                </div>
            </div>
        </Modal>
        <UmrahDrawer :show.sync="opens" :data.sync="data" @tutupumrah="closeumrah"></UmrahDrawer>
        <UmrahDetail :show.sync="opens" :data.sync="data" @closeable="tutupumrahaksi"></UmrahDetail>
    </div>
</template>

<script>
import UmrahDetail from '../components/UmrahDetail';
import UmrahDrawer from '../components/UmrahDrawer';
import TableDefault from '../components/TableDefault';
import moment from 'moment-timezone';
import UmrahData from '../plugins/UmrahData';
export default {
    name: "Umrah",
    data(){
        return{
            opens: 1,
            data: null,
            showpanduan: false
        }
    },
    mixins:[UmrahData],
    components: {
        TableDefault, 
        UmrahDrawer, 
        UmrahDetail
    },
    methods:{
        closeumrah(val){
            return this.opens = val;
        },
        rowclick(value){
            if(moment().isBefore(value.jadwal.pulang)){
                console.log(value);
                this.opens = 3;
                return this.data = value;
            }
            return this.$Message.error('Paket Umrah ini sudah selesai');
        },
        bukaformumrah(){
            this.opens = 2;
        },
        tutupumrahaksi(val){
            this.opens = val;
        },
        searchUmrah(v){
            this.$store.dispatch('umrah/Searching',{code: v});
        },
        changepage(v){
            this.$store.dispatch("umrah/AllUmrah",{ page: v })
        },
        cs_Umrah(){
            this.$store.dispatch('umrah/AllUmrah',{page: 1})
        }
    },
    created(){
      this.$store.dispatch('umrah/AllUmrah',{page: 1}).then(() => {}).finally(() => {
          this.$store.dispatch('gudang/AllGudang').then(() => {}).finally(() => {});
      });
    },
}
</script>

<style lang="scss">
@import '../assets/fonts/font.scss';
.views{
    height: auto;
    .search{
      font-size: 11px;
      font-family: $font-reguler;
  }
  .btns{
      background: #71bbffc9;
  }
  .active-btn{
      background: #195BFF;
  }
}
.ivu-table .sisa-style-danger {
    background: #ff6600 !important;
    color: #fff;
}
.ivu-table .sisa-style-warning {
    background: #d0ff00 !important;
}
.ivu-table .berangkat-style-green {
    background: #00ff7b !important;
    color: #fff;
}
</style>