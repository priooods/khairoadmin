<template>
  <div class="jamaahnew md:mt-0 mt-3" v-show="show == 2">
        <div class="cursor-pointer hover:text-yellow-500" @click="backpresed">
            <i class='bx bx-left-arrow-alt inline'></i>
            <h2 class="ml-1 inline">Kembali</h2>
        </div>
        <div class="w-full mt-5 md:mt-3">
            <p class="text-xs">Harap Lengkapi semua form yang tersedia untuk membuat data jamaah baru !</p>
            <Form class="grid md:grid-cols-4 md:gap-1 mt-3" :model="form" ref="form" :rules="formrules">
                <FormItem prop="mitra_id" label="Nama Perwakilan">
                    <Select placeholder="Pilih Perwakilan" v-model="form.mitra_id" filterable :clearable="true">
                        <Option v-for="(data,st) in $store.state.mitra.mitrall" v-bind:key="st" :value="data.id">{{ data.fullname }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="umrah_id" label="Paket Umrah">
                    <Select placeholder="Pilih Paket Umrah" v-model="form.umrah_id" filterable :clearable="true">
                        <Option v-for="(data,st) in $store.state.umrah.umrahall" v-bind:key="st" :value="data.id">{{ data.nama }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="kaps_kamar" label="Pilihan Kamar" v-show="showkamar">
                    <Input type="text" v-model="form.kapasitas_kamar" placeholder="Pilihan Kamar jamaah"></Input>
                </FormItem>
                <FormItem prop="harga_kamar" label="Harga Kamar" v-show="showkamar">
                    <Input type="number" v-model="form.harga_kamar" placeholder="Harga Kamar jamaah"></Input>
                </FormItem>
                <FormItem prop="nama_lengkap" label="Nama Lengkap">
                    <Input type="text" v-model="form.nama_lengkap" placeholder="Nama Lengkap jamaah"></Input>
                </FormItem>
                <FormItem prop="no_ktp" label="No KTP">
                    <Input type="number" v-model="form.no_ktp" placeholder="No KTP jamaah"></Input>
                </FormItem>
                <FormItem prop="nama_passport" label="Nama Passport">
                    <Input type="text" v-model="form.passport.nama" placeholder="Nama Passport jamaah"></Input>
                </FormItem>
                <FormItem prop="no_passport" label="No Passport" v-if="showpassport">
                    <Input type="number" v-model="form.passport.nomor" placeholder="No Passport jamaah"></Input>
                </FormItem>
                <FormItem prop="kota_passport" label="Kota Passport" v-if="showpassport">
                    <Input type="text" v-model="form.passport.kota" placeholder="Kota Passport jamaah"></Input>
                </FormItem>
                <FormItem prop="keluar_passport" label="Diterbitkan Passport" v-if="showpassport">
                    <DatePicker type="date" v-model="form.passport.tgl_keluar" placeholder="Diterbitkan Passport jamaah" class="w-full"></DatePicker>
                </FormItem>
                <FormItem prop="habis_passport" label="Expired Passport" v-if="showpassport">
                    <DatePicker type="date" v-model="form.passport.tgl_habis" placeholder="Expired Passport jamaah" class="w-full"></DatePicker>
                </FormItem>
                <FormItem prop="nama_ayah" label="Nama Ayah">
                    <Input type="text" v-model="form.nama_ayah" placeholder="Nama Ayah jamaah"></Input>
                </FormItem>
                <FormItem prop="ttl.tempat" label="Tempat Lahir">
                    <Input type="text" v-model="form.ttl.tempat" placeholder="Tempat Lahir jamaah"></Input>
                </FormItem>
                <FormItem prop="ttl.tanggal" label="Tanggal Lahir">
                    <DatePicker type="date" v-model="form.ttl.tanggal" placeholder="Tanggal Lahir jamaah" class="w-full"></DatePicker>
                </FormItem>
                <FormItem prop="gender" label="Gender Jamaah">
                    <Select placeholder="Pilih Gender Jamaah" :clearable="true" v-model="form.gender">
                        <Option v-for="(data,st) in genderoption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="provinsi" label="Provinsi">
                    <Input type="text" v-model="form.provinsi" placeholder="Provinsi Jamaah"></Input>
                </FormItem>
                <FormItem prop="kota" label="Kota">
                    <Input type="text" v-model="form.kota" placeholder="Kota Jamaah"></Input>
                </FormItem>
                <FormItem prop="kecamatan" label="Kecamatan">
                    <Input type="text" v-model="form.kecamatan" placeholder="Kecamatan Jamaah"></Input>
                </FormItem>
                <FormItem prop="desa" label="Desa/Kelurahan">
                    <Input type="text" v-model="form.desa" placeholder="Desa/Kelurahan Jamaah"></Input>
                </FormItem>
                <FormItem prop="alamat" label="Alamat">
                    <Input type="textarea" :autosize="true" v-model="form.alamat" placeholder="Alamat Jamaah"></Input>
                </FormItem>
                <FormItem prop="kode_pos" label="Kode Pos">
                    <Input type="number" v-model="form.kode_pos" placeholder="Kode Pos Jamaah"></Input>
                </FormItem>
                <FormItem prop="negara" label="Negara Jamaah">
                    <Select placeholder="Pilih Negara Jamaah"  :clearable="true" v-model="form.negara">
                        <Option v-for="(data,st) in negaraoption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="no_telp" label="No Telp">
                    <Input type="number" v-model="form.no_telp" placeholder="No Telp Jamaah"></Input>
                </FormItem>
                <FormItem prop="email" label="E-mail">
                    <Input type="text" v-model="form.email" placeholder="e-mail Jamaah"></Input>
                </FormItem>
                <FormItem prop="pendidikan" label="Pendidikan">
                    <Select placeholder="Pilih Pendidikan Jamaah" v-model="form.pendidikan" filterable :clearable="true">
                        <Option v-for="(data,st) in pendidikanoption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="pekerjaan" label="Pekerjaan">
                    <Select placeholder="Pilih pekerjaan Jamaah" v-model="form.pekerjaan" filterable :clearable="true">
                        <Option v-for="(data,st) in pekerjaanoption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="status_haji" label="Status Haji">
                    <Select placeholder="Status Haji Jamaah"  :clearable="true" v-model="form.status_haji">
                        <Option v-for="(data,st) in statushajioption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="darah" label="Golongan Darah">
                    <Select placeholder="Golongan Darah Jamaah"  :clearable="true" v-model="form.darah">
                        <Option v-for="(data,st) in darahoption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="nama_mahram" label="Nama Mahram">
                    <Input type="text" v-model="form.nama_mahram" placeholder="Nama Mahram Jamaah"></Input>
                </FormItem>
                <FormItem prop="hubungan_mahram" label="Hubungan Mahram">
                    <Select placeholder="Hubungan Mahram Jamaah"  :clearable="true" v-model="form.hubungan_mahram">
                        <Option v-for="(data,st) in huboption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="no_tlp" label="No Telp Mahram">
                    <Input type="number" placeholder="No Telp Mahram Jamaah"></Input>
                </FormItem>
            </Form>
            <div class="mt-3 flex">
                <Button @click="savejamaah" type="primary">Simpan Jamaah</Button>
                <Button @click="canceled" class="ml-2" type="error">Cancel</Button>
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
        show: Number,
    },
    data() {
        const validateMitra = (rule, value, callback) => {
            if(value == null || value == ''){
                callback(new Error('Harap pilih Perwakilan'));
            }
            callback();
        };
        const validateUmrah = (rule, value, callback) => {
            if(value == null || value == ''){
                callback(new Error('Harap pilih Paket Umrah'));
            }
            callback();
        };
        return {
            huboption:[
                {value: 'Suami', label: 'Suami'},
                {value: 'Istri', label: 'Istri'},
                {value: 'Anak', label: 'Anak'},
                {value: 'Lain-lain', label: 'Lain-lain'},
            ],
            genderoption:[
                {value: 'Pria', label: 'Pria'},
                {value: 'Wanita', label: 'Wanita'},
            ],
            darahoption: [
                {value: 'A', label: 'A'},
                {value: 'B', label: 'B'},
                {value: 'AB', label: 'AB'},
                {value: 'O', label: 'O'},
            ],
            statushajioption:[
                {value: 'Sudah', label: 'Sudah'},
                {value: 'Belum', label: 'Belum'},
            ],
            pendidikanoption:[
                {value: 'SD', label: 'SD'},
                {value: 'SMP', label: 'SMP'},
                {value: 'SMA/SLTA/MA', label: 'SMA/SLTA/MA'},
                {value: 'D1/D2/D3/SM', label: 'D1/D2/D3/SM'},
                {value: 'S1', label: 'S1'},
                {value: 'S2', label: 'S2'},
                {value: 'S3', label: 'S3'},
            ],
            pekerjaanoption:[
                {value: 'Pegawai Sipil', label: 'Pegawai Sipil'},
                {value: 'TNI/Polri', label: 'TNI/Polri'},
                {value: 'Wiraswasta', label: 'Wiraswasta'},
                {value: 'Tani/Nelayan', label: 'Tani/Nelayan'},
                {value: 'Swasta', label: 'Swasta'},
                {value: 'Ibu Rumah Tangga', label: 'Ibu Rumah Tangga'},
                {value: 'Pelajar/Mahasiswa', label: 'Pelajar/Mahasiswa'},
                {value: 'BUMN/BUMD', label: 'BUMN/BUMD'},
                {value: 'Pensiunan', label: 'Pensiunan'},
                {value: 'Lainnya', label: 'Lainnya'},
            ],
            negaraoption:[
                {value: 'Indonesia', label: 'Indonesia'},
                {value: 'Asing', label: 'Asing'},
            ],
            form:{
                mitra_id: '',
                umrah_id: '',
                nama_lengkap: '',
                nama_ayah: '',
                no_ktp: '',
                ttl: {
                    tempat: '',
                    tanggal: ''
                },
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
                passport: {
                    nama: '',
                    kota: '',
                    tgl_habis: '',
                    nomor: '',
                    tgl_keluar: '',
                },
                status_haji:'',
                nama_mahram:'',
                hubungan_mahram: '',
                darah: '',
                email: ''
            },
            showpassport: false,
            showkamar:false,
            formrules:{
                nama_lengkap: [
                    { required: true, message: 'Harap Lengkapi Nama Lengkap', trigger: 'blur' }
                ],
                desa: [
                    { required: true, message: 'Harap Lengkapi Desa/Kelurahan', trigger: 'blur' }
                ],
                alamat: [
                    { required: true, message: 'Harap Lengkapi Alamat', trigger: 'blur' }
                ],
                mitra_id: [
                    { validator:validateMitra, required: true, trigger: 'change' }
                ],
                umrah_id: [
                    { required: true, validator:validateUmrah, trigger: 'change' }
                ],
                gender: [
                    { required: true, message: 'Harap Pilih Gender', trigger: 'change' }
                ],
                nama_ayah: [
                    { required: true, message: 'Harap Masukan Nama Ayah', trigger: 'blur' }
                ],
                provinsi: [
                    { required: true, message: 'Harap Masukan Provinsi', trigger: 'blur' }
                ],
                kota: [
                    { required: true, message: 'Harap Masukan Kota', trigger: 'blur' }
                ],
                kecamatan: [
                    { required: true, message: 'Harap Masukan Kecamatan', trigger: 'blur' }
                ],
                no_ktp: [
                    { required: true, message: 'Harap Masukan No Ktp', trigger: 'blur' },
                    { type: 'string', min: 16, message: 'No Ktp minimal 16 Char', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Harap Masukan Email Jamaah', trigger: 'blur' },
                    { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                ],
                negara: [
                    { required: true, message: 'Harap Pilih Negara', trigger: 'change' }
                ],
                kode_pos: [
                    { required: true, message: 'Harap Masukan Kode Pos', trigger: 'blur' }
                ],
                no_telp: [
                    { required: true, message: 'Nomer Handphone is Required', trigger: 'blur' },
                    { type: 'string', min: 9, message: 'No Handphone minimal 9 Char', trigger: 'blur' }
                ],
                pendidikan: [
                    { required: true, message: 'Pendidikan is Required', trigger: 'change' }
                ],
                pekerjaan: [
                    { required: true, message: 'Pekerjaan is Required', trigger: 'change' }
                ],
                darah: [
                    { required: true, message: 'Golongan Darah is Required', trigger: 'change' }
                ],
                'ttl.tempat': [
                    { required: true, message: 'Tempat Lahir Required', trigger: 'blur' }
                ],
                'ttl.tanggal': [
                    { required: true, type:'date', message: 'Tempat Lahir Required', trigger: 'change' }
                ],
            }
        }
    },
    watch:{
        namapass: function(value) {
            if (value.length == 0) {
                return this.showpassport = false
            }
            return this.showpassport = true 
        },
        umrah: function(value){
            if (value == null) {
                return this.showkamar = false
            }
            return this.showkamar = true 
        },
    },
    computed:{
        namapass(){
            return this.form.passport.nama;
        },
        umrah(){
            return this.form.umrah_id;
        },
    },
    methods:{
        backpresed(){
            return this.canceled();
        },
        canceled(){
            return this.$emit('closeable', 1);
        },
        savejamaah(){
            // this.helper_loading("Menyimpan Jamaah Baru...");
            this.$refs['form'].validate((valid) => {
                if(valid){
                    console.log("Berhasil");
                    return true;
                } else {
                    return false
                }
            })
            //     this.passport.nama = null;
            //     this.passport.kota = null;
            //     this.passport.tgl_habis = null;
            //     this.passport.tgl_keluar = null;
            //     this.form.passport = null;
            // }
            // this.form.ttl = this.ttl.tempat + ',' + this.ttl.tanggal;
            // this.form.no_telp = parseInt(this.form.no_telp);
            // this.$store.dispatch('jamaah/AddJamaah', this.form);
            // this.helper_check_request('Berhasil Menyimpan', 'Data Jamaah baru berhasil disimpan, refresh ulang halaman apabila jamaah baru tidak muncul di table');
        },
    }
}
</script>