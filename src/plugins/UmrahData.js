import moment from "moment-timezone";
export default {
  data() {
    return {
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
          render: (h, params) => {
            return h("div", [h("span", params.row.durasi + " Hari")]);
          },
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
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                this.$options.filters.currency(params.row.biaya, "Rp. ")
              ),
            ]);
          },
        },
      ],
    };
  },
  computed: {
    umrahlist() {
      return this.$store.state.umrah.umrahall.data
        ? this.$store.state.umrah.umrahall.data.map((items, index) => ({
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
              berangkat: moment(items.jadwal.berangkat).isBefore(
                moment().format("yyyy-MM-DD")
              )
                ? "berangkat-style-green"
                : "",
              pulang:
                items.jadwal.pulang == moment().format("yyyy-MM-DD") ||
                moment(items.jadwal.pulang).isBefore(
                  moment().format("yyyy-MM-DD")
                )
                  ? "sisa-style-danger"
                  : "",
            },
          }))
        : [];
    },
  },
};
