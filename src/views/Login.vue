<template>
  <div id="login">
        <div class="flex justify-center items-center h-screen">
            <div>
                <img class="lgo" src="../assets/logos.jpg"/>
                <h4 class="uppercase font-bold text-lg">Khairo Tour</h4>
                <h6 class="mb-3 text-sm">Login to your account. Hubungi administrator <br>  apabila anda lupa dengan informasi account anda</h6>
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="username" label="Username">
                        <Input type="text" v-model="formInline.username" placeholder="Username"></Input>
                    </FormItem>
                    <FormItem prop="password" label="Password">
                        <Input type="password" v-model="formInline.password" placeholder="Password"></Input>
                    </FormItem>
                </Form>
                <Checkbox v-model="checklog">Masuk sebagai mitra</Checkbox>
                <Button type="primary" @click="login" long class="mt-5">Login</Button>
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
            formInline: {
                username: '',
                password: ''
            },
            checklog: false,
            ruleInline: {
                username: [
                    { required: true, message: 'Harap Lengkapi Username Anda', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Harap Lengkapi Password Anda', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 char', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        login() {
            this.helper_loading("Mencari Akun ..");
            this.$refs['formInline'].validate((valid) => {
                if (valid) {
                    if(!this.checklog){
                        this.$store.dispatch("operat/loginoperator", this.formInline);
                        return this.helper_login_request('Selamat Datang', 'Selamat Datang Kembali, Bagaimana kabar kamu hari ini');
                    }
                    this.$store.dispatch("mitra/LoginMitra", this.formInline);
                    return this.helper_login_request('Selamat Datang', 'Selamat Datang Kembali, Bagaimana kabar kamu hari ini');
                } else {
                    this.loading.close();
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/fonts/font.scss';
#login{
    height: 100vh;
    .lgo{
        width: 80px;
        height: 80px;
    }
    .ant-form-item-label label{
        margin-bottom: -90px;
    }
    .d-flex{
        width: 100%;
        h4{
            font-size: 25px;
            font-weight: 700;
        }
        h6{
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