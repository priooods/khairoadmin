<template>
    <div class="umrah views position-relative h-100">
        <div class="px-3">
            <h1>Umrah</h1>
            <div class="d-md-flex d-lg-flex d-xl-flex">
                <vs-button size="small" class="col-md-2 col-12" @click="showinput = 1; showform=1">Buat Paket Umrah</vs-button>
                <vs-button size="small" class="col-md-2 col-12" @click="showinput = 2; showform=1">Tambah Hotel</vs-button>
                <vs-button size="small" class="col-md-2 col-12" @click="showinput = !showinput">Tambah Maskapai</vs-button>
                <vs-button size="small" v-show="showform == 1" danger class="col-md-2 col-12" @click="showform = 4">Tutup form</vs-button>
            </div>
            <div v-if="showform == 1">
                    <div v-if="showinput == 1">
                        <UmrahLay></UmrahLay>
                    </div>
                    <div v-if="showinput == 2">
                        <Hotellay></Hotellay>
                    </div>
            </div>
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
    </div>
</template>

<script>
import UmrahLay from '../components/Umrahlay';
import Hotellay from '../components/Hotellay';
// import UmrahLay from '../components/Umrahlay';
export default {
    name: "Umrah",
    data(){
        return{
            showinput: 0,
            showform: 0,
        }
    },
    components: {UmrahLay,Hotellay}
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