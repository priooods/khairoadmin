export default {
  data() {
    return {
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
    };
  },
  computed: {
    operatorUser() {
      return this.$store.state.operat.userall.data
        ? this.$store.state.operat.userall.data
            .filter((c) => {
              return c.type !== "SuperExtra" && c.type !== "SuperUser";
            })
            .map((items, index) => ({
              ...items,
              index: index + 1,
            }))
        : [];
    },
  },
};
