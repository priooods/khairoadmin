<template>
    <div class="Hotel">
        <div class="bg mt-3">
            <b-form class="w-100 row mt-2">
                <b-form-group id="lay-name" class="col-md-4 col-12">
                    <label for="nama">Nama Hotel</label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.nama" id="nama" type="text" 
                        required placeholder="Masukan Nama Hotel">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-name" class="col-md-4 col-12">
                    <label for="nama">Nama Kota</label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.kota" id="nama" type="text" 
                        required placeholder="Masukan Kota Hotel">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-durasi" class="col-md-4 col-12">
                    <label for="durasi">Alamat</label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.alamat" id="durasi" type="text" 
                        required placeholder="Masukan Alamat Hotel">
                    </b-form-input>
                </b-form-group>
            </b-form>
            <div class="d-flex justify-content-start">
                <vs-button size="small" @click="simpan">Simpan</vs-button>
                <vs-button danger size="small" @click="resets">Reset</vs-button>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "hotel",
    data(){
        return{
            form:{
                alamat: null,
                nama: null,
                kota: null
            }
        }
    },
    methods:{
        simpan(){
            this.$store.dispatch('umrah/AddHotel', this.form);
        },
        resets(){
            this.form.alamat = null
            this.form.nama = null
            this.form.kota = null
        }
    }
}
</script>

<style>

</style>