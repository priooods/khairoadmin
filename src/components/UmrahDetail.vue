<template>
    <div class="detail-umrah">
        <div class="bg-gray-50 md:p-3 p-2">
            <div class="md:flex justify-end">
                <p class="my-auto mr-auto">Lihat semua data paket umrah</p>
                <Button type="primary" @click="opendetail">Tambah Paket</Button>
            </div>
            <TableGlobal 
                :column="Umrah" :keys="'nama'" 
                :pagination="$store.state.umrah.umrahall/5*10" 
                :placeholder="'Cari Nama Umrah...'" :data="umrahlist">
            </TableGlobal>
        </div>
    </div>
</template>

<script>
import TableGlobal from '../components/TableGlobal';
import TableData from '../plugins/TableData';
import Vue2Filters from 'vue2-filters'
export default {
    mixins: [Vue2Filters.mixin, TableData],
    components: {TableGlobal},
    name: "UmrahDetail",
    methods: {
        opendetail(){
            return this.$emit('formumrah', true);
        },
        showdetail(value){
            return this.$emit('showdata', value);
        }
    },
}
</script>
