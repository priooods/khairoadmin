<template>
    <div class="umrah views position-relative h-100">
        <div class="px-3">
            <h1>Umrah</h1>
            <div class="row">
                <vs-button block size="small" class="col-md-2" @click="showinput = 1; showform=1">Detail Umrah</vs-button>
                <vs-button block size="small" class="col-md-2" @click="openedhotel = true">Detail Hotel</vs-button>
                <!-- <vs-button size="small" class="col-md-2 col-6" @click="showinput = !showinput">Detail Maskapai</vs-button> -->
                <!-- <vs-button size="small" v-show="showform == 1" danger class="col-md-2 col-10" @click="showform = 4">Tutup form</vs-button> -->
            </div>
            <!-- <div v-if="showform == 1">
                    <div v-if="showinput == 1">
                        <UmrahLay></UmrahLay>
                    </div>
                    <div v-if="showinput == 2">
                        <Hotellay></Hotellay>
                    </div>
            </div> -->
            <div class="tables px-3 bg mt-3">
                <p>Lihat semua data paket umrah</p>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Durasi</th>
                            <th>Tahun</th>
                            <th>Paket</th>
                            <th>Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dt, i) in $store.state.umrahall" v-bind:key="i">
                            <td>{{i + 1}}</td>
                            <td>{{dt.nama}}</td>
                            <td>{{dt.durasi}}</td>
                            <td>{{dt.tahun}}</td>
                            <td>{{dt.paket}}</td>
                            <td>{{dt.harga}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Hotellay
            :show.sync="openedhotel"
            @closeable="closehotel" 
        ></Hotellay>
    </div>
</template>

<script>
// import UmrahLay from '../components/Umrahlay';
import Hotellay from '../components/Hotellay';
// import UmrahLay from '../components/Umrahlay';
export default {
    name: "Umrah",
    data(){
        return{
            showinput: 0,
            openedhotel: false,
            showform: 0,
        }
    },
    components: {Hotellay},
    methods:{
        closehotel(){
            return this.openedhotel = false;
        }
    },
    mounted() {
      this.$store.dispatch('umrah/AllHotel');  
    },
}
</script>

<style lang="scss">
@import '../assets/fonts/font.scss';
.views{
    .search{
      font-size: 11px;
      font-family: $font-reguler;
  }
}
</style>