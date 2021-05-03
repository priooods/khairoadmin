import store from "../store/index";

export default {
  data: function() {
    return {
      chartOptions: {
        chart: {
          type: "donut",
        },
        labels: ["Admin", "Operator"],
      },
      chartHotel: {
        chart: {
          type: "column",
        },
        series: [],
      },
    };
  },
  computed: {
    admin() {
      return store.state.operat.userall.filter((e) => {
        return e.type == "Admin";
      })
    },
    operator() {
      return store.state.operat.userall.filter((e) => {
        return e.type == "Operator";
      });
    },
    series() {
      return [
        this.admin.length,
        this.operator.length,
      ];
    },
  },
};
