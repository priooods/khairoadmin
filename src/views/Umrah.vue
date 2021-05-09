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
                <TableGlobal 
                    class="w-full"
                    @clickrow="rowclick"
                    :column="Umrah" :keys="'nama'" 
                    :pagination="$store.state.umrah.umrahall/5*10" 
                    :placeholder="'Cari Nama Umrah...'" :data="umrahlist">
                </TableGlobal>
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
import TableGlobal from '../components/TableGlobal';
import TableData from '../plugins/TableData';
export default {
    name: "Umrah",
    data(){
        return{
            opens: 1,
            data: null,
            showpanduan: false
        }
    },
    mixins:[TableData],
    components: {TableGlobal, UmrahDrawer, UmrahDetail},
    methods:{
        closeumrah(val){
            return this.opens = val;
        },
        rowclick(value){
            const yr = new Date().getFullYear() == new Date(value.jadwal.pulang).getFullYear();
            const month = new Date().getMonth() == new Date(value.jadwal.pulang).getMonth();
            if(yr && month){
                return this.$Message.error('Paket Umrah ini sudah selesai');
            }
            console.log(value);
            this.opens = 3;
            return this.data = value;
        },
        bukaformumrah(){
            this.opens = 2;
        },
        tutupumrahaksi(val){
            this.opens = val;
        }
    },
    created(){
      this.$store.dispatch('umrah/AllUmrah');
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