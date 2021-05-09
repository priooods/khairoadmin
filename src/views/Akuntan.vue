<template>
  <div class="akuntan">
      <div v-show="!drawer">
        <h1 class="hidden md:block">History Akuntan</h1>
        <div class="flex justify-end mt-5">
          <Button type="primary" @click="drawer = !drawer">Buat Laporan</Button>
        </div>
        <div class="bg-gray-100 mt-5 md:mt-3 md:p-3 p-2">
          <div class="flex justify-end">
            <p class="md:mr-auto hidden md:block">Lihat semua History Pembayaran Jamaah</p>
            <Button type="info" @click="panduan = true">Panduan</Button>
          </div>
          <TableGlobal :data="akuntanlist" :placeholder="'Cari Keterangan'" :key="'keterangan'" :totalpage="$store.state.gudang.akuntan.length/5 * 10" :column="Akuntan"></TableGlobal>
        </div>
      </div>
      <AkuntanDrawer :show="drawer" @closeable="closedrawer"></AkuntanDrawer>
      <Modal v-model="panduan" @on-ok="panduan = false" title="Panduan Akuntan" ok-text="OK" cancel-text="Cancel">
        <h2 class="text-xs font-bold">Column</h2>
        <div class="flex w-full mt-2">
            <p>1</p>
            <p class="text-xs ml-2">Pada Column Saldo Akhir, yang diberikan tanda berwarna <span class="text-green-500">Hijau</span> merupakan saldo akhir anda saat ini</p>
        </div>
        <div class="flex w-full mt-2">
            <p>2</p>
            <p class="text-xs ml-2">Pada Column Saldo Masuk, yang diberikan tanda berwarna <span class="text-green-500">Hijau</span> merupakan saldo yang masuk terakhir kali</p>
        </div>
      </Modal>
  </div>
</template>

<script>
import TableGlobal from '../components/TableGlobal';
import TableData from '../plugins/TableData';
import Vue2Filters from 'vue2-filters';
import AkuntanDrawer from '../components/AkuntanDrawer';
export default {
    mixins: [Vue2Filters.mixin,TableData],
    components: {TableGlobal, AkuntanDrawer},
    name: 'Akuntan',
    data() {
        return {
            panduan: false,
            drawer: false
        }
    },
    created(){
      this.$store.dispatch("gudang/AllAkuntan");
    },
    methods: {
      closedrawer(value){
        return this.drawer = value
      }
    },
}
</script>

<style>
.ivu-table .akuntan-style-green {
    background: #05ac56 !important;
    color: #fff;
}
</style>
