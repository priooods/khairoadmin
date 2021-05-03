export default {
  data() {
    return {
      json_fields: {
        "NO JAMAAH": "code",
        NIK: "no_ktp",
        PERWAKILAN: "pesanan.mitra.fullname",
        "NAMA JAMAAH": "nama_lengkap",
        "JENIS KELAMIN": "gender",
        "TEMPAT LAHIR": "tempat",
        "TANGGAL LAHIR": "lahir",
        RELATION: "nama_mahram",
        "NO TELP/HP": "no_telp",
        EMAIL: "email",
        PEKERJAAN: "pekerjaan",
        "PENDIDIKAN TERAKHIR": "pendidikan",
        "NO PASPOR": "passport.nomor",
        "NAMA PASPOR": "passport.nama",
        "TGL DIKELUARKAN": "passport.tgl_keluar",
        "TGL HABIS": "passport.tgl_habis",
        "KOTA PASPOR": "passport.kota",
        "PILIHAN KAMAR": "",
        "KATEGORI USIA": "umur",
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  computed: {
    json_data() {
      return this.$store.state.jamaah.jamaahall;
    },
  },
};
