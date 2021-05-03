<template>
    <div class="block" v-show="show == 2">
        <div class="cursor-pointer hover:text-red-500" @click="backpresed">
            <i class='bx bx-left-arrow-alt inline'></i>
            <h2 class="inline">Tutup</h2>
        </div>
        <p class="text-md mt-3 md:mt-5">Harap lengkapi semua form yang tersedia pada form dibawah</p>
        <div class="mt-4">
            <p class="font-semibold text-sm">Informasi Umum</p>
            <Form class="md:grid md:w-4/6 grid-cols-2 md:gap-2">
                <FormItem label="Nama Paket" :model="form" :rules="formRules">
                    <Input v-model="form.nama" type="text" placeholder="Masukan Nama Paket"></Input>
                </FormItem>
                <FormItem label="Durasi Paket">
                    <Input v-model="form.durasi" type="number" placeholder="Masukan Durasi Paket"></Input>
                </FormItem>
                <FormItem label="Tahun Paket ( Hijriah )">
                    <Input v-model="form.tahun" type="number" placeholder="contoh: 1976"></Input>
                </FormItem>
                <FormItem label="Kuota Paket">
                    <Input v-model="form.kuota" type="number" placeholder="Masukan Kuota Paket"></Input>
                </FormItem>
                <FormItem label="Biaya Paket">
                    <Input v-model="form.biaya" type="number" placeholder="Masukan biaya Paket"></Input>
                </FormItem>
                <FormItem label="Tanggal Berangkat">
                    <DatePicker type="date" v-model="tanggal.berangkat" placeholder="Tanggal Berangkat Umrah" class="w-full"></DatePicker>
                </FormItem>
                <FormItem label="Tanggal Pulang">
                    <DatePicker type="date" v-model="tanggal.pulang" placeholder="Tanggal Pulang Umrah" class="w-full"></DatePicker>
                </FormItem>
                <FormItem label="Maskapai">
                    <Input v-model="form.maskapai" type="text" placeholder="Masukan Maskapai Umrah"></Input>
                </FormItem>
            </Form>
        </div>
        <!-- <div class="mt-3">
            <p class="text-sm font-semibold">Informasi Hotel</p>
            <Form :model="formhotel" class="md:grid grid-cols-1 md:gap-2">
                Hotels Input
                <FormItem label="Nama Hotel">
                    <Input v-model="formhotel.nama" type="text" placeholder="Masukan Nama Hotel"></Input>
                </FormItem>
                <FormItem label="Kota Hotel">
                    <Input v-model="formhotel.kota" type="text" placeholder="Masukan Kota Hotel"></Input>
                </FormItem>
                <FormItem label="Alamat Hotel">
                    <Input v-model="formhotel.alamat" type="text" placeholder="Masukan Alamat Hotel"></Input>
                </FormItem>
            </Form>
        </div> -->
        <div class="mt-3">
            <Button type="primary" @click="buatumrah">Simpan Paket</Button>
        </div>
    </div>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
export default {
    name: "UmrahDrawer",
    mixins: [Notifikasi],
    props:{
        show: Number,
        data: null
    },
    data() {
        return {
            formsUmrah: {
                nama: null,
                durasi: null,
                tahun: null,
                kuota: null,
                biaya: null,
                tanggal: null,
                maskapai: null,
            },
            tanggal: {
                berangkat: '',
                pulang: ''
            },
            formhotel:{ 
                nama: null,
                kota: null,
                alamat: null,
                kamar: [
                    {
                        kapasitas: '2',
                        harga: '',
                    },
                    {
                        kapasitas: '3',
                        harga: '',
                    },
                    {
                        kapasitas: '4',
                        harga: '',
                    }
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
                maskapai:[
                    { required: true, message: 'Harap Lengkapi Maskapai', trigger: 'blur' }
                ]
            }
        }
    },
    computed:{
        form(){
            return {...this.data};
        },
        datamaskapai(){
            return this.$store.state.umrah.maskapaiall;
        },
        datahotel(){
            return this.$store.state.umrah.hotelall;
        }
    },
    methods: {
        addhotel(){
            return this.hotel.hotel.push({hotel_id: ''})
        },
        removehotel(index){
            return this.hotel.hotel.splice(index, 1);
        },
        addmaskapai(){
            return this.maskapai.maskapai.push({maskapai_id: ''})
        },
        removemaskapai(index){
            return this.maskapai.maskapai.splice(index, 1);
        },
        buatumrah(){
            this.helper_loading("Membuat Paket...");
            if(this.checknull()){
                this.loading.close();
               return this.helper_global_form_notif();
            }
            this.formsUmrah = this.form;
            this.formsUmrah.maskapai = this.maskapai.maskapai;
            this.formsUmrah.hotel = this.hotel.hotel;
            this.formsUmrah.tanggal = this.tanggal.tanggal;
            console.log(this.formsUmrah);
            this.$store.dispatch('umrah/AddUmrah', this.formsUmrah);
            this.helper_check_request("Berhasil Menambah Paket", "Refresh halaman apabila data paket belum ditambahkan pada table");

        },
        backpresed(){
            return this.$emit('tutupumrah', 1);
        },
        checknull(){
            return this.form.nama == null ||this.form.durasi == null ||this.form.jenis_paket == null ||this.form.tahun == null ||
                this.form.kuota == null ||this.form.biaya == null;
        }
    },
}
</script>

<style lang="scss">
@import "@/assets/fonts/font.scss";
.umrahdrawer{
  position: fixed;
  right: 0;
  top: 0;
  width: 600px;
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
}
@media (max-width: 700px){
  .umrahdrawer{
    width: 100%;
  }
}
</style>