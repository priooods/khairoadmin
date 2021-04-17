<template>
    <div class="detail-umrah h-100">
        <div class="row">
            <div class="bg col mx-2">
                <div class="row">
                    <p class="col my-auto">Lihat semua data paket umrah</p>
                    <vs-button class="col-md-2 mx-3" size="small" @click="opendetail">Tambah Paket</vs-button>
                </div>
                <b-form-input class="search my-3 w-100" size="sm" v-model="searching" type="text" placeholder="Cari Nama Umrah ..."></b-form-input>
                <div class="tables mt-3">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Code</th>
                                <th>Nama</th>
                                <th>Durasi</th>
                                <th>Tahun</th>
                                <th>Paket</th>
                                <th>Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(dt, i) in filteredUmrah" v-bind:key="i" @click="showdetail(dt)">
                                <td data-label="No">{{i + 1}}</td>
                                <td data-label="Nama">{{dt.code}}</td>
                                <td data-label="Nama">{{dt.nama}}</td>
                                <td data-label="Durasi">{{dt.durasi}}</td>
                                <td data-label="Tahun">{{dt.tahun}}</td>
                                <td data-label="Paket">{{dt.jenis_paket}}</td>
                                <td data-label="Harga">{{dt.biaya | currency('Rp. ')}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'
export default {
    mixins: [Vue2Filters.mixin],
    name: "UmrahDetail",
    methods: {
        opendetail(){
            return this.$emit('formumrah', true);
        },
        showdetail(value){
            return this.$emit('showdata', value);
        }
    },
    data() {
        return {
            searching: ''
        }
    },
    computed:{
      listUmrah(){
        return this.$store.state.umrah.umrahall;
      },
      filteredUmrah() {
        const search = this.searching.toLowerCase().trim();
        if (!search) return this.listUmrah;
        return this.listUmrah.filter(c => c.nama.toLowerCase().indexOf(search) > -1);
      },
    },
}
</script>

<style lang="scss">

</style>