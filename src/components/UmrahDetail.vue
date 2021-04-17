<template>
    <div class="detail-umrah">
        <div class="row">
            <div class="bg col mx-2">
                <div class="row">
                    <p class="col my-auto">Lihat semua data paket umrah</p>
                    <vs-button class="col-md-2 mx-3" size="small" @click="opendetail">Tambah Paket</vs-button>
                </div>
                <div class="tables mt-3">
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
                            <tr v-for="(dt, i) in $store.state.umrah.umrahall" v-bind:key="i">
                                <td data-label="No">{{i + 1}}</td>
                                <td data-label="Nama">{{dt.nama}}</td>
                                <td data-label="Durasi">{{dt.durasi}}</td>
                                <td data-label="Tahun">{{dt.tahun}}</td>
                                <td data-label="Paket">{{dt.paket}}</td>
                                <td data-label="Harga">{{dt.harga}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UmrahDetail",
    methods: {
        opendetail(){
            return this.$emit('formumrah', true);
        },
    },
}
</script>

<style lang="scss">

</style>