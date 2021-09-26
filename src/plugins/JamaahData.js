import moment from "moment-timezone";
export default {
  data() {
    return {
      Jamaah: [
        {
          title: "No",
          key: "index",
          width: 55,
        },
        {
          title: "Code",
          key: "code",
          minWidth: 100,
          ellipsis: true,
        },
        {
          title: "NIK",
          key: "no_ktp",
          minWidth: 100,
          ellipsis: true,
        },
        {
          title: "Nama Jamaah",
          key: "nama_lengkap",
          minWidth: 130,
        },
        {
          title: "Gender",
          key: "gender",
          minWidth: 90,
        },
        {
          title: "Tempat Lahir",
          key: "ttl",
          minWidth: 100,
        },
        {
          title: "Usia",
          key: "umur",
          minWidth: 90,
        },
        {
          title: "Status",
          key: "status",
          minWidth: 90,
        },
      ],
    };
  },
  computed: {
    jamaahlist() {
      return this.$store.state.jamaah.jamaahall.data
        ? this.$store.state.jamaah.jamaahall.data.map((items, index) => ({
            ...items,
            umur: items.umur + " Tahun",
            status: items.bayar,
            index: index + 1,
            cellClassName: {
              code:
                items.ktp == null ||
                (items.ktp == false && items.kk == false) ||
                (items.kk == null && items.pasfoto == null) ||
                (items.pasfoto == false && items.akte_lahir == null) ||
                items.akte_lahir == false
                  ? "biaya-danger"
                  : "",
              umur:
                items.gender === "Wanita" && items.umur < 45
                  ? "usia-column"
                  : "",
              status: items.bayar === "BELUM LUNAS" ? "biaya-danger" : "",
              index: items.pesanan.harga_kamar == null ? "biaya-danger" : "",
              nama_lengkap:
                moment(items.created_at).format("yyyy") ==
                  new moment().format("yyyy") &&
                moment(items.pesanan.jadwal.berangkat).isBefore(
                  moment().format("yyyy-MM-DD")
                )
                  ? "biaya-success"
                  : "",
            },
          }))
        : [];
    },
  },
};
