<template>
    <div class="umrahlay bg mt-3">
        <b-form class="w-100 row mt-2">
            <b-form-group id="lay-name" class="col-md-4 col-12">
                <label for="nama">Nama Paket</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.nama" id="nama" type="text" 
                    required placeholder="Masukan Nama Paket">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-durasi" class="col-md-4 col-12">
                <label for="durasi">Durasi</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.durasi" id="durasi" type="number" 
                    required placeholder="Masukan Durasi Paket">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-jenis_paket" class="col-md-4 col-12">
                <label for="jenis_paket">Nama Jenis Paket</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.jenis_paket" id="jenis_paket" type="text" 
                    required placeholder="Masukan Jenis Paket">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-tahun" class="col-md-4 col-12">
                <label for="tahun">Tahun</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.tahun" id="tahun" type="number" 
                    required placeholder="Masukan Tahun">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-kuota" class="col-md-4 col-12">
                <label for="kuota">Kuota Paket</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.kuota" id="kuota" type="number" 
                    required placeholder="Masukan Kuota Paket">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-biaya" class="col-md-4 col-12">
                <label for="biaya">Biaya Paket</label>
                <b-form-input class="search" size="sm" 
                    v-model="form.biaya" id="biaya" type="number" 
                    required placeholder="Masukan biaya Paket">
                </b-form-input>
            </b-form-group>
            <b-form-group id="lay-biaya" class="col-md-4 col-12">
                <label for="biaya">Tanggal Berangkat</label>
                <b-form-input class="search col my-auto" size="sm"
                    v-model="form.tanggal" id="nama" type="text" 
                    required placeholder="Tanggal Berangkat Umrah">
                </b-form-input>
            </b-form-group>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'umrahlay',
    data(){
        return{
            form: {},
        }
    },
}
</script>

<style>

</style>