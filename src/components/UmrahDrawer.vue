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
                        <FormItem prop="hotel[0].alamat" label="Alamat Hotel Madinnah">
                            <Input v-model="formsUmrah.hotel[0].alamat" type="text" placeholder="Masukan Maskapai Umrah"></Input>
                        </FormItem>
                    </div>
                    <div class="mt-3">
                        <p class="font-semibold text-xs mb-3">Data Hotel Mekkah</p>
                        <FormItem prop="hotel[1].nama" label="Nama Hotel Mekkah">
                            <Input v-model="formsUmrah.hotel[1].nama" type="text" placeholder="Masukan Maskapai Umrah"></Input>
                        </FormItem>
                        <FormItem prop="hotel[1].alamat" label="Alamat Hotel Mekkah">
                            <Input v-model="formsUmrah.hotel[1].alamat" type="text" placeholder="Masukan Maskapai Umrah"></Input>
                        </FormItem>
                    </div>
                    <div class="md:w-4/6 mt-10">
                        <p class="font-bold text-sm mb-1">Assets</p>
                        <div class="flex items-center" v-for="(input,k) in assets" v-bind:key="k">
                            <FormItem label="Pilih Assets">
                                <Select v-model="input.nama" placeholder="Pilih Assets" filterable :clearable="true">
                                    <Option v-for="(dt, i) in $store.state.gudang.gudang.data" v-bind:key="i" :value="dt.nama">{{dt.nama}}</Option>
                                </Select>
                            </FormItem>
                            <div class="cursor-pointer mx-1 my-auto" @click="remove(k)" v-show="k || (!k && input.length > 1)"><i class="bx bx-minus bx-xs my-auto"></i></div>
                            <div class="cursor-pointer mx-1 my-auto" @click="add(k)" v-show="k == assets.length - 1"><i class="bx bx-plus bx-xs my-auto"></i></div>
                        </div>
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
            assets: [{nama: ''}],
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
        add(){
            return this.assets.push({nama: ''})
        },
        remove(index){
            return this.assets.splice(index, 1);
        },
        buatumrah(){
            if(this.assets[0].nama.length > 0)
                this.formsUmrah.aset = this.assets;
            
            let loading = this.$vs.loading({
                text: "Membuat Paket...",
            });
            this.$refs['form'].validate((valid) => {
                if(valid){
                    this.formsUmrah.tanggal.berangkat = new moment(this.formsUmrah.tanggal.berangkat).format('yyyy-MM-DD');
                    this.formsUmrah.tanggal.pulang = new moment(this.formsUmrah.tanggal.pulang).format('yyyy-MM-DD');
                    this.$store.dispatch('umrah/AddUmrah', this.formsUmrah).finally(() => {
                        loading.close();
                        this.$vs.notification({
                            color: "success",
                            duration: 3000,
                            position: "top-right",
                            title: "Berhasil Menambah Paket",
                            text: "Refresh halaman apabila data paket belum ditambahkan pada table",
                        });
                        return this.backpresed();
                    })
                }
                loading.close();
                return false;
            })
        },
        backpresed(){
            return this.$emit('tutupumrah', 1);
        },
    },
}
</script>