<template>
  <div class="access pt-3">
      <h1 class="ml-3">Access Pengguna</h1>
      <div class="d-md-flex d-lg-flex d-xl-flex d-block mt-3">
        <div class="col">
            <div class="mt-2 bg">
              <div class="row justify-content-end mt-2">
                <div class="col-12 col-md-8 row mr-auto">
                  <vs-avatar circle size="25" class="mx-3">
                    <img src="../assets/avatar.png" alt="">
                  </vs-avatar>
                  <div class="names" v-if="$store.state.operat.user">
                    <h6>{{$store.state.operat.user.fullname}}</h6>
                    <p>{{$store.state.operat.user.type}} <br>
                      <span class="updt" @click="opened = true; typedetail = 3; datas = $store.state.operat.user">Update Profile</span>
                    </p>
                  </div>
                </div>
                <vs-button v-if="$store.state.operat.user.type == 'SuperUser' 
                || $store.state.operat.user.type == 'SuperExtra'" 
                class="col-md-3 mx-3 buton" 
                @click="opened = true; typedetail = 1; datas = []">Tambah Baru</vs-button>
              </div>
              <div class="mt-5">
                <p>Lihat semua data access pengguna, tap item untuk melihat detail</p>  
              </div>
              <b-form-input class="search my-3 w-100" size="sm" v-model="searchtable" type="text" placeholder="Cari Nama Operator"></b-form-input>
              <div class="tables mt-1">
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th class="th-sm">Nama</th>
                      <th class="th-sm">Jabatan</th>
                      <th class="th-sm">Access</th>
                      <th class="th-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(data, i) in filteredClients" v-bind:key="i" @click="showdetail(data)">
                      <td data-label="No">{{i + 1}}</td>
                      <td data-label="Nama">{{data.fullname}}</td>
                      <td data-label="Jabatan">{{data.jabatan ? data.jabatan : '--'}}</td>
                      <td data-label="Access">{{data.type}}</td>
                      <td data-label="Status" :class="{'unactive': data.log == 0 }">{{data.log ? "Aktif" : "Tidak Aktif"}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
        <div class="col-md-4 col-12">
          <div class="mt-2 bg h-75">
            <h6 class="mb-3 mt-1">Chart Users Access</h6>
            <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>
      </div>
      <UsersDetail
        :show.sync="opened"
        :type.sync="typedetail"
        @closeable="closingDrawer"
        @deleteuser="deleteuser"
        :datauser.sync="datas">
      </UsersDetail>
  </div>
</template>

<script>
import UsersDetail from '../components/UsersView';
import Charts from '../model/Charts';
export default {
    name: "Access",
    components: {UsersDetail},
    mixins: [Charts],
    data(){
      return {
        opened: false,
        typedetail: 1,
        datas: [],
        searchtable: '',
      }
    },
    created(){
      this.$store.dispatch("operat/allOperator");
    },
    computed:{
      listaccess(){
        return this.$store.state.operat.userall.filter(c => {
          return c.type !== 'SuperExtra' && c.type !== 'SuperUser'
        }); 
      },
      filteredClients() {
        const search = this.searchtable.toLowerCase().trim();
        if (!search) return this.listaccess;
        return this.listaccess.filter(c => c.fullname.toLowerCase().indexOf(search) > -1);
      },
    },
    methods:{
      closingDrawer(value){
        this.opened = value;
      },
      deleteuser(val){
        var ind = this.$store.state.operat.userall.findIndex(e => e.username === val);
        this.$store.state.operat.userall.splice(ind,1);
        return this.opened = false;
      },  
      showdetail(data){
        if (this.$store.state.operat.user.type == 'SuperExtra' 
        ||this.$store.state.operat.user.type == 'SuperUser') {
          this.datas = data; 
          this.opened = true; 
          this.typedetail = 2;
          return;
        }
        return this.opened = false; 
      },
    }
}
</script>

<style lang="scss">
@import '../assets/fonts/font.scss';
.access{
  height: 100vh;
  .names{
    h6{
      line-height: 14px;
      font-size: 15px;
    }
    .updt{
      line-height: 11px;
      font-size: 12px;
      color: $red;
      font-family: $font-moderat-bold;
      cursor: pointer;
    }
  }
  .search{
      font-size: 11px;
      font-family: $font-reguler;
  }
  .buton{
    max-height: 30px;
  }
}
</style>