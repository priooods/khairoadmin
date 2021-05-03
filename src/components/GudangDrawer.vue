<template>
    <transition name="fade" mode="out-in">
        <div class="gudangdrawer md:bg-gray-50 bg-white py-3 px-3" v-if="show">
            <div @click="backpresed" class="cursor-pointer hover:text-red-500">
              <i class='bx bx-left-arrow-alt inline my-auto'></i>
              <h2 class="ml-1 inline">Tutup</h2>
            </div>
            <div v-if="type == 1">
                <p class="mt-3">Tambah Persediaan Baru</p>
                <div class="mb-2 mt-3 flex items-center" v-for="(input,k) in inputs.belanja" v-bind:key="k">
                    <Input class="search col my-auto inline"
                            v-model="input.nama" id="nama" type="text" 
                            required placeholder="Nama Barang">
                        </Input>
                    <Input class="search col md:mx-2 mx-1 my-auto inline" 
                            v-model="input.total" id="total" type="number" 
                            required placeholder="Jumlah Barang">
                    </Input>
                    <Input class="search col my-auto inline" 
                            v-model="input.harga" id="harga" type="number" 
                            required placeholder="Harga Satuan">
                    </Input>
                    <div class="cursor-pointer mx-1 my-auto" @click="remove(k)" v-show="k || (!k && input.length > 1)"><i class="bx bx-minus bx-xs my-auto"></i></div>
                    <div class="cursor-pointer mx-1 my-auto" @click="add(k)" v-show="k == inputs.belanja.length - 1"><i class="bx bx-plus bx-xs my-auto"></i></div>
                </div>
                <Button type="primary" @click="sending">Simpan</Button>
            </div>
        </div>
    </transition>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
export default {
    name: "gudangdrawer",
    mixins: [Notifikasi],
    props:{
        show: Boolean,
        data: null,
        type: Number
    },
    data() {
        return{
            inputs: {
                operator_id: null,
                belanja: [
                    {
                        nama: '',
                        harga: '',
                        total: ''
                    }
                ]
            }
        }
    },
    methods:{
        add(){
            return this.inputs.belanja.push({nama: '', harga: '', total: ''})
        },
        remove(index){
            return this.inputs.belanja.splice(index, 1);
        },
        sending(){
            this.helper_loading("Mengirim Data Belanja...");
            if(this.inputs.belanja[0].nama.length == 0 
            || this.inputs.belanja[0].harga.length == 0   || this.inputs.belanja[0].total.length == 0  ){
                this.loading.close();
                return this.helper_global_form_notif();
            }
            this.$store.dispatch('gudang/AddBelanja', this.inputs);
            this.helper_check_request("Berhasil Menambah Barang", 'Data belanja anda telah disimpan. Refresh halaman apabila data belum dapat dilihat');
            return this.backpresed();
        },
        backpresed(){
            return this.$emit('closedrawer', false);
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/fonts/font.scss";
.gudangdrawer{
    position: fixed;
    right: 0;
    top: 0;
    width: 500px;
    bottom: 0;
    height: 100vh;
    overflow-y: auto;
    z-index: 2;
}
@media (max-width: 700px){
  .gudangdrawer{
    width: 100%;
  }
}
</style>