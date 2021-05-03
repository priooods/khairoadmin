<template>
  <div class="Base">
    <div class="relative md:flex justify-start">
      <div class="sider bg-black static md:h-screen md:block md:fixed md:z-10 md:w-1/6 px-3">
        <div class="md:hidden justify-start flex py-2 text-gray-50">
          <h2 class="font-bold text-lg">Khairo Tour</h2>
          <i class='bx bx-menu bx-sm my-auto ml-auto' v-if="!opened" @click="opened = true"></i>
          <i class='bx bx-x bx-sm my-auto ml-auto' v-if="opened" @click="opened = false"></i>
        </div>
        <navigasi class="md:block" :class="{'hidden': opened == false}" @backpres="backpres"/>
      </div>
      <div class="relative md:min-h-screen ml-auto md:w-5/6 w-screen md:px-4 md:px-3 px-2">
        <router-view class="md:py-4"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navigasi from '../components/navigasi.vue';
export default {
  name: 'Base',
  data(){
    return{
      opened: false
    }
  },
  methods:{
    backpres(event){
      this.opened = event;
    }
  },
  components: {navigasi}
}
</script>