import store from "../store/index";
import moment from "moment-timezone";
export default {
  data() {
    return {
      Gudang: [
        {
          title: "No",
          key: "index",
          width: 55,
        },
        {
          title: "Nama",
          key: "nama",
          minWidth: 150,
        },
        {
          title: "Harga",
          key: "harga",
          minWidth: 100,
        },
        {
          title: "Persediaan",
          key: "stok",
          minWidth: 100,
        },
      ],
      Operator: [
        {
          title: "No",
          key: "index",
          fixed: "left",
          width: 55,
        },
        {
          title: "Nama",
          fixed: "left",
          key: "fullname",
          minWidth: 150,
        },
        {
          title: "Jabatan",
          key: "jabatan",
          minWidth: 100,
        },
        {
          title: "Access",
          key: "type",
          minWidth: 100,
        },
      ],
      Mitra: [
        {
          title: "No",
          key: "index",
          width: 55,
        },
        {
          title: "Code",
          key: "code",
          minWidth: 100,
        },
        {
          title: "Nama Lengkap",
          key: "fullname",
          minWidth: 150,
        },
        {
          title: "No Hp",
          key: "no_tlp",
          minWidth: 100,
        },
        {
          title: "Nama Cabang",
          key: "namacabang",
          minWidth: 100,
        },
        {
          title: "Kota Cabang",
          key: "kotacabang",
          minWidth: 100,
        },
        {
          title: "Alamat",
          key: "alamat",
          minWidth: 150,
          ellipsis: true,
        },
      ],
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
      Umrah: [
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
          title: "Nama Paket",
          key: "nama",
          minWidth: 110,
        },
        {
          title: "Durasi",
          key: "durasi",
          minWidth: 100,
        },
        {
          title: "Sisa Kuota",
          key: "sisa",
          minWidth: 100,
        },
        {
          title: "Berangkat",
          key: "berangkat",
          minWidth: 100,
        },
        {
          title: "Pulang",
          key: "pulang",
          minWidth: 100,
        },
        {
          title: "Harga",
          key: "biaya",
          minWidth: 120,
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
    };
  },
  computed: {
    operatorUser() {
      return store.state.operat.userall
        .filter((c) => {
          return c.type !== "SuperExtra" && c.type !== "SuperUser";
        })
        .map((items, index) => ({
          ...items,
          index: index + 1,
        }));
    },
    gudanglist() {
      return store.state.gudang.gudang.map((items, index) => ({
        ...items,
        harga: this.$options.filters.currency(items.harga, "Rp. "),
        index: index + 1,
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
    umrahlist() {
      return store.state.umrah.umrahall.map((items, index) => ({
        ...items,
        berangkat: items.jadwal ? items.jadwal.berangkat : "--",
        pulang: items.jadwal ? items.jadwal.pulang : "--",
        sisa: items.sisa + " Orang",
        index: index + 1,
        cellClassName: {
          sisa:
            items.sisa == 0
              ? "sisa-style-danger"
              : items.sisa <= 5 && items.sisa > 0
              ? "sisa-style-warning"
              : "",
          berangkat:
            items.jadwal.berangkat == moment().format("yyyy-MM-DD")
              ? "berangkat-style-green"
              : "",
          pulang:
            items.jadwal.pulang == moment().format("yyyy-MM-DD") ||
            moment(items.jadwal.pulang).isBefore(moment().format("yyyy-MM-DD"))
              ? "sisa-style-danger"
              : "",
        },
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
            items.ktp == null &&
            items.kk == null &&
            items.pasfoto == null &&
            items.akte_lahir == null
              ? "biaya-danger"
              : "biaya-success",
          umur:
            items.gender === "Wanita" && items.umur < 45 ? "usia-column" : "",
          status:
            items.bayar === "BELUM LUNAS" ? "biaya-danger" : "biaya-success",
          index:
            items.pesanan.harga_kamar == null
              ? "biaya-danger"
              : "biaya-success",
        },
      }));
    },
  },
};
