<template>
    <div class="umrah">
        <div v-show="opens == 1">
            <h1 class="hidden md:block">Umrah</h1>
            <UmrahDetail class="mt-4" @formumrah="bukaformumrah" @showdata="showingData"></UmrahDetail>
            <div v-show="btnactive == 2">
                <!-- <HotelDetail 
                    @formhotel="bukaformhotel"
                    @detailhotel="detailhotel"
                ></HotelDetail> -->
            </div>
        </div>
        <!-- <HotelDrawer
            :show.sync="opened.openhotel"
            :data.sync="data.hotel"
            @closeable="closehotel"
            :showby='showbyhotel'
        ></HotelDrawer> -->
        <div v-show="opens == 2">
            <UmrahDrawer
            :show.sync="opens"
            :data.sync="data.umrah"
            @tutupumrah="closeumrah"
        ></UmrahDrawer>
        </div>
        <!-- <UmrahAksi 
           :show.sync="opened.umrahaksi"
           :data.sync="data.umrahdetail"
           @closeable="tutupumrahaksi"
        ></UmrahAksi> -->
    </div>
</template>

<script>
// import HotelDetail from '../components/HotelDetail';
// import HotelDrawer from '../components/HotelDrawer';
import UmrahDetail from '../components/UmrahDetail';
// import UmrahAksi from '../components/UmrahAksi';
import UmrahDrawer from '../components/UmrahDrawer';
export default {
    name: "Umrah",
    data(){
        return{
            showinput: 0,
            showform: 0,
            opens: 1,
            showbyhotel: 0,
            data:{
                hotel: null,
                umrah: null,
                umrahdetail: null
            },
            btnactive: 1,
            opened: {
                openhotel: false,
                openumrah: false,
                umrahaksi: false
            }
        }
    },
    components: {UmrahDetail,UmrahDrawer},
    methods:{
        detailhotel(value){
            this.showbyhotel = 2;
            this.data.hotel = value;
            return this.opened.openhotel = true;
        },
        closehotel(val){
            return this.opened.openhotel = val;
        },
        closeumrah(val){
            return this.opens = val;
        },
        bukaformhotel(){
            this.showbyhotel = 1;
            this.opened.openhotel = true; 
            this.data.hotel = null
        },
        bukaformumrah(){
            this.opens = 2;
            this.data.umrah = null;
        },
        showingData(value){
            this.opened.umrahaksi = true;
            this.data.umrahdetail = value;
        },
        tutupumrahaksi(val){
            this.opened.umrahaksi = val;
        }
    },
    created(){
      this.$store.dispatch('umrah/AllHotel');
      this.$store.dispatch('umrah/AllUmrah');
      this.$store.dispatch('umrah/AllMaskapai');
    },
    mounted() {
        console.log(this.$store.state.umrah.umrahall);
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