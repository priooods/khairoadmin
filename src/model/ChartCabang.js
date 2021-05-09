import store from "../store/index";
// import moment from "moment-timezone";
export default {
  data() {
    return {};
  },
  computed: {
    options() {
      return {
        chart: {
          height: 250,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: "30%",
              background: "transparent",
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: true,
              },
            },
          },
        },
        colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
        labels: store.state.mitra.cabangall.map((e) => {
          return e.name;
        }),
        legend: {
          show: true,
          floating: true,
          fontSize: "12px",
          position: "left",
          offsetX: 45,
          offsetY: 30,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0,
          },
          formatter: function(seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
          },
          itemMargin: {
            vertical: 2,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: true,
              },
            },
          },
        ],
        title: {
          text: "Perwakilan Setiap Cabang",
          align: "left",
        },
      };
    },
    series() {
      return store.state.mitra.cabangall.map((e) => {
        return e.mitra.length;
      });
    },
  },
};
