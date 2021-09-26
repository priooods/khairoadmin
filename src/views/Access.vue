<template>
  <div class="access md:pb-0 pb-5">
      <div v-show="!opened">
        <h1 class="md:block hidden">Access Pengguna</h1>
        <div class="md:flex mt-5">
          <div class="md:w-4/6 w-full">
              <div class="bg-gray-100 py-3 px-3 md:rounded-md">
                <div class="flex">
                  <vs-avatar circle size="35" class="mr-3">
                    <img src="../assets/avatar.png" alt="">
                  </vs-avatar>
                  <div v-if="$store.state.operat.user">
                    <h6 class="font-semibold text-base">{{$store.state.operat.user.fullname}}</h6>
                    <p class="font-semibold text-red-500">{{$store.state.operat.user.type}} </p>
                  </div>
                </div>
                <div class="md:flex justify-end grid grid-cols-3 gap-2 mt-5">
                  <Button type="info" @click="panduan =!panduan">Panduan</Button>
                  <Button class="md:mx-1" type="success" @click="opened = true; typedetail = 3; datas = $store.state.operat.user">Update Profile</Button>
                  <Button @click="createnew" v-if="$store.state.operat.user.type == 'SuperUser' || $store.state.operat.user.type == 'Admin'" type="primary">Tambah Baru</Button>
                </div>
                <p class="mt-3">Lihat semua data access pengguna, tap item untuk melihat detail</p>  
                <TableDefault @clickrow="rowclick" @changepage="changepage" @searching="searchOperator" @clearsearch="cs_Operator" :keys="'fullname'" :placeholder="'Cari Nama Operator'" 
                  :totalpage="$store.state.operat.userall.pages ? $store.state.operat.userall.pages.total_pages * 10 : 0" :data="operatorUser" :column="Operator"></TableDefault>
              </div>
          </div>
          <div class="md:w-2/6 w-full md:ml-2 md:mt-0 mt-4">
            <div class="bg-gray-100 py-3 px-3 ">
              <p class="mb-3 font-semibold">Chart Users Access</p>
              <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
            </div>
          </div>
        </div>
      </div>
      <UsersDetail
        :show.sync="opened"
        :type.sync="typedetail"
        @closeable="closingDrawer"
        @deleteuser="deleteuser"
        :datauser="datas">
      </UsersDetail>
      <Modal v-model="panduan" @on-ok="panduan = false" title="Panduan Access" ok-text="OK" cancel-text="Cancel">
        <h2 class="text-xs font-bold">Access Website</h2>
        <div class="flex w-full mt-2">
            <p>1</p>
            <p class="text-xs ml-2">Untuk dapat mengakses data akuntan pengguna harus memiliki akses sebagai SuperUser dan Admin.</p>
        </div>
        <div class="flex w-full mt-2">
            <p>2</p>
            <p class="text-xs ml-2">Untuk membuat account kepada setiap cabang, pastikan anda memberikan akses account sebagai Operator</p>
        </div>
      </Modal>
  </div>
</template>

<script>
import UsersDetail from '../components/UsersView';
import Charts from '../model/Charts';
import TableDefault from '../components/TableDefault';
import AccessData from '../plugins/AccessData';
export default {
    name: "Access",
    components: {UsersDetail, TableDefault},
    mixins: [Charts, AccessData],
    data(){
      return {
        opened: false,
        panduan:false,
        typedetail: 1,
        datas: [],
        formNew: {
          username: '',
          password: '',
          type: '',
          fullname: '',
          jabatan: '',
        },
      }
    },
    created(){
      this.$store.dispatch("operat/allOperator").then(() =>{}).finally(() => {});
    },
    methods:{
      closingDrawer(value){
        this.opened = value;
      },
      rowclick(value){
        if (this.$store.state.operat.user.type == 'Admin' 
        ||this.$store.state.operat.user.type == 'SuperUser') {
          this.datas = value; 
          this.opened = true; 
          return this.typedetail = 2;
        }
        this.$Message.error('Anda Tidak Memiliki Akses');
        return this.opened = false; 
      },
      deleteuser(val){
        var ind = this.$store.state.operat.userall.findIndex(e => e.username === val);
        this.$store.state.operat.userall.splice(ind,1);
        return this.opened = false;
      },
      createnew(){
        this.opened = true; 
        this.typedetail = 1; 
        this.datas = this.formNew;
      },
      searchOperator(v){
        this.$store.dispatch('operat/Search',{fullname: v});
      },
      changepage(v){
        this.$store.dispatch("operat/allOperator",{ page: v })
      },
      cs_Operator(){
        this.$store.dispatch("operat/allOperator")
      }
    }
}
</script>

<style lang="scss">
@import '../assets/fonts/font.scss';
.views{
  height: 100vh !important;
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