// import moment from "moment-timezone";
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
    };
  },
  computed: {
    gudanglist() {
      return this.$store.state.gudang.gudang.data
        ? this.$store.state.gudang.gudang.data.map((items, index) => ({
            ...items,
            harga: this.$options.filters.currency(items.harga, "Rp. "),
            index: index + 1,
          }))
        : [];
    },
  },
};
