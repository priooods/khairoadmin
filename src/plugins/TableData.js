import store from "../store/index";
import moment from "moment-timezone";
export default {
  data() {
    return {
      Cabang: [
        {
          title: "No",
          key: "index",
          width: 55,
        },
        {
          title: "Code",
          key: "code",
          minWidth: 110,
        },
        {
          title: "Nama Cabang",
          key: "name",
          minWidth: 110,
        },
        {
          title: "Kota",
          key: "kota",
          minWidth: 80,
        },
        {
          title: "Provinsi",
          key: "provinsi",
          minWidth: 80,
        },
        {
          title: "Alamat",
          key: "alamat",
          minWidth: 140,
          ellipsis: true,
        },
      ],
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
      Akuntan: [
        {
          title: "No",
          key: "index",
          width: 55,
        },
        {
          title: "Keterangan",
          key: "keterangan",
        },
        {
          title: "Saldo Masuk",
          key: "masuk",
        },
        {
          title: "Saldo Akhir",
          key: "saldo",
        },
        {
          title: "Tanggal",
          key: "date",
          width: 140,
        },
      ],
    };
  },
  computed: {
    akuntanlist() {
      return store.state.gudang.akuntan.map((items, index) => ({
        ...items,
        masuk: this.$options.filters.currency(items.masuk, "Rp. "),
        saldo: this.$options.filters.currency(items.saldo, "Rp. "),
        date: moment(items.date).format("DD MMMM YYYY"),
        index: index + 1,
        cellClassName: {
          saldo: index == 0 ? "akuntan-style-green" : "",
          masuk: index == 0 ? "akuntan-style-green" : "",
        },
      }));
    },
    mitralist() {
      return store.state.mitra.mitrall.map((items, index) => ({
        ...items,
        index: index + 1,
        namacabang: items.cabang ? items.cabang.name : "--",
        kotacabang: items.cabang ? items.cabang.kota : "--",
      }));
    },
    cabanglist() {
      return store.state.mitra.cabangall.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
    jamaahlist() {
      return store.state.jamaah.jamaahall.map((items, index) => ({
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
            items.gender === "Wanita" && items.umur < 45 ? "usia-column" : "",
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
      }));
    },
  },
};
