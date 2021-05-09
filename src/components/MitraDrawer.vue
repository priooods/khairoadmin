<template>
    <div class="md:px-3 py-3" v-show="show">
        <div v-if="editor == 2">
          <div class="cursor-pointer hover:text-red-500" @click="backpresed">
            <i class='bx bx-left-arrow-alt inline'></i>
            <h2 class="inline ml-2">Tutup</h2>
          </div>
          <h1 class="mt-2">Detail Perwakilan</h1>
          <div class="grid grid-cols-2 gap-1 mt-3">
              <div>
                <p class="font-bold">Data Perwakilan</p>
                <div class="grid grid-cols-2 gap-2 mt-3">
                  <p class="font-semibold">Code</p>
                  <p>{{data.code ? data.code : '--'}}</p>
                  <p class="font-semibold">Code Agent</p>
                  <p>{{data.agent ? data.agent.code : '---'}}</p>
                  <p class="font-semibold">Nama Lengkap</p>
                  <p>{{data.fullname}}</p>
                  <p class="font-semibold">No Handphone</p>
                  <p>{{data.no_tlp}}</p>
                  <p class="font-semibold">Alamat</p>
                  <p>{{data.alamat}}</p>
                  <p class="font-semibold">Jumlah Jamaah</p>
                  <p>{{data.pesanan_count}}</p>
                  <p class="font-semibold">Fee Total</p>
                  <p>{{data.fee}}</p>
                </div>
                <p class="font-bold mt-3">Detail Cabang</p>
                <div v-if="data.cabang" class="grid grid-cols-2 gap-2 mt-3">
                  <p class="font-semibold">Nama Cabang</p>
                  <p>{{data.cabang.name}}</p>
                  <p class="font-semibold">Code Cabang</p>
                  <p>{{data.cabang.code}}</p>
                  <p class="font-semibold">Kota Cabang</p>
                  <p>{{data.cabang.kota}}</p>
                </div>
              </div>
              <div>
                <div v-if="data.jamaah.length > 0">
                  <p class="font-bold mb-3">Data Jamaah</p>
                  <div v-for="(ds,i) in data.jamaah" v-bind:key="i">
                      <div class="grid grid-cols-2 gap-2">
                      <p class="font-semibold">Nama Jamaah</p>
                      <p>{{ds.nama_lengkap}}</p>
                    </div>
                  </div>
                </div>
                <div v-if="data.jamaah.length == 0">
                  <p class="font-semibold">Data Jamaah</p>
                  <p class="mt-3">Belum Pernah Membawa Jamaah</p>
                </div>
                <div v-if="data.submitra.length > 0" class="mt-3">
                  <p class="font-bold mb-3">Sub Perwakilan</p>
                  <div v-for="(ds,i) in data.submitra" v-bind:key="i">
                      <div class="grid grid-cols-2 gap-2">
                      <p class="font-semibold">Nama Perwakilan</p>
                      <p>{{ds.fullname}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="data.submitra.length == 0" class="mt-3">
                <p class="font-semibold">Sub Perwakilan</p>
                <p class="mt-3">Belum Memiliki Sub Perwakilan</p>
              </div>
          </div>
          <div class="flex mt-5">
            <Button type="error"  @click="hapusData">Hapus Mitra</Button>
            <Button type="warning" class="ml-2" @click="editingmitra">Edit Mitra</Button>
          </div>
        </div>
        <div v-if="editor == 1">
          <div class="cursor-pointer hover:text-red-500 mb-5" @click="backpresed">
            <i class='bx bx-left-arrow-alt inline'></i>
            <h2 class="inline ml-2">Kembali</h2>
          </div>
          <h1 class="my-4 hidden md:block">Buat Perwakilan</h1>
          <Form ref="forms" class="grid grid-cols-3 gap-1" :model="formnew" :rules="ruleform"> 
              <FormItem prop="code_agent" label="Perwakilan">
                  <Select v-model="formnew.code_agent" placeholder="Pilih Agent Mitra" filterable :clearable="true">
                    <Option v-for="(dt, i) in $store.state.mitra.mitrall" v-bind:key="i" :value="dt.id">{{dt.fullname}}</Option>
                  </Select>
              </FormItem>
              <FormItem prop="username" id="lay-username" label="Username">
                  <Input v-model="formnew.username" id="username" type="text" placeholder="Masukan Username"></Input>
              </FormItem>
              <FormItem prop="password" label="Password">
                  <Input v-model="formnew.password" id="password" type="password" placeholder="Masukan Password"></Input>
              </FormItem>
              <FormItem prop="fullname" label="Nama Lengkap">
                  <Input v-model="formnew.fullname" type="text" placeholder="Masukan Nama Lengkap"></Input>
              </FormItem>
              <FormItem prop="no_tlp" label="No Handphone">
                  <Input v-model="formnew.no_tlp" id="no_tlp" type="number" placeholder="contoh: 08123456789"></Input>
              </FormItem>
              <FormItem label="Alamat" prop="alamat">
                  <Input v-model="formnew.alamat" id="alamat" type="text" placeholder="Masukan Alamat Mitra"></Input>
              </FormItem>
              <FormItem label="Lokasi Cabang" prop="cabang_id">
                  <Select v-model="formnew.cabang_id" 
                    required id="cabang" placeholder="Masukan Lokasi Cabang">
                      <Option v-for="(dt, i) in $store.state.mitra.cabangall" v-bind:key="i" :value="dt.id">{{dt.name}}</Option>
                    </Select>
              </FormItem>
          </Form>
          <div class="flex mt-3">
            <Button type="primary" @click="submitnewmitra">Simpan</Button>
            <Button type="error" class="ml-2" @click="backpresed">Cancel</Button>
          </div>
        </div>
        <div v-if="editor == 3">
          <div class="cursor-pointer hover:text-red-500 mb-5" @click="backpresedEdit">
            <i class='bx bx-left-arrow-alt inline'></i>
            <h2 class="inline ml-2">Kembali</h2>
          </div>
          <h1 class="my-4 hidden md:block">Update Perwakilan</h1>
          <Form ref="data" class="grid grid-cols-3 gap-1" :model="data" :rules="dataUpdate"> 
              <FormItem prop="code_agent" label="Perwakilan">
                  <Select v-model="data.code_agent" placeholder="Pilih Agent Mitra" filterable :clearable="true">
                    <Option v-for="(dt, i) in listingPerwakilan" v-bind:key="i" :value="dt.id">{{dt.fullname}}</Option>
                  </Select>
              </FormItem>
              <FormItem prop="username" id="lay-username" label="Username">
                  <Input v-model="data.username" id="username" type="text" placeholder="Masukan Username"></Input>
              </FormItem>
              <FormItem prop="password" label="Password">
                  <Input v-model="data.password" id="password" type="password" placeholder="Masukan Password"></Input>
              </FormItem>
              <FormItem prop="fullname" label="Nama Lengkap">
                  <Input v-model="data.fullname" type="text" placeholder="Masukan Nama Lengkap"></Input>
              </FormItem>
              <FormItem prop="no_tlp" label="No Handphone">
                  <Input v-model="data.no_tlp" id="no_tlp" type="number" placeholder="contoh: 08123456789"></Input>
              </FormItem>
              <FormItem label="Alamat" prop="alamat">
                  <Input v-model="data.alamat" id="alamat" type="text" placeholder="Masukan Alamat Perwakilan"></Input>
              </FormItem>
              <FormItem label="Lokasi Cabang" prop="cabang_id">
                  <Select v-model="data.cabang_id" 
                    required id="cabang" placeholder="Masukan Lokasi Cabang">
                      <Option v-for="(dt, i) in $store.state.mitra.cabangall" v-bind:key="i" :value="dt.id">{{dt.name}}</Option>
                    </Select>
              </FormItem>
          </Form>
          <div class="flex mt-3">
            <Button type="primary" @click="updateds">Updated</Button>
            <Button type="error" class="ml-2" @click="backpresedEdit">Cancel</Button>
          </div>
        </div>
    </div>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
import FormValidate from '../model/FormValidate';
export default {
    name: "mitradrawer",
    mixins: [Notifikasi,FormValidate],
    props:{
        show: Boolean,
        editor: Number,
        data: null
    },
    data() {
      return {
        showaction: false,
        formnew: {
          username: '',
          password: '',
          fullname: '',
          no_tlp: '',
          cabang_id: '',
          alamat: '',
          code_agent: ''
        },
        dataUpdate: {
          alamat: [
            {
              required: true,
              message: "Harap Masukan Alamat Mitra",
              trigger: "blur",
            },
          ],
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
            {
              type: "string",
              min: 6,
              message: "The password length cannot be less than 6 char",
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
          no_tlp: [
            {
              required: true,
              message: "Harap Masukan No Hanphone",
              trigger: "blur",
            },
            {
              type: "string",
              min: 9,
              max: 12,
              message: "No Handphone Max 12 & Min 9 Char",
              trigger: "blur",
            },
          ],
        }
      }
    },
    computed:{
      checkAccess(){
        return this.$cookies.get('type');
      },
      listingPerwakilan(){
        return this.$store.state.mitra.mitrall.filter((e => {
          return e.id != this.data.id;
        }));
      }
    },
    methods:{
        backpresed(){
          return this.$emit('closeable', false);
        },
        backpresedEdit(){
          console.log(this.data);
          return this.$emit('editing', 2);
        },
        hapusData(){
          this.helper_loading("Menghapus Mitra...");
          this.$store.dispatch('mitra/DeleteMitra', this.data.username);
          this.helper_check_request("Berhasil Menghapus Mitra", "Mitra anda berhasil dihapus, Refresh halaman apabila mitra pada table belum hilang");
          return this.backpresed();
        },
        editingmitra(){
          this.data.no_tlp = this.data.no_tlp.toString();
          return this.$emit('editing', 3);
        },
        submitnewmitra(){
          this.helper_loading("Menyimpan Data Perwakilan...");
          return this.$refs['forms'].validate((valid) => {
            if(valid){
              this.$store.dispatch('mitra/AddMitra', this.formnew);
              this.helper_check_request("Berhasil Menyimpan Perwakilan Baru", "Refresh ulang halaman apabila data Perwakilan belum tampil di dalam table");
              return this.backpresed();
            } else {
              return this.loading.close();
            }
          })
        },
        updateds(){
          this.helper_loading("Mengupdate Data Perwakilan...");
          return this.$refs['data'].validate((valid) => {
            if(valid){
              this.formnew.username = this.data.username;
              this.formnew.password =  this.data.password;
              this.formnew.fullname =  this.data.fullname;
              this.formnew.no_tlp =  this.data.no_tlp;
              this.formnew.cabang_id =  this.data.cabang_id;
              this.formnew.alamat =  this.data.alamat;
              this.formnew.code_agent =  this.data.code_agent;
              // this.formnew.id = this.data.id;
              this.$store.dispatch('mitra/UpdateMitra', this.formnew);
              this.helper_check_request("Berhasil Mengubah Data Perwakilan", "Refresh ulang halaman apabila data Perwakilan belum berubah di dalam table");
              return this.backpresed();
            } else {
              return this.loading.close();
            }
          })
        }
    }
}
</script>