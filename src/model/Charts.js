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
    series() {
      return [
        store.state.operat.admin.length,
        store.state.operat.operator.length,
      ];
    },
  },
};
