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
