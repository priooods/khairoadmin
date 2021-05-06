<template>
    <div class="block" v-show="show == 2">
        <div class="cursor-pointer md:w-1/6 mt-4 md:mt-0 hover:text-red-500" @click="backpresed">
            <i class='bx bx-left-arrow-alt inline'></i>
            <h2 class="inline ml-2">Tutup</h2>
        </div>
        <p class="text-md mt-3 md:mt-5">Harap lengkapi semua form yang tersedia pada form dibawah</p>
        <div class="mt-4">
            <Form ref="form" class="md:grid w-full grid-cols-2 md:gap-2" :inline="false" :model="formsUmrah" :rules="formRules">
                <div class="md:w-4/6">
                    <p class="font-bold text-sm mb-3 md:mb-4">Informasi Umum</p>
                    <FormItem label="Nama Paket" prop="nama">
                        <Input v-model="formsUmrah.nama" type="text" placeholder="Masukan Nama Paket"></Input>
                    </FormItem>
                    <FormItem label="Durasi Paket" prop="durasi">
                        <Input v-model="formsUmrah.durasi" type="number" placeholder="Masukan Durasi Paket"></Input>
                    </FormItem>
                    <FormItem label="Tahun Paket ( Hijriah )" prop="tahun">
                        <Input v-model="formsUmrah.tahun" type="number" placeholder="contoh: 1976"></Input>
                    </FormItem>
                    <FormItem label="Kuota Paket" prop="kuota">
                        <Input v-model="formsUmrah.kuota" type="number" placeholder="Masukan Kuota Paket"></Input>
                    </FormItem>
                    <FormItem label="Biaya Paket" prop="biaya">
                        <Input v-model="formsUmrah.biaya" type="number" placeholder="Masukan biaya Paket"></Input>
                    </FormItem>
                    <FormItem label="Tanggal Berangkat" prop="tanggal.berangkat">
                        <DatePicker format="yyyy-MM-dd" type="date" v-model="formsUmrah.tanggal.berangkat" placeholder="Tanggal Berangkat Umrah" class="w-full"></DatePicker>
                    </FormItem>
                    <FormItem label="Tanggal Pulang" prop="tanggal.pulang">
                        <DatePicker format="yyyy-MM-dd" type="date" v-model="formsUmrah.tanggal.pulang" placeholder="Tanggal Pulang Umrah" class="w-full"></DatePicker>
                    </FormItem>
                </div>
                <div class="md:w-4/6">
                    <p class="font-bold text-sm mb-3 md:mb-4">Informasi Detail</p>
                    <FormItem label="Maskapai" prop="maskapai[0].nama">
                        <Input v-model="formsUmrah.maskapai[0].nama" type="text" placeholder="Masukan Maskapai Umrah"></Input>
                    </FormItem>
                    <div class="mt-3">
                        <p class="font-semibold text-xs mb-3">Data Hotel Madinnah</p>
                        <FormItem prop="hotel[0].nama" label="Nama Hotel Madinnah">
                            <Input v-model="formsUmrah.hotel[0].nama" type="text" placeholder="Masukan Maskapai Umrah"></Input>
                        </FormItem>
                        <FormItem prop="hotel[0].kota" label="Kota Hotel Madinnah">
                            <Input v-model="formsUmrah.hotel[0].kota" type="text" placeholder="Masukan Maskapai Umrah"></Input>
                        </FormItem>
                        <FormItem prop="hotel[0].alamat" label="Alamat Hotel Madinnah">
                            <Input v-model="formsUmrah.hotel[0].alamat" type="text" placeholder="Masukan Maskapai Umrah"></Input>
                        </FormItem>
                    </div>
                    <div class="mt-3">
                        <p class="font-semibold text-xs mb-3">Data Hotel Mekkah</p>
                        <FormItem prop="hotel[1].nama" label="Nama Hotel Mekkah">
                            <Input v-model="formsUmrah.hotel[1].nama" type="text" placeholder="Masukan Maskapai Umrah"></Input>
                        </FormItem>
                        <FormItem prop="hotel[1].kota" label="Kota Hotel Mekkah">
                            <Input v-model="formsUmrah.hotel[1].kota" type="text" placeholder="Masukan Maskapai Umrah"></Input>
                        </FormItem>
                        <FormItem prop="hotel[1].alamat" label="Alamat Hotel Mekkah">
                            <Input v-model="formsUmrah.hotel[1].alamat" type="text" placeholder="Masukan Maskapai Umrah"></Input>
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
        <Button class="mt-4" type="primary" @click="buatumrah">Simpan Paket</Button>
    </div>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
