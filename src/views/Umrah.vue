<template>
    <div class="umrah views h-100">
        <div class="mx-3">
            <h1>Umrah</h1>
            <div class="row px-1 mb-3">
                <vs-button :class="{'active-btn': btnactive == 1}" block size="small" class="col-md-2 btns" @click="btnactive = 1">Detail Umrah</vs-button>
                <vs-button :class="{'active-btn': btnactive == 2}" block size="small" class="col-md-2 btns" @click="btnactive = 2">Hotel & Maskapai</vs-button>
            </div>
            <div v-show="btnactive == 1">
                <UmrahDetail @formumrah="bukaformumrah"></UmrahDetail>
            </div>
            <div v-show="btnactive == 2">
                <HotelDetail 
                    @formhotel="bukaformhotel"
                    @detailhotel="detailhotel"
                ></HotelDetail>
            </div>
        </div>
        <HotelDrawer
            :show.sync="opened.openhotel"
            :data.sync="data.hotel"
            @closeable="closehotel" 
        ></HotelDrawer>
        <UmrahDrawer
            :show.sync="opened.openumrah"
            :data.sync="data.umrah"
            @tutupumrah="closeumrah"
        ></UmrahDrawer>
    </div>
</template>

<script>
import HotelDetail from '../components/HotelDetail';
import HotelDrawer from '../components/HotelDrawer';
import UmrahDetail from '../components/UmrahDetail';
import UmrahDrawer from '../components/UmrahDrawer';
export default {
    name: "Umrah",
    data(){
        return{
            showinput: 0,
            showform: 0,
            data:{
                hotel: null,
                umrah: null
            },
            btnactive: 1,
            opened: {
                openhotel: false,
                openumrah: false,
            }
        }
    },
    components: {HotelDrawer,HotelDetail,UmrahDetail, UmrahDrawer},
    methods:{
        detailhotel(value){
            this.data.hotel = value;
            return this.opened.openhotel = true;
        },
        closehotel(val){
            return this.opened.openhotel = val;
        },
        closeumrah(val){
            return this.opened.openumrah = val;
        },
        bukaformhotel(){
            this.opened.openhotel = true; 
            this.data.hotel = null
        },
        bukaformumrah(){
            this.opened.openumrah = true;
            this.data.umrah = null
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
    height: 100vh;
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