<template>
  <div class="Base position-relative">
      <div class="d-md-flex">
        <div class="py-3 px-2 d-flex d-md-none d-lg-none d-xl-none justify-content-end">
          <h1 class="mr-auto text-uppercase my-auto tops">Khairo Tour</h1>
          <i class='bx bx-menu bx-sm my-auto' v-if="!opened" @click="opened = true"></i>
          <i class='bx bx-x bx-sm my-auto' v-if="opened" @click="opened = false"></i>
        </div>
        <div class="col-md-2 navigasiin position-relative">
          <navigasi :showing="opened" @backpres="backpres"/>
        </div>
        <div class="w-100 ly position-relative">
          <router-view class="lay pt-2 pb-3"></router-view>
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

<style lang="scss">
.Base{
  height: 100vh;
  .view{
    width: 100%;
    .tops{
      font-size: 15px;
    }
  }
  .ly{
    height: 100vh;
    // top: 0;
    // bottom: 0;
  }

}
@media (max-width: 700px){
  .Base{
    .view{
      .lay{
        height: auto;
      }
    }
  }
}
</style>