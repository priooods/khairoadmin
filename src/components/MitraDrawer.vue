<template>
    <div class="md:px-3 py-3" v-show="show">
        <div v-if="editor == 2">
          <div class="cursor-pointer hover:text-red-500" @click="backpresed">
            <i class='bx bx-left-arrow-alt inline'></i>
            <h2 class="inline ml-2">Tutup</h2>
          </div>
          <h1 class="mt-2">Detail Mitra</h1>
          <div class="grid grid-cols-2 gap-1 mt-3">
              <div>
                <p class="font-bold">Data Mitra</p>
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
              <div v-if="data.jamaah != null">
                <p class="font-bold">Data Jamaah</p>
                <div v-for="(ds,i) in data.jamaah" v-bind:key="i" class="list-unstyled">
                    <div class="grid grid-cols-2 gap-2">
                    <p class="font-bold">Nama Jamaah</p>
                    <p>{{ds.nama_lengkap}}</p>
                  </div>
                </div>
              </div>
              <div v-if="data.jamaah == null">
                <p class="font-bold">Data Jamaah</p>
                <p class="mt-3">Belum Pernah Membawa Jamaah</p>
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
            <h2 class="inline ml-2">Info Mitra</h2>
          </div>
          <Form ref="forms" class="grid grid-cols-3 gap-1" :model="forms" :rules="ruleform"> 
              <FormItem prop="code_agent" label="Mitra">
                  <Select v-model="forms.code_agent" placeholder="Pilih Agent Mitra">
                    <Option v-for="(dt, i) in $store.state.mitra.mitrall" v-bind:key="i" :value="dt.id">{{dt.fullname}}</Option>
                  </Select>
              </FormItem>
              <FormItem prop="username" id="lay-username" label="Username">
                  <Input v-model="forms.username" id="username" type="text" placeholder="Masukan Username"></Input>
              </FormItem>
              <FormItem prop="password" label="Password">
                  <Input v-model="forms.password" id="password" type="password" placeholder="Masukan Password"></Input>
              </FormItem>
              <FormItem prop="fullname" label="Nama Lengkap">
                  <Input v-model="forms.fullname" :maxlength="8" type="text" placeholder="Masukan Nama Lengkap"></Input>
              </FormItem>
              <FormItem prop="no_telp" label="No Handphone">
                  <Input v-model="forms.no_tlp" :maxlength="8" id="no_tlp" type="number" placeholder="contoh: 08123456789"></Input>
              </FormItem>
              <FormItem label="Alamat" prop="alamat">
                  <Input v-model="forms.alamat" id="alamat" type="text" placeholder="Masukan Alamat Mitra"></Input>
              </FormItem>
              <FormItem label="Lokasi Cabang" prop="cabang">
                  <Select v-model="forms.cabang_id" 
                    required id="cabang" placeholder="Masukan Lokasi Cabang">
                      <Option v-for="(dt, i) in $store.state.mitra.cabangall" v-bind:key="i" :value="dt.id">{{dt.name}}</Option>
                    </Select>
              </FormItem>
          </Form>
          <div class="flex">
            <Button type="primary" @click="submitnewmitra">Simpan</Button>
            <Button type="error" class="ml-2" @click="backpresed">Cancel</Button>
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
      }
    },
    computed:{
      checkAccess(){
        return this.$cookies.get('type');
      },
      forms:{
        get(){
          return {...this.data}
        },
        set(value){
          return this.forms = value;
        }
      }
    },
    methods:{
        backpresed(){
          this.forms.set = {}
          return this.$emit('closeable', false);
        },
        hapusData(){
          this.helper_loading("Menghapus Mitra...");
          this.$store.dispatch('mitra/DeleteMitra', this.data.username);
          this.helper_check_request("Berhasil Menghapus Mitra", "Mitra anda berhasil dihapus, Refresh halaman apabila mitra pada table belum hilang");
          return this.backpresed();
        },
        editingmitra(){
          this.forms.set = this.data; 
          return this.$emit('editing', 1);
        },
        submitnewmitra(){
          this.helper_loading("Menyimpan Data Mitra...");
          return this.$refs['forms'].validate((valid) => {
            if(valid){
              if (this.forms.id != null) {
                this.$store.dispatch('mitra/UpdateMitra', this.forms);
                this.helper_check_request("Berhasil Mengubah Data mitra", "Refresh ulang halaman apabila data mitra belum berubah di dalam table");
                return this.backpresed();
              }
              this.$store.dispatch('mitra/AddMitra', this.forms);
              this.helper_check_request("Berhasil Menyimpan Mitra Baru", "Refresh ulang halaman apabila data mitra belum tampil di dalam table");
              return this.backpresed();
            } else {
              this.loading.close();
              return false;
            }
          })
        }
    }
}
</script>