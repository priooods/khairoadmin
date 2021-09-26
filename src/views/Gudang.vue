<template>
  <div class="gudang">
    <div class="w-full">
      <h1 class="hidden md:block">Gudang</h1>
      <div class="md:flex mt-4">
        <div class="md:w-4/6 w-full md:mr-2">
          <div class="bg-gray-100 py-3 px-3 md:rounded-md">
            <div class="flex justify-end" v-show="$store.state.operat.user.type === 'Operator' || $store.state.operat.user.type === 'SuperUser'
              || $store.state.operat.user.type === 'SuperExtra'">
              <p class="my-auto mr-auto">Lihat semua data gudang</p>
              <Button type="primary" @click="Opendrawer = true; Typedrawer = 1">Tambah Persediaan</Button>
            </div>
            <TableDefault :keys="'nama'" @clickrow="rowclick" :placeholder="'Cari Barang...'" 
              :totalpage="$store.state.gudang.gudang.pages ? $store.state.gudang.gudang.pages.total_pages * 10 : 0" 
              :data="gudanglist" :column="Gudang">
            </TableDefault>
          </div>
        </div>
        <div class="md:w-2/6 md:mt-0 mt-4">
          <div class="bg-gray-100 py-3 px-3 md:rounded-md">
            <p class="font-semibold">Lihat semua hitory belanja terbaru anda</p>
            <div v-if="$store.state.gudang.belanja.data">
              <ul class="list-unstyled mt-3" v-for="(data, i) in $store.state.gudang.belanja.data" v-bind:key="i">
                <li>
                  <div class="flex justify-end">
                    <p class="my-auto mr-auto text-xs">{{data.created_at | moment("DD MMMM YYYY,  hh:mm")}} WIB</p>
                    <div class="cursor-pointer" v-show="muncul[i]" @click="hiden(i)"><i class="bx bxs-up-arrow"></i></div>
                    <div class="cursor-pointer" v-show="!muncul[i]" @click="show(i)"><i class="bx bxs-down-arrow"></i></div>
                  </div>
                  <div v-show="muncul[i]">
                    <div class="grid grid-cols-2 md:gap-1 mt-3">
                      <p class="font-semibold text-xs">Total Barang</p>
                      <p class="text-xs font-semibold text-red-500">{{data.total}}</p>
                      <p class="font-semibold text-xs">Identitas</p>
                      <p class="text-xs">{{data.operator ? data.operator.fullname : "SuperUser"}}</p>
                      <p class="font-semibold text-xs">Item yang di beli :</p>
                    </div>
                    <div class="w-full mt-2 list-unstyled" v-for="(ds, i) in data.item" v-bind:key="i">
                      <div class="w-full grid grid-cols-2 gap-1">
                        <p class="text-xs">No</p>
                        <p class="text-xs">{{i + 1}}</p>
                        <p class="text-xs">Nama</p>
                        <p class="text-xs">{{ds.nama}}</p>
                        <p class="text-xs">Harga</p>
                        <p class="text-xs">{{ds.harga | currency('Rp. ')}}</p>
                        <p class="text-xs">Total</p>
                        <p class="text-xs">{{ds.total}}</p>
                      </div>
                    </div>
                    <div class="flex justify-end">
                      <Button v-show="$store.state.operat.user.type === 'Operator' || $store.state.operat.user.type === 'SuperUser'
                      || $store.state.operat.user.type === 'SuperExtra'" type="error" @click="Canceled(data.id, i)">Hapus History</Button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else>
              <p>Data History Anda Kosong</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="popGudang">
        <Modal v-model="popGudang" :footer-hide="true"  title="Ubah data gudang">
          <div class="block">
            <Form ref="form" class="grid grid-cols-2 gap-2" :inline="false" :model="detailgudang">
              <FormItem label="Nama item" prop="nama">
                  <Input v-model="detailgudang.nama" type="text" placeholder="Masukan Nama"></Input>
              </FormItem>
              <FormItem label="Stok item" prop="stok">
                  <Input v-model="detailgudang.stok" type="number" placeholder="Masukan Stok"></Input>
              </FormItem>
              <FormItem label="Harga Satuan" prop="harga">
                  <Input v-model="detailgudang.harga" type="number" placeholder="Masukan Harga"></Input>
              </FormItem>
            </Form>
            <div class="grid grid-cols-2 gap-3">
              <Button type="error" @click="hapusGudang">Hapus Item</Button>
              <Button type="primary" @click="updateGudang">Update Item</Button>
            </div>
            <Button class="w-full mt-4" type="warning" @click="popGudang = !popGudang; detailgudang = null">Kembali</Button>
          </div>
        </Modal>
      </div>
      <GudangDrawer :show.sync="Opendrawer" :type="Typedrawer" @closedrawer="closedrawer"></GudangDrawer>
    </div>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters';
import TableDefault from '../components/TableDefault';
import GudangDrawer from '../components/GudangDrawer';
import GudangData from '../plugins/GudangData';
import Notifikasi from '../model/Notifikasi';
export default {
    name: "Gudang",
    components: {GudangDrawer, TableDefault},
    mixins: [Notifikasi,GudangData,Vue2Filters.mixin],
    data(){
      return{
        Opendrawer: false,
        Typedrawer: 2,
        popGudang: false,
        detailgudang: null,
        muncul: [],
        searchtable: '',
        datatable: [],
        updatesgudang: {
          nama: '',
        }
      }
    },
    created(){
      this.$store.dispatch('gudang/AllGudang').then(() => {}).finally(() => {
        this.$store.dispatch('gudang/AllBelanja').then(() => {}).finally(() => {});
      })
    },
    methods:{
      rowclick(v){
        console.log(v,'gudang');
        this.detailgudang = v;
        this.popGudang = !this.popGudang;
      },
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
        this.$store.dispatch('gudang/CancelBelanja', val).finally(() => {
          this.loading.close();
          return this.helper_global_success_notif("Berhasil Menghapus Data", 'Permintaan belanja anda berhasil di cancel');
        });
      },
      hapusGudang(){
        this.$store.dispatch('gudang/Delete', {id: this.detailgudang.id}).finally(() => {
          this.popGudang = !this.popGudang;
          return this.helper_global_success_notif("Berhasil Menghapus Data", 'item gudang berhasil di hapus !');
        });
      },
      updateGudang(){
        this.$store.dispatch('gudang/Updated', this.detailgudang).finally(() => {
          this.popGudang = !this.popGudang;
          return this.helper_global_success_notif("Berhasil mengubah Data", 'item gudang berhasil di ubah !');
        });
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