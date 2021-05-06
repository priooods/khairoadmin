<template>
  <div class="mitra">
      <div v-show="!showdrawer">
        <h1 class="hidden md:block">Perwakilan</h1>
        <div class="bg-gray-50 mt-3 p-3">
          <div class="md:flex">
            <p class="my-auto">Lihat semua data cabang yang telah didaftarkan. Tap pada item untuk melakukan aksi lainnya</p>
            <Button v-if="$store.state.operat.user.type == 'Admin'||$store.state.operat.user.type == 'SuperUser'" class="ml-auto md:mt-0 mt-4" type="primary" @click="openNew">Buat Mitra Baru</Button>
          </div>
          <TableGlobal @clickrow="rowclick" :keys="'fullname'" :placeholder="'Cari Nama Mitra...'" :column="Mitra" :data='mitralist'></TableGlobal>
        </div>
      </div>
      <Mitradrawer @editing="editing" :editor="editor" :show="showdrawer" :data="detailmitra"  @closeable="closedrawer"></Mitradrawer>
  </div>
</template> 

<script>
import Mitradrawer from '../components/MitraDrawer';
import Notifikasi from '../model/Notifikasi';
import TableGlobal from '../components/TableGlobal';
import TableData from '../plugins/TableData';
export default {
  mixins: [Notifikasi, TableData],
  components: {Mitradrawer, TableGlobal},
  name: "Mitra",
  created() {
    this.$store.dispatch('mitra/AllMitra');
    this.$store.dispatch('mitra/AllCabang');
  },
  data: ()=> {
    return{
      showdrawer: false,
      detailmitra: [],
      shownew: false,
      editor: 1
    }
  },
  methods:{
    closedrawer(val){
      return this.showdrawer = val;
    },
    editing(val){
      return this.editor = val;
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
      return this.detailmitra = {};
    },
  }
}
</script>