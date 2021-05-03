export default {
  data() {
    return {
      ruleform: {
        username: [
          {
            required: true,
            message: "Harap Lengkapi Username Pengguna",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Harap Lengkapi Password Pengguna",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 char",
            trigger: "blur",
          },
        ],
        fullname: [
          {
            required: true,
            message: "Harap Lengkapi Fullname Pengguna",
            trigger: "blur",
          },
        ],
        jabatan: [
          {
            required: true,
            message: "Harap Lengkapi Jabatan Pengguna",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "Harap Pilih Access Pengguna",
            trigger: "blur",
          },
        ],
        alamat: [
          {
            required: true,
            message: "Harap Masukan Alamat Mitra",
            trigger: "blur",
          },
        ],
      },
    };
  },
};
