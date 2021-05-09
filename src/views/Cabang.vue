<template>
  <div class="cabang">
    <div v-show="!opened">
      <h1 class="hidden md:block">Cabang</h1>
      <div class="mt-3 md:flex">
        <div class="md:w-4/6 w-full md:mt-0 mt-4">
          <div class="bg-gray-50 md:p-4 p-3">
            <div class="md:flex block justify-start">
              <div class="my-auto">
                <p class="text-xs">Lihat semua data cabang yang telah didaftarkan <br>Tap pada item untuk melakukan aksi lainnya</p>
              </div>
              <Button v-if="$store.state.operat.user.type == 'SuperUser' 
              || $store.state.operat.user.type == 'SuperExtra' || $store.state.operat.user.type == 'Admin' " 
              class="ml-auto my-auto mt-5 md:mt-0" type="primary" 
              @click="opened = true; typedrawer = 1; clickdata = []">Tambah Baru</Button>
            </div>
            <TableGlobal @clickrow="showdetail" class="md:mt-3 mt-2" :data="cabanglist" :keys="'name'" :column="Cabang" :pagination="$store.state.mitra.cabangall.length/5*10" :placeholder="'Cari Cabang ...'"></TableGlobal>
          </div>
        </div>
        <div class="md:w-2/6 w-full md:ml-2 md:mt-0 mt-4">
          <div class="bg-gray-50 md:p-4 p-3">
            <div class="">
              <h6>Jumlah Cabang Terdaftar <br><span>total seluruh cabang yang terdaftar saat ini</span></h6>
              <h6 class="mt-4 font-bold text-lg">{{$store.state.mitra.cabangall.length}} Cabang</h6>
            </div>
          </div>
          <div class="mt-5 md:mt-4">
            <apexchart type="radialBar" height="200" :options="options" :series="series"></apexchart>
          </div>
        </div>
      </div>
    </div>
    <CabangDrawer 
      :show.sync="opened"
      :type.sync="typedrawer"
      :data.sync="clickdata"
      @closeable="closingDrawer" 
    ></CabangDrawer>
  </div>
</template>

<script>
import CabangDrawer from '../components/CabangDrawer';
import TableGlobal from '../components/TableGlobal';
import TableData from '../plugins/TableData';
import ChartCabang from '../model/ChartCabang';
export default {
    name: "Cabang",
    mixins: [TableData,ChartCabang],
    components: {CabangDrawer,TableGlobal},
    data() {
      return {
        opened: false,
        typedrawer: 1,
        clickdata: null,
      }
    },
    created(){
      this.$store.dispatch('mitra/AllCabang');
    },
    methods: {
      closingDrawer(val){
        return this.opened = val
      },
      showdetail(val){
        console.log(this.getMitras);
        if (this.$cookies.get('type') == 1) {
          if (this.$store.state.operat.user.type == 'SuperExtra' 
              || this.$store.state.operat.user.type == 'SuperUser' 
              || this.$store.state.operat.user.type == 'Admin') {
            //if type same 2 . user can edit or deleted data
            this.typedrawer = 3;
          } else {
            //for operator only show detail
            this.typedrawer = 4;
          }
          this.opened = true;
          return this.clickdata = val;
        } else{
          //for mitra only show detail like operator
          this.typedrawer = 4;
          this.opened = true;
          return this.clickdata = val;
        }
      }
    },
}
</script>
