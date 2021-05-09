import store from "../store/index";
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
      chartJamaah: {
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Jamaah Yang Didaftarkan Tahun Ini",
          align: "left",
        },
        chart: {
          type: "area",
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Des",
          ],
        },
        tooltip: {
          x: {
            format: "MMM",
          },
        },
      },
    };
  },
  computed: {
    admin() {
      return store.state.operat.userall.filter((e) => {
        return e.type == "Admin";
      });
    },
    operator() {
      return store.state.operat.userall.filter((e) => {
        return e.type == "Operator";
      });
    },
    series() {
      return [this.admin.length, this.operator.length];
    },
    Jan() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "Jan" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    Feb() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "Feb" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    Mar() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "Jan" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    Apr() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "Apr" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    May() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "May" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    Jun() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "Jun" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    Jul() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "Jul" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    Aug() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "Aug" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    Sep() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "Sep" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    Oct() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "Oct" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    Nov() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "Nov" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    Dec() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return (
          moment(e.created_at).format("MMM") == "Dec" &&
          moment(e.created_at).format("yyyy") == new Date().getFullYear()
        );
      });
    },
    seriesJamaah() {
      return [
        {
          name: "Total Jamaah",
          data: [
            this.Jan.length,
            this.Feb.length,
            this.Mar.length,
            this.Apr.length,
            this.May.length,
            this.Jun.length,
            this.Jul.length,
            this.Aug.length,
            this.Sep.length,
            this.Oct.length,
            this.Nov.length,
            this.Dec.length,
          ],
        },
      ];
    },
    Totaljamaah() {
      return store.state.jamaah.jamaahall.filter((e) => {
        return moment(e.created_at).format("yyyy") == new Date().getFullYear();
      });
    },
    udahpulang() {
      return this.$store.state.jamaah.jamaahall
        .filter((a) => {
          return (
            moment(a.created_at).format("yyyy") == new moment().format("yyyy")
          );
        })
        .map((as) => {
          return as.pesanan.jadwal;
        })
        .filter((dd) => {
          return (
            moment(dd.pulang).isBefore(moment().format("yyyy-MM-DD"))
          );
        });
    },
    udahberangkat() {
      return this.$store.state.jamaah.jamaahall
        .filter((a) => {
          return (
            moment(a.created_at).format("yyyy") == new moment().format("yyyy")
          );
        })
        .map((as) => {
          return as.pesanan.jadwal;
        })
        .filter((dd) => {
          return moment(dd.berangkat).isBefore(moment().format("yyyy-MM-DD"));
        });
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
          categories: store.state.mitra.mitrall.map((e) => {
            return e.fullname;
          }),
        },
      };
    },
    seriesMitra() {
      return [
        {
          name: "Total Jamaah",
          data: store.state.mitra.mitrall
            .filter((e) => {
              return e.jamaah
                ? moment(e.jamaah.created_at).format("yyyy") ==
                    new Date().getFullYear()
                : null;
            })
            .map((e) => {
              return parseInt(e.jamaah.length);
            }),
        },
      ];
    },
  },
};
