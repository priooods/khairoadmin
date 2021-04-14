<template>
  <div class="tglberangkat">
    <b-form class="w-100 row mt-2" v-show="showinput">
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
    </b-form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>