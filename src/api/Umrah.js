import client from "./index";

export default {
  allpaket() {
    return client.get("umrah/show");
  },
  umrahadd(data) {
    return client.post("umrah/add", data);
  },
  maskapaiadd(data) {
    return client.post("maskapai/add", data);
  },
  allmaskapai() {
    return client.get("maskapai/show");
  },
  hoteladd(data) {
    return client.post("hotel/add", data);
  },
  allhotel() {
    return client.get("hotel/show");
  },
  hoteldelete(id) {
    return client.post("hotel/delete", { id: id });
  },
  hotelupdate(data) {
    return client.post("hotel/update", data);
  },
};
