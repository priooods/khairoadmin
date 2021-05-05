import store from "../store/index";
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
        index: index + 1,
      }));
    },
    jamaahlist() {
      return store.state.jamaah.jamaahall.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
  },
};
