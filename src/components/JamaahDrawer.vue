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
                        <Option v-for="(data,st) in umrahlisting" v-bind:key="st" :value="data.id">{{ data.nama }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="kapasitas" label="Pilihan Kamar" v-show="showkamar">
                    <Select placeholder="Pilih Paket Umrah" v-model="form.kapasitas" :clearable="true">
                        <Option v-for="(data,kmr) in kamarKapasitas" v-bind:key="kmr" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="nama_lengkap" label="Nama Lengkap">
                    <Input type="text" v-model="form.nama_lengkap" placeholder="Nama Lengkap jamaah"></Input>
                </FormItem>
                <FormItem prop="no_ktp" label="No KTP">
                    <Input type="number" :maxlength="16" v-model="form.no_ktp" placeholder="No KTP jamaah"></Input>
                </FormItem>
                <FormItem prop="passport.nomor" label="No Passport">
                    <Input type="text" :maxlength="8" v-model="form.passport.nomor" placeholder="No Passport jamaah"></Input>
                </FormItem>
                <FormItem prop="passport.nama" label="Nama Passport">
                    <Input type="text" v-model="form.passport.nama" placeholder="Nama Passport jamaah"></Input>
                </FormItem>
                <FormItem prop="passport.kota" label="Kota Passport">
                    <Input type="text" v-model="form.passport.kota" placeholder="Kota Passport jamaah"></Input>
                </FormItem>
                <FormItem prop="passport.tgl_keluar" label="Diterbitkan Passport">
                    <DatePicker type="date" @on-change="changetgl" :clearable="true" v-model="form.passport.tgl_keluar" placeholder="Diterbitkan Passport jamaah" class="w-full"></DatePicker>
                </FormItem>
                <FormItem prop="passport.tgl_habis" label="Expired Passport">
                    <DatePicker type="date" @on-change="changetglexpired" :clearable="true" v-model="form.passport.tgl_habis" placeholder="Expired Passport jamaah" class="w-full"></DatePicker>
                </FormItem>
                <FormItem prop="nama_ayah" label="Nama Ayah" >
                    <Input type="text" v-model="form.nama_ayah" :disabled="disabled" placeholder="Nama Ayah jamaah"></Input>
                </FormItem>
                <FormItem prop="tempat" label="Tempat Lahir">
                    <Input type="text" v-model="ttl.tempat" :disabled="disabled" placeholder="Tempat Lahir jamaah"></Input>
                </FormItem>
                <FormItem prop="tanggal" label="Tanggal Lahir">
                    <DatePicker type="date" v-model="ttl.tanggal" :disabled="disabled" format="DD/MM/yyyy" placeholder="Tanggal Lahir jamaah" class="w-full"></DatePicker>
                </FormItem>
                <FormItem prop="gender" label="Gender Jamaah">
                    <Select placeholder="Pilih Gender Jamaah" :disabled="disabled" :clearable="true" v-model="form.gender">
                        <Option v-for="(data,st) in genderoption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="provinsi" label="Provinsi">
                    <Input type="text" :disabled="disabled" v-model="form.provinsi" placeholder="Provinsi Jamaah"></Input>
                </FormItem>
                <FormItem prop="kota" label="Kota">
                    <Input type="text" :disabled="disabled" v-model="form.kota" placeholder="Kota Jamaah"></Input>
                </FormItem>
                <FormItem prop="kecamatan" label="Kecamatan">
                    <Input type="text" :disabled="disabled" v-model="form.kecamatan" placeholder="Kecamatan Jamaah"></Input>
                </FormItem>
                <FormItem prop="desa" label="Desa/Kelurahan">
                    <Input type="text" :disabled="disabled" v-model="form.desa" placeholder="Desa/Kelurahan Jamaah"></Input>
                </FormItem>
                <FormItem prop="alamat" label="Alamat">
                    <Input type="textarea" :disabled="disabled" :autosize="true" v-model="form.alamat" placeholder="Alamat Jamaah"></Input>
                </FormItem>
                <FormItem prop="kode_pos" label="Kode Pos">
                    <Input type="number" :disabled="disabled" v-model="form.kode_pos" placeholder="Kode Pos Jamaah"></Input>
                </FormItem>
                <FormItem prop="negara" label="Negara Jamaah">
                    <Select placeholder="Pilih Negara Jamaah" :disabled="disabled"  :clearable="true" v-model="form.negara">
                        <Option v-for="(data,st) in negaraoption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="no_telp" label="No Telp">
                    <Input type="number" :disabled="disabled" :maxlength="13" v-model="form.no_telp" placeholder="No Telp Jamaah"></Input>
                </FormItem>
                <FormItem prop="email" label="E-mail">
                    <Input type="text" :disabled="disabled" v-model="form.email" placeholder="e-mail Jamaah"></Input>
                </FormItem>
                <FormItem prop="pendidikan" label="Pendidikan">
                    <Select placeholder="Pilih Pendidikan Jamaah" :disabled="disabled" v-model="form.pendidikan" filterable :clearable="true">
                        <Option v-for="(data,st) in pendidikanoption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="pekerjaan" label="Pekerjaan">
                    <Select placeholder="Pilih pekerjaan Jamaah" :disabled="disabled" v-model="form.pekerjaan" filterable :clearable="true">
                        <Option v-for="(data,st) in pekerjaanoption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="status_haji" label="Status Haji">
                    <Select placeholder="Status Haji Jamaah" :disabled="disabled" :clearable="true" v-model="form.status_haji">
                        <Option v-for="(data,st) in statushajioption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="darah" label="Golongan Darah">
                    <Select placeholder="Golongan Darah Jamaah" :disabled="disabled" :clearable="true" v-model="form.darah">
                        <Option v-for="(data,st) in darahoption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="nama_mahram" label="Nama Mahram">
                    <Input type="text" v-model="form.nama_mahram" :disabled="disabled" placeholder="Nama Mahram Jamaah"></Input>
                </FormItem>
                <FormItem prop="hubungan_mahram" label="Hubungan Mahram">
                    <Select placeholder="Hubungan Mahram Jamaah" :disabled="disabled" :clearable="true" v-model="form.hubungan_mahram">
                        <Option v-for="(data,st) in huboption" v-bind:key="st" :value="data.value">{{ data.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="no_tlp" label="No Telp Mahram">
                    <Input type="number" :maxlength="12" :disabled="disabled" placeholder="No Telp Mahram Jamaah"></Input>
                </FormItem>
            </Form>
            <div class="mt-3 flex">
                <Button @click="savejamaah" :disabled="disabled" type="primary">Simpan Jamaah</Button>
                <Button @click="canceled" class="ml-2" type="error">Cancel</Button>
            </div>
        </div>
  </div>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
import moment from 'moment-timezone';
export default {
    mixins: [Notifikasi],
    name:"JamaahDrawer",
    props:{
        show: Number,
    },
    data() {
        const validateMitra = (value, callback) => {
            if(value == null || value == ''){
                callback(new Error('Harap pilih Perwakilan'));
            }
            callback();
        };
        const validateUmrah = (value, callback) => {
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
            kamarKapasitas:[
                {value: '1', label: '1'},
                {value: '2', label: '2'},
                {value: '3', label: '3'},
                {value: '4', label: '4'},
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
                ttl: null,
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
                email: '',
                kapasitas: '',
            },
            ttl: {
                tanggal: '',
                tempat: ''
            },
            disabled: true,
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
                    { type: 'string', min: 16, max:16, message: 'No Ktp Harus 16 Char', trigger: 'blur' }
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
                    { type: 'string', min: 9, max:12, message: 'No Handphone Min 9 & Max 12 Char', trigger: 'blur' }
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
                kapasitas: [
                    { required: true, message: 'Kapasitas Kamar Required', trigger: 'change' }
                ],
                'kamar.harga_kamar': [
                    { required: true, message: 'Harga Kamar Required', trigger: 'blur' }
                ],
                'passport.nomor': [
                    { required: true, message: 'Nomor Passport Required', trigger: 'blur' },
                    { type: 'string', min: 7, max:7, message: 'No Passport Min & Max 7 Char', trigger: 'blur' }
                ],
                'passport.nama': [
                    { required: true, message: 'Nama Passport Required', trigger: 'blur' }
                ],
                'passport.kota': [
                    { required: true, message: 'Kota Passport Required', trigger: 'blur' }
                ],
                'passport.tgl_keluar': [
                    { required: true, type:'date', message: 'Tanggal Keluar Passport Required', trigger: 'change' }
                ],
                'passport.tgl_habis': [
                    { required: true, type:'date', message: 'Tanggal Expired Passport Required', trigger: 'change' }
                ],
            }
        }
    },
    watch:{
        namapass: function(value) {
            if (value.length == 0) {
                this.form.passport.kota = '';
                this.form.passport.tgl_habis = '';
                this.form.passport.tgl_keluar = '';
                this.form.passport.nama = '';
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
            return this.form.passport.nomor;
        },
        umrah(){
            return this.form.umrah_id;
        },
        umrahlisting(){
            return this.$store.state.umrah.umrahall.filter((e => {
                return e.sisa != 0 && moment(e.jadwal.berangkat).isAfter(moment().format("yyyy-MM-DD")) && moment(e.jadwal.pulang).isAfter(moment().format("yyyy-MM-DD")) ;
            }));
        }
    },
    methods:{
        checkexpired(dt1,dt2){
            const yr = (new Date(dt2).getFullYear() - new Date(dt1).getFullYear());
            const month = ((new Date(dt2).getMonth() + 1) - (new Date(dt1).getMonth() + 1));
            if(month >= 6 || yr >= 1) {
                return this.disabled = false;
            }
            this.$Message.error({duration: 4,content:'Masa Berlaku Passport Kurang dari 6 Bulan'});
            return this.disabled = true;
        },
        changetgl(value){
            if(value == ''){
                this.$Message.error({duration: 4,content:'Masa Berlaku Passport Kurang dari 6 Bulan'});
                return this.disabled = true;
            }
            this.form.passport.tgl_habis = '';
            return value;
        },
        changetglexpired(value){
            this.checkexpired(this.form.passport.tgl_keluar, value);
        },
        backpresed(){
            return this.canceled();
        },
        canceled(){
            return this.$emit('closeable', 1);
        },
        savejamaah(){
            this.helper_loading("Menyimpan Jamaah Baru...");
            this.$refs['form'].validate((valid) => {
                if(valid){
                    const tgl = new moment(this.ttl.tanggal).format("yyyy/MM/DD");
                    this.form.ttl = this.ttl.tempat + ',' + tgl;
                    console.log(this.form.ttl);
                    this.form.passport.tgl_habis =  new moment(this.form.passport.tgl_habis).format("yyyy/MM/DD");
                    this.form.passport.tgl_keluar =  new moment(this.form.passport.tgl_keluar).format("yyyy/MM/DD");
                    this.$store.dispatch('jamaah/AddJamaah', this.form);
                    return this.helper_check_request('Berhasil Menyimpan', 'Data Jamaah baru berhasil disimpan, refresh ulang halaman apabila jamaah baru tidak muncul di table');
                } else {
                    this.loading.close();
                    return false
                }
            })
        },
    }
}
</script>