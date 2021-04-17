<template>
  <div class="jamaah-baru row px-3" v-show="show">
        <div class="back d-flex justify-content-start col-1" @click="backpresed">
            <i class='bx bx-left-arrow-alt ml-n3'></i>
            <h2 class="ml-1">Kembali</h2>
        </div>
        <div class="bg mt-3">
            <p>Harap Lengkapi semua form yang tersedia untuk membuat data jamaah baru <br>Semua yang diberi tanda ( <span>*</span> ) wajib di isi, lainnya bersifat on</p>
            <div class="row">
                <b-form-group id="lay-nama-mitra" class="col-md-4 col-12">
                    <label for="nama-mitra">Nama Mitra <span>*</span></label>
                    <b-form-select class="search" v-model="form.mitra_id"
                        size="sm" required id="nama-mitra" placeholder="Pilih Mitra Calon Jamaah">
                            <b-form-select-option 
                                v-for="(data,st) in $store.state.mitra.mitrall" v-bind:key="st" 
                                :value="data.id">{{data.fullname}}
                            </b-form-select-option>
                    </b-form-select>
                </b-form-group>
                <b-form-group id="lay-paket" class="col-md-4 col-12">
                    <label for="paket">Paket Umrah <span>*</span></label>
                    <b-form-select class="search" v-model="form.umrah_id"
                        size="sm" required id="paket" placeholder="Pilih Paket Umrah">
                            <b-form-select-option
                                v-for="(data,st) in $store.state.umrah.umrahall" v-bind:key="st" 
                                :value="data.id">{{data.nama}}
                            </b-form-select-option>
                    </b-form-select>
                </b-form-group>
                <b-form-group id="lay-nama-lengkap" class="col-md-4 col-12">
                    <label for="nama-lengkap">Nama Lengkap <span>*</span></label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.nama_lengkap" id="nama-lengkap" type="text" 
                        required placeholder="Masukan Nama lengkap">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-no-KTP" class="col-md-4 col-12">
                    <label for="no-KTP">No KTP <span>*</span></label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.no_ktp" id="no-KTP" type="number" 
                        required placeholder="Masukan no KTP Jamaah">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-pasport-nama" class="col-md-4 col-12">
                    <label for="pasport-nama">Nama Passport</label>
                    <b-form-input class="search" v-on:change="checkpasname" size="sm" 
                        v-model="passport.nama" id="pasport-nama" type="text" 
                        required placeholder="Masukan Nama Lengkap pada Passport">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-pasport-nama-ayah" class="col-md-4 col-12">
                    <label for="pasport-nama-ayah">Nama Ayah</label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.nama_ayah" id="nama-ayah" type="text" 
                        required placeholder="Masukan Nama Ayah Jamaah">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-passport-kota" class="col-md-4 col-12" v-show="showpassport">
                    <label for="passport-kota">Kota Passport <span>*</span></label>
                    <b-form-input class="search" size="sm" 
                        v-model="passport.kota" id="passport-kota" type="text" 
                        required placeholder="Masukan Kota pada Passport">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-passport-keluar" class="col-md-4 col-12" v-show="showpassport">
                    <label for="passport-keluar">Passport Created<span>*</span></label>
                    <b-form-datepicker class="search col my-auto" size="sm"
                        v-model="passport.tgl_keluar" id="passport-keluar"
                        required placeholder="Waktu Awal Berlaku Passport">
                    </b-form-datepicker>
                </b-form-group>
                <b-form-group id="lay-passport-habis" class="col-md-4 col-12" v-show="showpassport">
                    <label for="passport-habis">Passport Expired<span>*</span></label>
                    <b-form-datepicker class="search col my-auto" size="sm"
                        v-model="passport.tgl_habis" id="passport-habis"
                        required placeholder="Waktu Habis Berlaku Passport">
                    </b-form-datepicker>
                </b-form-group>
                <b-form-group id="lay-tgl-lahir" class="col-md-4 col-12">
                    <label for="tgl-lahir">Tempat, Tanggal Lahir<span>*</span></label>
                    <div class="d-flex">
                        <b-form-input class="search col" size="sm" 
                            v-model="ttl.tempat" id="tempat-lahir" type="text" 
                            required placeholder="Tempat Lahir">
                        </b-form-input>
                        <b-form-datepicker class="search col" size="sm"
                            v-model="ttl.tanggal" id="tgl-lahir"
                            required placeholder="Tanggal Lahir">
                        </b-form-datepicker>
                    </div>
                </b-form-group>
                <b-form-group id="lay-gender" class="col-md-4 col-12">
                    <label for="gender">Gender Jamaah <span>*</span></label>
                    <b-form-select class="search" v-model="form.gender"
                        size="sm" required :options="genderoption" id="gender" placeholder="Pilih Gender Jamaah">
                    </b-form-select>
                </b-form-group>
                <b-form-group id="lay-provinsi" class="col-md-4 col-12">
                    <label for="provinsi">Provinsi <span>*</span></label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.provinsi" id="provinsi" type="text" 
                        required placeholder="Masukan Provinsi Jamaah">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-kota" class="col-md-4 col-12">
                    <label for="kota">Kota <span>*</span></label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.kota" id="kota" type="text" 
                        required placeholder="Masukan Kota Jamaah">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-kecamatan" class="col-md-4 col-12">
                    <label for="kecamatan">Kecamatan <span>*</span></label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.kecamatan" id="kecamatan" type="text" 
                        required placeholder="Masukan Kecamatan Jamaah">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-desa" class="col-md-4 col-12">
                    <label for="desa">Desa <span>*</span></label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.desa" id="desa" type="text" 
                        required placeholder="Masukan Desa Jamaah">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-alamat" class="col-md-4 col-12">
                    <label for="alamat">Alamat Jamaah <span>*</span></label>
                    <b-form-textarea class="search" size="sm" 
                    v-model="form.alamat" id="alamat" type="text" 
                    required placeholder="Alamat Lengkap Jamaah">
                    </b-form-textarea>
                </b-form-group>
                <b-form-group id="lay-kode-pos" class="col-md-4 col-12">
                    <label for="kode-pos">Kode POS</label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.kode_pos" id="kode-pos" type="number" 
                        required placeholder="Masukan Kode Pos">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-Negara" class="col-md-4 col-12">
                    <label for="Negara">Negara Jamaah <span>*</span></label>
                    <b-form-select class="search" v-model="form.negara"
                        size="sm" required :options="negaraoption" id="Negara" placeholder="Pilih Negara Jamaah">
                    </b-form-select>
                </b-form-group>
                <b-form-group id="lay-no-tlp" class="col-md-4 col-12">
                    <label for="no-tlp">No tlp Jamaah<span>*</span></label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.no_telp" id="no-tlp" type="number" 
                        required placeholder="Masukan no tlp Jamaah">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-pendidikan" class="col-md-4 col-12">
                    <label for="pendidikan">Pendidikan <span>*</span></label>
                    <b-form-select class="search" v-model="form.pendidikan"
                        size="sm" required :options="pendidikanoption" id="pendidikan" placeholder="Pilih Pendidikan Jamaah">
                    </b-form-select>
                </b-form-group>
                <b-form-group id="lay-pekerjaan" class="col-md-4 col-12">
                    <label for="pekerjaan">Pekerjaan <span>*</span></label>
                    <b-form-select class="search" v-model="form.pekerjaan"
                        size="sm" required :options="pekerjaanoption" id="pekerjaan" placeholder="Pilih Pekerjaan Jamaah">
                    </b-form-select>
                </b-form-group>
                <b-form-group id="lay-status-haji" class="col-md-4 col-12">
                    <label for="status-haji">Status Haji <span>*</span></label>
                    <b-form-select class="search" v-model="form.status_haji"
                        size="sm" required :options="statushajioption" id="status-haji" placeholder="Status Haji Jamaah">
                    </b-form-select>
                </b-form-group>
                <b-form-group id="lay-darah" class="col-md-4 col-12">
                    <label for="darah">Gol Darah  <span>*</span></label>
                    <b-form-select class="search" v-model="form.darah"
                        size="sm" required :options="darahoption" id="gol_darah" placeholder="Gol Darah Jamaah">
                    </b-form-select>
                </b-form-group>
                <b-form-group id="lay-nama_mahram" class="col-md-4 col-12">
                    <label for="nama_mahram">Nama Mahram</label>
                    <b-form-input class="search" size="sm" 
                        v-model="form.nama_mahram" id="nama_mahram" type="text" 
                        required placeholder="Nama Mahram Jamaah">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-hub_mahram" class="col-md-4 col-12">
                    <label for="hub_mahram">Hubungan Mahram</label>
                    <b-form-select class="search" v-model="form.hubungan_mahram"
                        size="sm" required :options="huboption" id="hub_mahram" placeholder="Hubungan Mahram Jamaah">
                    </b-form-select>
                </b-form-group>
                <b-form-group id="lay-no_mahram" class="col-md-4 col-12">
                    <label for="no_mahram">No Telp Mahram</label>
                    <b-form-input class="search" size="sm" id="no_mahram" type="number" 
                        required placeholder="No tlp Mahram Jamaah">
                    </b-form-input>
                </b-form-group>
            </div>
            <div class="d-flex">
                <vs-button @click="savejamaah" size="small">Simpan Jamaah</vs-button>
                <vs-button @click="canceled" danger size="small">Cancel</vs-button>
            </div>
        </div>
  </div>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
