<template>
  <div class="cabang views position-relative">
    <div>
      <h1 class="ml-3">Cabang</h1>
      <div class="mt-3 d-block d-md-flex d-lg-flex d-xl-flex">
        <div class="col mt-2">
          <div class="h-auto bg">
            <div class="row justify-content-end mt-1">
              <div class="col-12 col-md-8 mr-auto">
                <p>Lihat semua data cabang yang telah didaftarkan <br>Tap pada item untuk melakukan aksi lainnya</p>
              </div>
              <vs-button v-if="$store.state.operat.user.type == 'SuperUser' 
              || $store.state.operat.user.type == 'SuperExtra' || $store.state.operat.user.type == 'Admin' " 
              class="col-md-3 h-100 mx-3 buton" 
              @click="opened = true; typedrawer = 1; clickdata = []">Tambah Baru</vs-button>
            </div>
            <b-form-input class="search my-3 w-100" size="sm" v-model="searching" type="text" placeholder="Cari Cabang ..."></b-form-input>
            <div class="tables">
              <table class="cabang-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Code</th>
                    <th>Nama</th>
                    <th>Kota</th>
                    <th>Provinsi</th>
                    <th>Alamat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(data, i) in filteredCabang" v-bind:key="i" @click="showdetail(data)">
                    <td data-label="No">{{i + 1}}</td>
                    <td data-label="Code">{{data.code}}</td>
                    <td data-label="Nama">{{data.name}}</td>
                    <td data-label="Kota">{{data.kota}}</td>
                    <td data-label="Provinsi">{{data.provinsi}}</td>
                    <td data-label="Alamat">{{data.alamat}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-2 h-100 ">
          <div class="bg">
            <div class="bgs p-2">
              <h6>Jumlah Cabang Terdaftar <br><span>total seluruh cabang yang terdaftar saat ini</span></h6>
              <h6 class="mt-4">{{$store.state.mitra.cabangall.length}} Cabang</h6>
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
  </div>
</template>

<script>
import CabangDrawer from '../components/CabangDrawer';
export default {
    name: "Cabang",
    components: {CabangDrawer},
    data() {
      return {
        searching: '',
        opened: false,
        typedrawer: 1,
        clickdata: null
      }
    },
    created(){
      this.$store.dispatch('mitra/AllCabang');
    },
    computed:{
      listCabang(){
        return this.$store.state.mitra.cabangall;
      },
      filteredCabang() {
        const search = this.searching.toLowerCase().trim();
        if (!search) return this.listCabang;
        return this.listCabang.filter(c => c.name.toLowerCase().indexOf(search) > -1);
      },
    },
    methods: {
      closingDrawer(val){
        return this.opened = val
      },
      showdetail(val){
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

<style lang="scss">
@import '../assets/fonts/font.scss';
.views{
  height: 100vh;
  .search{
      font-size: 11px;
      font-family: $font-reguler;
  }
  h6{
    span{
      font-family: $font-reguler;
      font-size: 12px;
    }
  }
}
</style>