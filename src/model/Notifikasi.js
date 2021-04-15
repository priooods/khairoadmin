export default {
  data() {
    return {
      loading: null,
    };
  },
  methods: {
    helper_notifikasi(title, desc) {
      return this.$vs.notification({
        color: "danger",
        duration: 3000,
        position: "top-left",
        title,
        text: desc,
      });
    },
    helper_loading(text) {
      this.loading = this.$vs.loading({
        text: text,
      });
    },
    helper_global_form_notif() {
      return this.$vs.notification({
        color: "danger",
        duration: 3000,
        position: "top-left",
        title: "Gagal Melakukan Permintaan",
        text:
          "Harap lengkapi semua Form yang tersedia untuk melakukan permintaan !",
      });
    },
    helper_global_success_notif(title, desc) {
      return this.$vs.notification({
        color: "success",
        duration: 3000,
        position: "top-right",
        title,
        text: desc,
      });
    },
    helper_global_error_notif() {
      return this.$vs.notification({
        color: "danger",
        duration: "3000",
        position: "top-left",
        title: "Gagal Melakukan Permintaan",
        text:
          "Anda gagal melakukan permintaan. Harap periksa kembali koneksi internet anda",
      });
    },
    helper_check_request(title, desc) {
      setTimeout(() => {
        if (this.$cookies.get("next") == 1) {
          this.loading.close();
          return this.helper_global_success_notif(title, desc);
        }
        this.loading.close();
        return this.helper_global_error_notif();
      }, 3000);
    },

    //Only get for login !!
    helper_login_request(title, desc) {
      setTimeout(() => {
        if (this.$cookies.get("next") == 1) {
          this.loading.close();
          this.helper_global_success_notif(title, desc);
          return this.$router.push({ path: "base/home" }, () => {});
        }
        this.loading.close();
        return this.helper_global_error_notif();
      }, 3000);
    },
  },
};
