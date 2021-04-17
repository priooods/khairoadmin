<template>
  <div class="detail-hotel h-100">
        <div class="row">
            <div class="col">
                <div class="bg mb-2">
                    <div class="d-md-flex d-lg-flex d-xl-flex d-block justify-content-start">
                        <h6 class="my-auto mr-auto">Hotel <br><p class="mt-1">Lihat Semua data hotel yang sudah di daftarkan</p></h6>
                        <vs-button size="small my-2 col-md-3 col-12 h-100" @click="showdetail">Tambah Hotel</vs-button>
                    </div>
                    <div class="tables mt-4">
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Kota</th>
                                    <th>Alamat</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,i) in $store.state.umrah.hotelall" v-bind:key="i" @click="editingdata(data)" >
                                    <td>{{i + 1}}</td>
                                    <td>{{data.nama}}</td>
                                    <td>{{data.kota}}</td>
                                    <td>{{data.alamat}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mx-2 bg h-100">
                <h6>Maskapai <br><p>Semua Daftar Maskapai yang sudah di daftarkan</p></h6>
                <div class="d-md-flex justify-content-end" v-if="!showinputmaskapai">
                    <div class="ml-auto">
                        <vs-button size="small" @click="showinputmaskapai = !showinputmaskapai">Tambah Maskapai</vs-button>
                    </div>
                </div>
                <div v-show="showinputmaskapai" class="row mb-3">
                    <b-form-group id="lay-nama-maskapai" class="col-12">
                        <label for="maskapai">Nama Maskapai</label>
                        <b-form-input class="search" size="sm" 
                            v-model="form.nama" id="maskapai" type="text" 
                            required placeholder="Masukan Nama Maskapai">
                        </b-form-input>
                    </b-form-group>
                    <div class="col-12 d-flex">
                        <vs-button size="small" @click="simpanMaskapai">Simpan Maskapai</vs-button>
                        <vs-button danger size="small" @click="showinputmaskapai = !showinputmaskapai">Tutup</vs-button>
                    </div>
                </div>
                <ul class="list-unstyled" v-for="(dt,i) in $store.state.umrah.maskapaiall" v-bind:key="i">
                    <li><p>{{dt.nama}}</p></li>
                </ul>
                <!-- <apexchart type="donut" :options="chartOptions" :series="series"></apexchart> -->
            </div>
        </div>
    </div>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
export default {
    mixins:[Notifikasi],
    props: {
        data: null
    },
    data() {
        return {
            showinputmaskapai: false,
            form: {
                nama: ''
            }
        }
    },
    methods:{
        simpanMaskapai(){
            this.helper_loading("Menyimpan Maskapai..")
            if (this.form.nama.length == 0) {
                this.helper_global_form_notif();
                return this.loading.close();
            }
            this.$store.dispatch('umrah/AddMaskapai', this.form);
            this.helper_check_request("Berhasil Menyimpan Maskapai","Data Maskapai baru berhasil disimpan");
            return this.showinputmaskapai = false;
        },
        showdetail(){
            return this.$emit('formhotel', true);
        },
        editingdata(data){
            return this.$emit('detailhotel', data);
        }
    }
}
</script>

<style lang="scss">
.detail-hotel{
    height: 100vh;
}
</style>