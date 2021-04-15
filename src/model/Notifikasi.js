export default {
  data() {
    return {
      loading: null,
    };
  },
  methods: {
    helper_notifikasi(color, durasi, posisi, title, desc) {
      return this.$vs.notification({
        color,
        duration: durasi,
        position: posisi,
        title,
        text: desc,
      });
    },
    helper_loading(text) {
      this.loading = this.$vs.loading({
        text: text,
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
    helper_check_request(color, durasi, posisi, title, desc) {
      setTimeout(() => {
        if (this.$cookies.get("next") == 1) {
          this.loading.close();
          return this.helper_notifikasi(color, durasi, posisi, title, desc);
        }
        this.loading.close();
        return this.helper_global_error_notif();
      }, 3000);
    },
  },
};
