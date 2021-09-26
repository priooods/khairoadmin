// import moment from "moment-timezone";
export default {
  data() {
    return {
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
    };
  },
  computed: {
    mitralist() {
      return this.$store.state.mitra.mitrall.data
        ? this.$store.state.mitra.mitrall.data.map((items, index) => ({
            ...items,
            index: index + 1,
            namacabang: items.cabang ? items.cabang.name : "--",
            kotacabang: items.cabang ? items.cabang.kota : "--",
          }))
        : [];
    },
  },
};
