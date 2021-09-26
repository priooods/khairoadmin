import moment from "moment-timezone";
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
  methods: {
    generateX(ss) {
      return this.$store.state.jamaah.jamaahall.data
        ? this.$store.state.jamaah.jamaahall.data.filter((e) => {
            return (
              moment(e.created_at).format("YYYY") ==
              new moment(ss).format("YYYY")
            );
          })
        : [];
    },
  },
  computed: {
    generateYears() {
      const max = new Date().getFullYear();
      const min = max - 4;
      const years = [];

      for (let i = min; i <= max; i++) {
        years.push(i);
      }
      return years;
    },
    admin() {
      return this.$store.state.operat.userall.data
        ? this.$store.state.operat.userall.data.filter((e) => {
            return e.type == "Admin";
          })
        : [];
    },
    operator() {
      return this.$store.state.operat.userall.data
        ? this.$store.state.operat.userall.data.filter((e) => {
            return e.type == "Operator";
          })
        : [];
    },
    series() {
      return [this.admin.length, this.operator.length];
    },
    chartJamaah2() {
      return {
        chart: {
          type: "bar",
        },
        labels: this.generateYears,
      };
    },
    seriesJamaahBar() {
      return [
        {
          data: this.generateMoments,
        },
      ];
    },
    generateMoments() {
      const moments = [];
      this.generateYears.forEach((e) => {
        moments.push(this.generateX(e.toString()).length);
      });
      return moments;
    },
    Totaljamaah() {
      return this.$store.state.jamaah.jamaahall.data
        ? this.$store.state.jamaah.jamaahall.data.filter((e) => {
            return (
              moment(e.created_at).format("yyyy") == new Date().getFullYear()
            );
          })
        : [];
    },
    udahpulang() {
      return this.$store.state.jamaah.jamaahall.data
        ? this.$store.state.jamaah.jamaahall.data
            .filter((a) => {
              return (
                moment(a.created_at).format("yyyy") ==
                new moment().format("yyyy")
              );
            })
            .map((as) => {
              return as.pesanan.jadwal;
            })
            .filter((dd) => {
              return moment(dd.pulang).isBefore(moment().format("yyyy-MM-DD"));
            })
        : [];
    },
    udahberangkat() {
      return this.$store.state.jamaah.jamaahall.data
        ? this.$store.state.jamaah.jamaahall.data
            .filter((a) => {
              return (
                moment(a.created_at).format("yyyy") ==
                new moment().format("yyyy")
              );
            })
            .map((as) => {
              return as.pesanan.jadwal;
            })
            .filter((dd) => {
              return moment(dd.berangkat).isBefore(
                moment().format("yyyy-MM-DD")
              );
            })
        : [];
    },
    optionsMitra() {
      return {
        chart: {
          type: "bar",
          height: 200,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        title: {
          text: "Jamaah Yang Didaftarkan Tahun " + new Date().getFullYear(),
          align: "left",
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: this.$store.state.mitra.mitrall.data
            ? this.$store.state.mitra.mitrall.data.map((e) => {
                return e.fullname;
              })
            : "",
        },
      };
    },
    seriesMitra() {
      return [
        {
          name: "Total Jamaah",
          data: this.$store.state.mitra.mitrall.data
            ? this.$store.state.mitra.mitrall.data
                .map((s) => {
                  return s.pesanan;
                })
                .filter((e) => {
                  return e
                    ? moment(e.created_at).format("yyyy") ==
                        new Date().getFullYear()
                    : null;
                })
                .map((e) => {
                  return parseInt(e.length);
                })
            : [],
        },
      ];
    },
  },
};
