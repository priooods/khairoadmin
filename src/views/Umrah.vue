<template>
    <div class="umrah">
        <div v-show="opens == 1">
            <h1 class="hidden md:block">Umrah</h1>
            <div class="bg-gray-50 md:p-3 p-2 md:mt-5 mt-3 w-full">
                <div class="md:flex justify-end">
                    <p class="my-auto mr-auto">Lihat semua data paket umrah</p>
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
            data: null
        }
    },
    mixins:[TableData],
    components: {TableGlobal, UmrahDrawer, UmrahDetail},
    methods:{
        closeumrah(val){
            return this.opens = val;
        },
        rowclick(value){
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
      this.$store.dispatch('umrah/AllHotel');
      this.$store.dispatch('umrah/AllUmrah');
      this.$store.dispatch('umrah/AllMaskapai');
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
</style>