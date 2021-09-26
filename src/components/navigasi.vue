<template>
    <div id="navigasi">
        <div class="md:py-5 pt-2 pb-5 md:px-3 px-1">
            <h6 class="uppercase font-bold text-lg text-white hidden md:block">Khairo Tour</h6>
            <ul class="list-unstyled md:mt-5">
                <li>
                    <router-link v-on:click.native="closeable" to="/base/home">
                        <div class="flex">
                            <i class='bx bx-home-alt bx-sm'></i><span class="my-auto ml-3 text-base">Dashboard</span>
                        </div>
                    </router-link>
                </li>
                <li class="mt-3" v-if="$cookies.get('type') == 1">
                    <router-link v-on:click.native="closeable" to="/base/gudang">
                        <div class="flex">
                            <i class='bx bx-box bx-sm' ></i><span class="my-auto ml-3 text-base">Gudang</span>
                        </div>
                    </router-link>
                </li>
                <li class="mt-3" v-if="$cookies.get('type') == 1">
                    <router-link v-on:click.native="closeable" to="/base/umrah">
                        <div class="flex">
                            <i class='bx bx-building bx-sm' ></i><span class="my-auto ml-3 text-base">Paket Umrah</span>
                        </div>
                    </router-link>
                </li>
                <li class="mt-3">
                    <router-link v-on:click.native="closeable" to="/base/jamaah">
                        <div class="flex">
                            <i class='bx bx-group bx-sm' ></i><span class="my-auto ml-3 text-base">Jamaah</span>
                        </div>
                    </router-link>
                </li>
                <li class="mt-3" v-if="$cookies.get('type') == 1">
                    <router-link v-on:click.native="closeable" to="/base/cabang">
                        <div class="flex">
                            <i class='bx bx-building bx-sm' ></i><span class="my-auto ml-3 text-base">Cabang</span>
                        </div>
                    </router-link>
                </li>
                <li class="mt-3" v-if="$cookies.get('type') == 1">
                    <router-link v-on:click.native="closeable" to="/base/mitra">
                        <div class="flex">
                            <i class='bx bx-group bx-sm' ></i><span class="my-auto ml-3 text-base">Perwakilan</span>
                        </div>
                    </router-link>
                </li>
                <li class="mt-3" v-if="$cookies.get('type') == 1 && $store.state.operat.user.type === 'SuperUser' || $store.state.operat.user.type === 'Admin' ">
                    <router-link v-on:click.native="closeable" to="/base/akuntan">
                        <div class="flex">
                            <i class='bx bxs-coin-stack  bx-sm'></i><span class="my-auto ml-3 text-base">Akuntan</span>
                        </div>
                    </router-link>
                </li>
                <li class="mt-3" v-if="$cookies.get('type') == 1">
                    <router-link v-on:click.native="closeable" to="/base/access">
                        <div class="flex">
                            <i class='bx bx-user bx-sm' ></i><span class="my-auto ml-3 text-base">Access</span>
                        </div>
                    </router-link>
                </li>
                <li class="mt-3">
                    <div class="flex logout text-gray-300" v-on:click="logout">
                        <i class='bx bx-log-out bx-sm'></i><span class="my-auto ml-3 text-base">Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'navigasi',
    methods: {
        logout(){
            if (this.$cookies.get("type") == 1) {
                return this.$store.dispatch('operat/logoutOperator', this.$cookies.get("username"))
            } else {
                return this.$store.dispatch('mitra/LogoutMitra', this.$cookies.get("username"))
            }
        },
        closeable(){
            return this.$emit('backpres', false);
        }
    }
}
</script>
