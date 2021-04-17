<template>
    <div id="navigasi">
        <div class="navigasii pl-3 pr-2 pt-3 d-none d-md-block d-lg-block d-xl-block">
            <div class="lis">
                <h6 class="text-uppercase">Khairo Tour</h6>
                <ul class="list-unstyled mt-5">
                    <li>
                        <router-link to="/base/home">
                            <div class="d-flex">
                                <i class='bx bx-home-alt bx-sm'></i><span class="my-auto ml-3">Dashboard</span>
                            </div>
                        </router-link>
                    </li>
                    <li class="mt-3">
                        <router-link to="/base/gudang">
                            <div class="d-flex">
                                <i class='bx bx-box bx-sm' ></i><span class="my-auto ml-3">Gudang</span>
                            </div>
                        </router-link>
                    </li>
                    <li class="mt-3">
                        <router-link to="/base/umrah">
                            <div class="d-flex">
                                <i class='bx bx-building bx-sm' ></i><span class="my-auto ml-3">Paket Umrah</span>
                            </div>
                        </router-link>
                    </li>
                    <li class="mt-3">
                        <router-link to="/base/jamaah">
                            <div class="d-flex">
                                <i class='bx bx-group bx-sm' ></i><span class="my-auto ml-3">Jamaah</span>
                            </div>
                        </router-link>
                    </li>
                    <li class="mt-3">
                        <router-link to="/base/cabang">
                            <div class="d-flex">
                                <i class='bx bx-building bx-sm' ></i><span class="my-auto ml-3">Cabang</span>
                            </div>
                        </router-link>
                    </li>
                    <li class="mt-3">
                        <router-link to="/base/mitra">
                            <div class="d-flex">
                                <i class='bx bx-group bx-sm' ></i><span class="my-auto ml-3">Mitra</span>
                            </div>
                        </router-link>
                    </li>
                    <li class="mt-3" v-show="$store.state.operat.user.type === 'SuperUser' 
                    || $store.state.operat.user.type === 'SuperExtra' ">
                        <router-link to="/base/access">
                            <div class="d-flex">
                                <i class='bx bx-user bx-sm' ></i><span class="my-auto ml-3">Access</span>
                            </div>
                        </router-link>
                    </li>
                    <li class="mt-3">
                        <div class="d-flex logout" v-on:click="logout">
                            <i class='bx bx-log-out bx-sm'></i><span class="my-auto ml-3">Logout</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <transition tag="div" class="div-slider" :name="showing? 'slideback' : 'slide'">
            <div class="navigasi pt-3" v-show="showing">
                <div class="lis">
                    <ul class="list-unstyled">
                        <li>
                            <router-link to="/base/home" v-on:click.native="closeable">
                                <div class="d-flex">
                                    <i class='bx bx-home-alt bx-sm'></i><span class="my-auto ml-3">Dashboard</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="mt-3">
                            <router-link to="/base/gudang" v-on:click.native="closeable">
                                <div class="d-flex">
                                    <i class='bx bx-box bx-sm'></i><span class="my-auto ml-3">Gudang</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="mt-3">
                            <router-link to="/base/umrah" v-on:click.native="closeable">
                                <div class="d-flex">
                                    <i class='bx bx-building bx-sm'></i><span class="my-auto ml-3">Paket Umrah</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="mt-3">
                            <router-link to="/base/jamaah" v-on:click.native="closeable">
                                <div class="d-flex">
                                    <i class='bx bx-group bx-sm'></i><span class="my-auto ml-3">Jamaah</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="mt-3">
                            <router-link to="/base/cabang" v-on:click.native="closeable">
                                <div class="d-flex">
                                    <i class='bx bx-building bx-sm'></i><span class="my-auto ml-3">Cabang</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="mt-3">
                            <router-link to="/base/mitra" v-on:click.native="closeable">
                                <div class="d-flex">
                                    <i class='bx bx-group bx-sm'></i><span class="my-auto ml-3">Mitra</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="mt-3">
                            <router-link to="/base/access" v-on:click.native="closeable">
                                <div class="d-flex">
                                    <i class='bx bx-user bx-sm' ></i><span class="my-auto ml-3">Access</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="mt-3">
                            <div class="d-flex logout" v-on:click="logout">
                                <i class='bx bx-log-out bx-sm'></i><span class="my-auto ml-3">Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'navigasi',
    props:{
        showing: Boolean
    },
    methods: {
        logout(){
            if (this.$cookies.get("type") == 1) {
                this.$store.dispatch('operat/resetState');
                return this.$store.dispatch('operat/logoutOperator', this.$cookies.get("username"))
            }
        },
        closeable(){
            return this.$emit('backpres', false);
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/fonts/font.scss";
.navigasii{
    left: 0;
    top: 0;
    z-index: 2;
    position: fixed;
    max-height: 100vh;
    height: 100vh;
    bottom: 0;
    .lis{
        position: relative;
        width: 100%;
        h6{
            font-family: $font-moderat-bold;
            font-size: 20px;
        }
    }
}
// .vm{
//     height: 50px;
//     .tops{
//         font-size: 15px;
//     }
// }
.navigasi{
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
    max-height: 100vh;
    height: 100vh;
    bottom: 0;
    .lis{
        position: relative;
        width: 100%;
        h6{
            font-family: $font-moderat-bold;
            font-size: 20px;
        }
    }
}
</style>