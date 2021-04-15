<template>
    <transition name="fade" mode="out-in">
        <div class="gudangdrawer py-3 px-3" v-if="show">
            <div class="back d-flex justify-content-start col-1" @click="backpresed">
              <i class='bx bx-left-arrow-alt ml-n3'></i>
              <h2 class="ml-1">Tutup</h2>
            </div>
            <div v-if="type == 1">
                <p>Tambah Persediaan Baru</p>
                <div class="row mx-1 mb-2" v-for="(input,k) in inputs.belanja" v-bind:key="k">
                    <b-form-input class="search col my-auto" size="sm"
                            v-model="input.nama" id="nama" type="text" 
                            required placeholder="Nama Barang">
                        </b-form-input>
                    <b-form-input class="search col mx-2 my-auto" size="sm" 
                            v-model="input.total" id="total" type="number" 
                            required placeholder="Jumlah Barang">
                    </b-form-input>
                    <b-form-input class="search col my-auto" size="sm" 
                            v-model="input.harga" id="harga" type="number" 
                            required placeholder="Harga Satuan">
                    </b-form-input>
                    <div class="col-1 pointers" @click="remove(k)" v-show="k || (!k && input.length > 1)"><i class="bx bx-minus"></i></div>
                    <div class="col-1 pointers" @click="add(k)" v-show="k == inputs.belanja.length - 1"><i class="bx bx-plus"></i></div>
                </div>
                <vs-button block class="w-100 h-50 mt-4" @click="sending" size="small" square>Simpan</vs-button>
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
            if(this.inputs.belanja.nama == null || this.inputs.belanja.harga == null  || this.inputs.belanja.total == null ){
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
    width: 400px;
    bottom: 0;
    height: 100vh;
    overflow-y: auto;
    z-index: 2;
    h1{
        font-size: 16px;
        font-family: $font-bold;
    }
    .back{
        h2{
        font-size: 14px;
        font-family: $font-bold;
        }
    }
    .back:hover{
        color: $yellow;
        cursor: pointer;
        h2{
        color: $yellow;
        }
    }
    .pointers{
        cursor: pointer;
    }
}
@media (max-width: 700px){
  .gudangdrawer{
    width: 100%;
  }
}
</style>