import moment from 'moment-timezone';
export default {
    name: "UmrahDrawer",
    mixins: [Notifikasi],
    props:{
        show: Number,
    },
    data() {
        return {
            formsUmrah: {
                nama: '',
                durasi: '',
                tahun: '',
                kuota: '',
                biaya: '',
                tanggal: {
                    berangkat: '',
                    pulang: ''
                },
                maskapai: [
                    {
                        nama: ''
                    }
                ],
                hotel: [
                    {
                        kota: 'Madinnah',
                        nama: '',
                        alamat: ''
                    },
                    {
                        kota: 'Mekkah',
                        nama: '',
                        alamat: ''
                    },
                ]
            },
            formRules:{
                nama:[
                    { required: true, message: 'Harap Lengkapi Nama Paket', trigger: 'blur' }
                ],
                durasi:[
                    { required: true, message: 'Harap Masukan Durasi Paket', trigger: 'blur' }
                ],
                tahun:[
                    { required: true, message: 'Harap Lengkapi Tahun Paket', trigger: 'blur' }
                ],
                kuota:[
                    { required: true, message: 'Harap Lengkapi Kouta Paket', trigger: 'blur' }
                ],
                biaya:[
                    { required: true, message: 'Harap Masukan Biaya Paket', trigger: 'blur' }
                ],
                'tanggal.berangkat': [
                    { required: true, type: 'date', message: 'Harap pilih tanggal berangkat', trigger: 'change' }
                ],
                'tanggal.pulang': [
                    { required: true, type: 'date', message: 'Harap pilih tanggal pulang', trigger: 'change' }
                ],
                'maskapai[0].nama':[
                    { required: true, message: 'Masukan Maskapai',trigger: 'blur' }
                ],
                'hotel[0].kota': [
                    { required: true, message: 'Masukan kota hotel madinnah', trigger: 'blur' }
                ],
                'hotel[0].nama': [
                    { required: true, message: 'Harap masukan nama hotel', trigger: 'blur' }
                ],
                'hotel[0].alamat':[
                    { required: true, message: 'Masukan alamat lengkap hotel',trigger: 'blur' }
                ],
                'hotel[1].kota': [
                    { required: true, message: 'Masukan kota hotel mekkah', trigger: 'blur' }
                ],
                'hotel[1].nama': [
                    { required: true, message: 'Harap masukan nama hotel', trigger: 'blur' }
                ],
                'hotel[1].alamat':[
                    { required: true, message: 'Masukan alamat lengkap hotel',trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        buatumrah(){
            this.helper_loading("Membuat Paket...");
            console.log(this.formsUmrah);
            this.$refs['form'].validate((valid) => {
                if(valid){
                    this.formsUmrah.tanggal.berangkat = new moment(this.formsUmrah.tanggal.berangkat).format('yyyy-MM-DD');
                    this.formsUmrah.tanggal.pulang = new moment(this.formsUmrah.tanggal.pulang).format('yyyy-MM-DD');
                    this.$store.dispatch('umrah/AddUmrah', this.formsUmrah);
                    return this.helper_check_request("Berhasil Menambah Paket", "Refresh halaman apabila data paket belum ditambahkan pada table");
                }
                this.loading.close();
                return false;
            })
        },
        backpresed(){
            return this.$emit('tutupumrah', 1);
        },
    },
}
</script>