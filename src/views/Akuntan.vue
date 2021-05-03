<template>
  <div class="akuntan views">
      <h1 class="ml-3">History Akuntan</h1>
      <div class="bg mt-3 mx-2">
            <div class="mt-2">
                <p>Lihat semua History Pembayaran Jamaah</p>  
            </div>
            <b-form-input class="search my-3 w-100" size="sm" v-model="searchtable" type="text" placeholder="Cari History"></b-form-input>
            <div class="tables mt-1">
                <table>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th class="th-sm">Keterangan</th>
                        <th class="th-sm">Masuk</th>
                        <th class="th-sm">Saldo</th>
                        <th class="th-sm">Tanggal</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(data, i) in datatable" v-bind:key="i">
                        <td data-label="No">{{i + 1}}</td>
                        <td data-label="Keterangan">{{data.keterangan}}</td>
                        <td data-label="Masuk">{{data.masuk | currency('Rp. ')}}</td>
                        <td data-label="Saldo">{{data.saldo | currency('Rp. ')}}</td>
                        <td data-label="Tanggal">{{data.date | moment("DD MMMM YYYY") }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="totalpage" :current="1" @on-change="setPage"></Page>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters';
export default {
    mixins: [Vue2Filters.mixin],
    name: 'Akuntan',
    data() {
        return {
            searchtable: '',
            datatable: [],
        }
    },
    created(){
      this.$store.dispatch("gudang/AllAkuntan");
    },
    computed:{
      listaccess(){
        return this.$store.state.gudang.akuntan;
      },
      totalpage(){
        return this.listaccess.length/5 * 10
      },
    },
    mounted(){
      this.setPage(1);
    },
    watch:{
      searchtable: function (value){
        const search = value.toLowerCase().trim();
        if (!search) return this.setPage(1);
        return this.datatable = this.listaccess.filter(c => c.keterangan.toLowerCase().indexOf(search) > -1); 
      }
    },
    methods: {
        setPage(val){
        return this.datatable = this.listaccess.slice((val - 1) * 5, val * 5);
      },
    },
}
</script>

<style>

</style>