export default {
    mixins: [Notifikasi],
    name:"JamaahDrawer",
    props:{
        show: Boolean,
    },
    data() {
        return {
            huboption:[
                {value: 'Suami', text: 'Suami'},
                {value: 'Istri', text: 'Istri'},
                {value: 'Anak', text: 'Anak'},
                {value: 'Lain-lain', text: 'Lain-lain'},
            ],
            genderoption:[
                {value: 'Pria', text: 'Laki-Laki'},
                {value: 'Wanita', text: 'Wanita'},
            ],
            darahoption: [
                {value: 'A', text: 'A'},
                {value: 'B', text: 'B'},
                {value: 'AB', text: 'AB'},
                {value: 'O', text: 'O'},
            ],
            statushajioption:[
                {value: 'Sudah', text: 'Sudah'},
                {value: 'Belum', text: 'Belum'},
            ],
            pendidikanoption:[
                {value: 'SD', text: 'SD'},
                {value: 'SMP', text: 'SMP'},
                {value: 'SMA/SLTA/MA', text: 'SMA/SLTA/MA'},
                {value: 'D1/D2/D3/SM', text: 'D1/D2/D3/SM'},
                {value: 'S1', text: 'S1'},
                {value: 'S2', text: 'S2'},
                {value: 'S3', text: 'S3'},
            ],
            pekerjaanoption:[
                {value: 'Pegawai Sipil', text: 'Pegawai Sipil'},
                {value: 'TNI/Polri', text: 'TNI/Polri'},
                {value: 'Wiraswasta', text: 'Wiraswasta'},
                {value: 'Tani/Nelayan', text: 'Tani/Nelayan'},
                {value: 'Swasta', text: 'Swasta'},
                {value: 'Ibu Rumah Tangga', text: 'Ibu Rumah Tangga'},
                {value: 'Pelajar/Mahasiswa', text: 'Pelajar/Mahasiswa'},
                {value: 'BUMN/BUMD', text: 'BUMN/BUMD'},
                {value: 'Pensiunan', text: 'Pensiunan'},
                {value: 'Lainnya', text: 'Lainnya'},
            ],
            negaraoption:[
                {value: 'Indonesia', text: 'Indonesia'},
                {value: 'Asing', text: 'Asing'},
            ],
            form:{
                mitra_id: '',
                umrah_id: '',
                nama_lengkap: '',
                nama_ayah: '',
                no_ktp: '',
                ttl: '',
                gender: '',
                negara: '',
                alamat: '',
                desa: '',
                kecamatan: '',
                kota: '',
                provinsi: '',
                kode_pos:'',
                no_telp:'',
                pendidikan:'',
                pekerjaan:'',
                passport: null,
                status_haji:'',
                nama_mahram:'',
                hubungan_mahram: '',
                darah: ''
            },
            ttl:{
                tempat:'',
                tanggal: ''
            },
            passport:{
                nama: '',
                kota: '',
                tgl_habis: '',
                tgl_keluar: '',
            },
            showpassport: false
        }
    },
    methods:{
        backpresed(){
            return this.$emit('closeable', false);
        },
        canceled(){
            return this.$emit('closeable', false);
        },
        checkpasname(value){
            if(value.length > 0){
                this.showpassport = true;
            } else {
                this.showpassport = false;
            }
        },
        savejamaah(){
            this.helper_loading("Menyimpan Jamaah Baru...");
            if(this.checkform()){
                this.helper_global_form_notif();
                console.log("disini berhenti 1");
                return this.loading.close();
            }
            if(this.passport.nama != null ||this.passport.nama != ''){
                this.form.passport = this.passport;
            } else {
                this.passport.nama = null;
                this.passport.kota = null;
                this.passport.tgl_habis = null;
                this.passport.tgl_keluar = null;
                this.form.passport = null;
            }
            this.form.ttl = this.ttl.tempat + ',' + this.ttl.tanggal;
            this.form.no_telp = parseInt(this.form.no_telp);
            console.log(this.form);
            this.$store.dispatch('jamaah/AddJamaah', this.form);
            this.helper_check_request('Berhasil Menyimpan', 'Data Jamaah baru berhasil disimpan, refresh ulang halaman apabila jamaah baru tidak muncul di table');
        },
        checkpassport(){
            return this.passport.kota.length == 0 || this.passport.tgl_habis.length == 0 || this.passport.tgl_keluar.length == 0
        },
        checkform(){
            return this.form.mitra_id.length == 0 ||this.form.umrah_id.length == 0 ||this.form.nama_lengkap.length == 0 ||
            this.form.alamat.length == 0 || this.form.no_ktp.length == 0 ||
            this.form.gender.length == 0 ||this.form.negara.length == 0 || 
            this.form.desa.length == 0 || this.form.kecamatan.length == 0 ||
            this.form.kota.length == 0 ||this.form.provinsi.length == 0 ||
            this.form.no_telp.length == 0 ||this.form.pendidikan.length == 0 || 
            this.form.pekerjaan.length == 0 || this.form.darah.length == 0 ||
            this.ttl.tempat.length == 0 ||this.ttl.tanggal.length == 0
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/fonts/font.scss";
.jamaah-baru{
    // height: 100vh;
    p, label{
        span{
            color: red;
            font-weight: 800;
        }
    }
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
    #lay-alamat{
        min-height: 40px;
    }
    // ns1.rumahweb.com
}
</style>