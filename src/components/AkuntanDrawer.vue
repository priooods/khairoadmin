<template>
  <div class="akuntan-drawer" v-show="show">
    <div class="inline-flex justify-start cursor-pointer hover:text-yellow-500" @click="backpresed">
        <i class='bx bx-left-arrow-alt my-auto'></i>
        <h2 class="ml-1 my-auto">Tutup</h2>
    </div>
    <div class="mt-5">
        <p class="text-xs font-bold">Buat Laporan Keuangan Bulan ini</p>
        <Form ref="form" class="grid grid-cols-1 gap-1 mt-4 md:w-2/6" :model="form" :rules='formRules'>
            <FormItem prop="tiket" label="Tiket Hotel">
                <Input type="number" v-model='form.tiket' placeholder="Biaya Tiket Hotel" />
            </FormItem>
            <FormItem prop="promosi" label="Promosi">
                <Input type="number" v-model='form.promosi' placeholder="Biaya Promosi" />
            </FormItem>
            <FormItem prop="entertaiment" label="Entertaiment">
                <Input type="number" v-model='form.entertaiment' placeholder="Biaya Entertaiment" />
            </FormItem>
            <FormItem prop="ket_entertaiment" label="Ket Entertaiment">
                <Input type="textarea" v-model='form.ket_entertaiment' :autosize="true" placeholder="Keterangan Entertaiment" />
            </FormItem>
            <FormItem prop="gaji" label="Gaji Karyawan">
                <Input type="number" v-model='form.gaji' placeholder="Biaya Gaji Karyawan" />
            </FormItem>
            <FormItem prop="debit" label="Debit Saldo">
                <Input type="number" v-model='form.debit' placeholder="Debit Saldo" />
            </FormItem>
            <FormItem prop="kredit" label="Kredit Saldo">
                <Input type="number" v-model='form.kredit' placeholder="Kredit Saldo" />
            </FormItem>
            <FormItem prop="fee" label="Akumulasi Fee">
                <Input type="number" v-model='form.fee' placeholder="Biaya Akumulasi Fee" />
            </FormItem>
        </Form>
        <div class="md:flex grid grid-cols-2 gap-1 mt-4">
            <Button type="primary" @click="simpan">Simpan</Button>
            <Button type="error" @click="backpresed">Cancel</Button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "AkuntanDrawer",
    props: {
        show: Boolean,
    },
    data() {
        return {
            form: {
                kredit:'',
                debit:'',
                entertaiment:'',
                fee:'',
                promosi:'',
                gaji:'',
                tiket:'',
                ket_entertaiment:'',
            },
            formRules: {
                kredit: [
                    { required: true, message: 'Kredit is Required', trigger: 'blur' },
                    { type: 'string', min:1, message: 'Kredit is Required', trigger: 'blur' }
                ],
                debit: [
                    { required: true, message: 'Debit is Required', trigger: 'blur' },
                    { type: 'string', min:1, message: 'Debit is Required', trigger: 'blur' }
                ],
                entertaiment: [
                    { required: true, message: 'entertaiment is Required', trigger: 'blur' },
                    { type: 'string', min:1, message: 'entertaiment is Required', trigger: 'blur' }
                ],
                promosi: [
                    { required: true, message: 'promosi is Required', trigger: 'blur' },
                    { type: 'string', min:1, message: 'promosi is Required', trigger: 'blur' }
                ],
                fee: [
                    { required: true, message: 'fee perwakilan is Required', trigger: 'blur' },
                    { type: 'string', min:1, message: 'fee perwakilan is Required', trigger: 'blur' }
                ],
                gaji: [
                    { required: true, message: 'gaji karyawan is Required', trigger: 'blur' },
                    { type: 'string', min:1, message: 'gaji karyawan is Required', trigger: 'blur' }
                ],
                ket_entertaiment: [
                    { required: true, message: 'Keterangan is Required', trigger: 'blur' },
                    { type: 'string', min:10, message: 'Keterangan min 10 Char', trigger: 'blur' }
                ],
                tiket: [
                    { required: true, message: 'tiket is Required', trigger: 'blur' },
                    { type: 'string', min:1, message: 'tiket is Required', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        backpresed(){
            return this.$emit('closeable', false);
        },
        simpan(){
            this.$refs['form'].validate((valid) => {
                if(valid){
                    return true;
                }
                return false;
            })
        }
    },
}
</script>

<style>

</style>