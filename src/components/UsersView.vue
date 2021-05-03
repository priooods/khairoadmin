<template>
  <div class="userview py-3 px-3" v-show="show">
    <div class="inline cursor-pointer hover:text-red-500" @click="backpresed">
      <i class='bx bx-left-arrow-alt my-auto inline'></i>
      <h2 class="ml-1 inline">Tutup</h2>
    </div>
      <h1 class="mt-3">{{type == 1 ? "Buat Pengguna Baru" : type == 2 ? "Details Pengguna" : "Update Profile" }}</h1>
      <p>{{type == 1 ? "Harap masukan semua data dengan lengkap untuk membuat data baru" 
        : type == 2 ? "Update pengguna apabila diperlukan" : "Harap masukan semua data untuk melakukan update profile"}}</p>
      <Form ref="formInline" class="mt-3" :model="formInline" :rules="ruleInline">
          <FormItem class="md:w-2/6" prop="username" label="Username">
              <Input type="text" v-model="formInline.username" placeholder="Username"></Input>
          </FormItem>
          <FormItem class="md:w-2/6" prop="password" label="Password">
              <Input type="password" v-model="formInline.password" placeholder="Password"></Input>
          </FormItem>
          <FormItem class="md:w-2/6" prop="fullname" label="Fullname">
              <Input type="text" v-model="formInline.fullname" placeholder="fullname"></Input>
          </FormItem>
          <FormItem class="md:w-2/6" prop="jabatan" label="Jabatan">
              <Input type="text" v-model="formInline.jabatan" placeholder="jabatan"></Input>
          </FormItem>
          <FormItem class="md:w-2/6" prop="type" label="Access">
              <Select v-model="formInline.type">
                  <Option v-for="item in $store.state.operat.user.type == 'SuperUser' || 'SuperExtra' ? options : options2" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
      </Form>
      <div v-if="type == 2">
        <Button danger v-if="$store.state.operat.user.type == 'SuperUser' || $store.state.operat.user.type == 'Admin'" 
            type="error"
            @click="deleted">Hapus Pengguna</Button>
        <Button warn v-if="$store.state.operat.user.type == 'SuperUser' || $store.state.operat.user.type == 'Admin'" 
            type="primary ml-2"
            @click="updated">Update Pengguna</Button>
      </div>
      <div v-if="type == 3">
        <Button type="primary" @click="updated">Updated Pengguna</Button>
      </div>
      <div v-if="type == 1">
        <Button type="primary" @click="addnew">Tambah Pengguna</Button>
      </div>
  </div>
</template>

<script>

import Notifikasi from '../model/Notifikasi';
export default {
    name: "UserView",
    props: {
      show: Boolean,
      datauser: null,
      type: Number
    },
    mixins: [Notifikasi],
    data(){
      return {
        options: [
          { value: 'Admin', label: 'Admin' },
          { value: 'Operator', label: 'Operator' },
          { value: 'SuperUser', label: 'SuperUser'}
        ],
        options2: [
          { value: 'Admin', label: 'Admin' },
          { value: 'Operator', label: 'Operator' },
        ],
        ruleInline: {
          username: [
            {
              required: true,
              message: "Harap Lengkapi Username Pengguna",
              trigger: "blur",
            },
          ],
          password: [
            {
              required: true,
              message: "Harap Lengkapi Password Pengguna",
              trigger: "blur",
            },
          ],
          fullname: [
            {
              required: true,
              message: "Harap Lengkapi Fullname Pengguna",
              trigger: "blur",
            },
          ],
          jabatan: [
            {
              required: true,
              message: "Harap Lengkapi Jabatan Pengguna",
              trigger: "blur",
            },
          ],
          type: [
            {
              required: true,
              message: "Harap Pilih Access Pengguna",
              trigger: "blur",
            },
          ],
        },
      }
    },
    computed:{
      formInline(){
        return {...this.datauser}
      }
    },
    methods:{
      backpresed(){
        return this.$emit('closeable', false);
      },
      updated() {
        this.helper_loading("Mengirim Permintaan Update..");
        this.$refs['formInline'].validate((valid) => {
          if (valid) {  
            this.$store.dispatch("operat/updateOperator", this.formInline);
            this.helper_check_request('Berhasil Melakukan Update !',
              'Pengguna berhasil di update, kembali untuk melihat data terbaru');
              return this.$refs['formInline'].resetFields();
          } else {
            this.loading.close();
            return false;
          }
        });
      },
      deleted(){
        this.helper_loading("Mengirim Permintaan Hapus..");
        this.$refs['formInline'].validate((valid) => {
          if (valid) {
            this.$emit('deleteuser', this.formInline.username);
            this.$store.dispatch("operat/deleteOperator", this.formInline.username);
            this.helper_check_request('Berhasil Menghapus Pengguna !',
            'Pengguna berhasil di hapus, kembali untuk melihat data terbaru');
            this.$refs['formInline'].resetFields();
            return this.backpresed();
          } else {
            this.loading.close();
            return false;
          }
        });
      },
      addnew(){
        this.helper_loading("Mengirim Permintaan Pengguna Baru..");
        this.$refs['formInline'].validate((valid) => {
          if (valid) {
            this.$store.dispatch("operat/addoperator", this.formInline);
            this.helper_check_request('Berhasil Menambah Pengguna Baru !',
            'Pengguna baru berhasil di simpan, kembali untuk melihat data terbaru');
            this.$refs['formInline'].resetFields();
            return this.backpresed();
          } else {
            this.loading.close();
            return false;
          }
        });
      },
    },
}
</script>