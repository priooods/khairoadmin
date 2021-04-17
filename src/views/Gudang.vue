<template>
  <div class="gudang views px-3">
    <div>
      <h1>Gudang</h1>
      <div class="d-flex justify-content-end mt-2" 
          v-show="$store.state.operat.user.type === 'Operator' || $store.state.operat.user.type === 'SuperUser'
            || $store.state.operat.user.type === 'SuperExtra'">
            <vs-button size="small" @click="Opendrawer = true; Typedrawer = 1">Belanja Persediaan</vs-button>
          </div>
      <div class="mt-3 row">
        <div class="mt-2 mx-2 col bg h-100">
          <p>Lihat semua data gudang</p>
          <!-- <canvas class="mt-2 w-100" id="chartgudang"></canvas> -->
        </div>
        <div class="col-md-4 mx-2 bg mt-2">
          <p>Lihat semua hitory belanja anda</p>
          <ul class="list-unstyled mt-3" v-for="(data, i) in $store.state.gudang.belanja" v-bind:key="i">
            <li>
              <div class="d-flex justify-content-end">
                <p class="my-auto mr-auto">{{data.created_at | moment("DD MMMM YYYY,  hh:mm")}} WIB</p>
                <div class="cursor-pointer" v-show="muncul[i]" @click="hiden(i)"><i class="bx bxs-up-arrow"></i></div>
                <div class="cursor-pointer" v-show="!muncul[i]" @click="show(i)"><i class="bx bxs-down-arrow"></i></div>
              </div>
              <div class="mt-3 row" v-show="muncul[i]">
                <p class="col-4">Total Barang</p>
                <p class="col-8">{{data.total}}</p>
                <p class="col-4">Identitas</p>
                <p class="col-8">{{data.operator ? data.operator.fullname : "SuperUser"}}</p>
                <p class="mt-2 mb-n1 col-12">Item yang di beli</p>
                <ul class="mt-2 col-12 d-flex w-100 list-unstyled" v-for="(ds, i) in data.item" v-bind:key="i">
                  <p>{{i + 1}}</p>
                  <div class="ml-4">
                    <li class="row">
                      <p class="col">Nama</p>
                      <p class="col">{{ds.nama}}</p>
                    </li>
                    <li class="row mt-n2">
                      <p class="col">Harga</p>
                      <p class="col">{{ds.total}}</p>
                    </li>
                    <li class="row mt-n2">
                      <p class="col">Total</p>
                      <p class="col">{{ds.harga}}</p>
                    </li>
                  </div>
                </ul>
                <div class="col ml-auto">
                  <vs-button v-show="$store.state.operat.user.type === 'Operator' || $store.state.operat.user.type === 'SuperUser'
                  || $store.state.operat.user.type === 'SuperExtra'" square size="small" @click="Canceled(data.id, i)">Cancel Belanja</vs-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <GudangDrawer :show.sync="Opendrawer" :type="Typedrawer" @closedrawer="closedrawer"></GudangDrawer>
    </div>
  </div>
</template>

<script>
import GudangDrawer from '../components/GudangDrawer';
import Notifikasi from '../model/Notifikasi';
export default {
    name: "Gudang",
    components: {GudangDrawer},
    mixins: [Notifikasi],
    data(){
      return{
        Opendrawer: false,
        Typedrawer: 2,
        muncul: []
      }
    },
    created(){
      this.$store.dispatch('gudang/AllBelanja');
    },
    methods:{
      closedrawer(){
        return this.Opendrawer = false;
      },
      show(vl){
        var vs = this.muncul[vl];
        this.$set(this.muncul, vl , !vs);
      },
      hiden(va){
        var vs = this.muncul[va];
        this.$set(this.muncul, va , !vs);
      },
      Canceled(val, va){
        this.helper_loading("Cancel Belanja...")
        var vs = this.muncul[va];
        this.$set(this.muncul, va , !vs);
        this.$store.dispatch('gudang/CancelBelanja', val);
        return this.helper_check_request("Berhasil Menghapus Data", 'Permintaan belanja anda berhasil di cancel');
      }
    }
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
  .cursor-pointer{
    cursor: pointer;
  }
}
</style>