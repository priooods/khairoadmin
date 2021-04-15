<template>
  <div id="login">
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="col-md-4">
                <h4 class="text-uppercase">Khairo Tour</h4>
                <h6>Login to your account <br> Hubungi administrator apabila anda lupa dengan informasi account anda</h6>
                    <b-form class="w-100">
                        <b-form-group id="lay-username">
                            <label for="username">Username</label>
                            <b-form-input size="sm" v-model="forms.username" id="username" type="text" required placeholder="Masukan Username">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="lay-password">
                            <label for="password">Password</label>
                            <b-form-input size="sm" v-model="forms.password" id="password" type="password" required placeholder="Masukan Password">
                            </b-form-input>
                        </b-form-group>
                        <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox" value="1" unchecked-value="0">
                            Masuk sebagai Mitra
                        </b-form-checkbox>
                    </b-form>
                <vs-button size="default" class="mt-3" @click="login" block html-type="submit">Login</vs-button>
            </div>
        </div>
  </div>
</template>

<script>
import Notifikasi from '../model/Notifikasi';
export default {
    mixins: [Notifikasi],
    name: "Login",
    data() {
        return{
            forms: {
                username: '',
                password: ''
            },
            status: 0,
            show: false,
            valid: true
        }
    },
    methods:{
        login() {
            this.helper_loading("Mencari Akun ..");
            if(this.forms.username.length == 0 || this.forms.password.length == 0){
                return this.helper_global_form_notif();
            } else {
                if (this.status == 0) {
                    this.$store.dispatch("operat/loginoperator", this.forms);
                    return this.helper_login_request('Selamat Datang', 'Selamat Datang Kembali, Bagaimana kabar kamu hari ini');
                } else {
                    this.$store.dispatch("mitra/LoginMitra", this.forms);
                    return this.helper_login_request('Selamat Datang', 'Selamat Datang Kembali, Bagaimana kabar kamu hari ini');
                }
            }
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/fonts/font.scss';
#login{
    height: 100vh;
    .ant-form-item-label label{
        margin-bottom: -90px;
    }
    .d-flex{
        width: 100%;
        h4{
            font-family: $font-moderat-bold;
            font-size: 25px;
        }
        h6{
            font-family: $font-reguler;
            font-size: 14px;
            line-height: 15px;
        }
        .atas{
            margin-top: 80px;
        }
        .btn-login{
            margin-top: 30px;
        }
    }
}

</style>