<template>
  <div class="mitra">
      <div v-show="!showdrawer">
        <h1 class="hidden md:block">Perwakilan</h1>
        <div class="mt-3 md:flex justify-end">
          <apexchart type="bar" class="w-full mr-auto" height="250" :options="optionsMitra" :series="seriesMitra"></apexchart>
        </div>
        <div class="bg-gray-50 mt-3 p-3">
          <div class="md:flex">
            <p class="my-auto">Lihat semua data cabang yang telah didaftarkan. Tap pada item untuk melakukan aksi lainnya</p>
            <Button v-if="$store.state.operat.user.type == 'Admin'||$store.state.operat.user.type == 'SuperUser'" class="ml-auto md:mt-0 mt-4" type="primary" @click="openNew">Buat Mitra Baru</Button>
          </div>
          <TableDefault @clickrow="rowclick" :keys="'fullname'" @changepage="changepage" @searching="searchMitra" @clearsearch="cs_Mitra"
            :placeholder="'Cari Nama Mitra...'" :totalpage="$store.state.mitra.mitrall.pages ? $store.state.mitra.mitrall.pages.total_pages * 10 : 0" 
            :column="Mitra" :data='mitralist'></TableDefault>
        </div>
      </div>
      <Mitradrawer @editing="editing" :editor="editor" :show="showdrawer" :data="detailmitra"  @closeable="closedrawer"></Mitradrawer>
  </div>
</template> 

<script>
import Mitradrawer from '../components/MitraDrawer';
import Notifikasi from '../model/Notifikasi';
import TableDefault from '../components/TableDefault';
import MitraData from '../plugins/MitraData';
import Charts from '../model/Charts';
export default {
  mixins: [Notifikasi, MitraData, Charts],
  components: {Mitradrawer, TableDefault},
  name: "Mitra",
  created() {
    this.$store.dispatch('mitra/AllMitra').then(()=>{}).finally(() => {
      this.$store.dispatch('mitra/AllCabang').then(()=>{}).finally(()=>{});
    });
  },
  data: ()=> {
    return{
      showdrawer: false,
      detailmitra: null,
      shownew: false,
      editor: 1
    }
  },
  methods:{
    closedrawer(val){
      return this.showdrawer = val;
    },
    editing(value){
      return this.editor = value;
    },
    rowclick(value){
      console.log(value);
      if (this.$store.state.operat.user.type == 'Admin' 
        ||this.$store.state.operat.user.type == 'SuperUser'){
          this.showdrawer = true;
          this.editor = 2
          return this.detailmitra = value;
        }
      return this.showdrawer = false;
    },
    openNew(){
      this.showdrawer = true;
      this.editor = 1
      return this.detailmitra = null;
    },
    changepage(v){
        this.$store.dispatch("mitra/AllMitra",{ page: v })
    },
    searchMitra(v){
        this.$store.dispatch('mitra/Searching',{fullname: v});
    },
    cs_Mitra(){
        this.$store.dispatch("mitra/AllMitra")
    }
  }
}
</script>