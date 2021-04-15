<template>
  <div class="mitra px-3 views">
      <div>
        <h1>Mitra</h1>
        <div class="bg my-3">
          <div class="d-md-flex d-lg-flex d-xl-flex justify-content-end">
            <p class="mr-auto">Tambah data mitra baru. Harap masukan semua data yang tersedia pada form</p>
            <vs-button size="small" class="col-md-2 col" @click="shownew = true" v-show="shownew == false">Buat Mitra Baru</vs-button>
          </div>
          <div v-show="shownew">
            <b-form class="w-100 row">
                <b-form-group id="lay-cd" class="col-md-4 col-12">
                    <label for="cd">Pilih Agent</label>
                    <b-form-select v-model="forms.code_agent"
                      size="sm" placeholder="Pilih Agent Mitra">
                      <b-form-select-option v-for="(dt, i) in $store.state.mitra.mitrall" v-bind:key="i" :value="dt.id">{{dt.fullname}}</b-form-select-option>
                    </b-form-select>
                </b-form-group>
                <b-form-group id="lay-username" class="col-md-4 col-12">
                    <label for="username">Username</label>
                    <b-form-input size="sm" v-model="forms.username" id="username" type="text" required placeholder="Masukan Username">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-password" class="col-md-4 col-12">
                    <label for="password">Password</label>
                    <b-form-input size="sm" v-model="forms.password" id="password" type="password" required placeholder="Masukan Password">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-fullname" class="col-md-4 col-12">
                    <label for="fullname">Fullname</label>
                    <b-form-input size="sm" v-model="forms.fullname" id="fullname" type="text" required placeholder="Masukan Nama Lengkap">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-no_tlp" class="col-md-4 col-12">
                    <label for="no_tlp">No Hp</label>
                    <b-form-input size="sm" v-model="forms.no_tlp" id="no_tlp" type="number" required placeholder="Masukan No Handphone">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-alamat" class="col-md-4 col-12">
                    <label for="alamat">Alamat</label>
                    <b-form-input size="sm" v-model="forms.alamat" id="alamat" type="text" required placeholder="Masukan Alamat Mitra">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="lay-cabang" class="col-md-4 col-12">
                    <label for="cabang">Lokasi Cabang</label>
                    <b-form-select v-model="forms.cabang_id" 
                      size="sm" required id="cabang" placeholder="Masukan Lokasi Cabang">
                        <b-form-select-option v-for="(dt, i) in $store.state.mitra.cabangall" v-bind:key="i" :value="dt.id">{{dt.name}}</b-form-select-option>
                      </b-form-select>
                </b-form-group>
            </b-form>
            <div class="d-flex">
              <vs-button @click="submitnewmitra">Simpan</vs-button>
              <vs-button danger @click="shownew = false">Cancel</vs-button>
            </div>
          </div>
        </div>
        <div class="bg mt-3">
          <p>Lihat semua data cabang yang telah didaftarkan <br>Tap pada item untuk melakukan aksi lainnya</p>
          <b-form-input class="search my-3 w-100" size="sm" v-model="searching" type="text" placeholder="Cari Mitra ..."></b-form-input>
          <div class="tables mt-3">
              <table class="cabang-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Code</th>
                    <th>Code Agent</th>
                    <th>Nama Lengkap</th>
                    <th>No Hp</th>
                    <th>Nama Cabang</th>
                    <th>Kota Cabang</th>
                    <th>Prov Cabang</th>
                    <th>Alamat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(data, i) in filterMitra" v-bind:key="i" @click="showdrawer = !showdrawer; detailmitra = data">
                    <td data-label="No">{{i + 1}}</td>
                    <td data-label="Code">{{data.code}}</td>
                    <td data-label="Code Agent">{{data.code_agent ? data.code_agent : "--"}}</td>
                    <td data-label="Nama Lengkap">{{data.fullname}}</td>
                    <td data-label="No Hp">{{data.no_tlp}}</td>
                    <td data-label="Nama Cabang">{{data.cabang.name}}</td>
                    <td data-label="Kota Cabang">{{data.cabang.kota}}</td>
                    <td data-label="Prov Cabang">{{data.cabang.provinsi}}</td>
                    <td data-label="Alamat">{{data.alamat}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
        <Mitradrawer :show="showdrawer" :data="detailmitra"  @closeable="closedrawer"></Mitradrawer>
      </div>
  </div>
</template>

<script>
import Mitradrawer from '../components/MitraDrawer';
import Notifikasi from '../model/Notifikasi';
export default {
  mixins: [Notifikasi],
  components: {Mitradrawer},
  name: "Mitra",
  created() {
    this.$store.dispatch('mitra/AllMitra');
    this.$store.dispatch('mitra/AllCabang');
  },
  data: ()=> {
    return{
      showdrawer: false,
      detailmitra: [],
      searching: '',
      shownew: false,
      forms: {
        username: '',
        password: '',
        fullname: '',
        no_tlp: '',
        alamat: '',
        cabang_id: null,
        code_agent: null,
      },
    }
  },
  computed:{
    filterMitra(){
      const cari = this.searching.toLowerCase().trim();
      if (!cari) return this.$store.state.mitra.mitrall;
      return this.$store.state.mitra.mitrall.filter((oj) => {oj.fullname.toLowerCase().indexOf(cari) > -1});
    }
  },
  methods:{
    closedrawer(val){
      return this.showdrawer = val;
    },
    submitnewmitra(){
      this.helper_loading("Menyimpan Data Mitra...");
      if(this.forms.username.length == 0 ||this.forms.password.length == 0 ||this.forms.fullname.length == 0 ||
      this.forms.no_tlp.length == 0 ||this.forms.alamat.length == 0 ||this.forms.cabang_id == null){
        this.loading.close();
        this.helper_global_form_notif();
        return false;
      }
      this.loading.close();
      this.$store.dispatch('mitra/AddMitra', this.forms);
      return this.helper_check_request("Berhasil Menyimpan Mitra Baru", "Refresh ulang halaman apabila data mitra belum tampil di dalam table");
    }
  }
}
</script>

<style lang="scss">
@import '../assets/fonts/font.scss';
.views{
  height: 100vh;
  .search{
    font-size: 11px;
    font-family: $font-reguler;
  }
}
</style>