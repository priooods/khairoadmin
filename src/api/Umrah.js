import client from "./index";

export default {
  filterpaket() {
    return client.get("umrah/show");
  },
  allpaket(data) {
    return client.post("umrah/show", data);
  },
  umrahadd(data) {
    return client.post("umrah/add", data);
  },
  umrahdetail(data) {
    return client.post("umrah/show", { id: data });
  },
  maskapaiadd(data) {
    return client.post("maskapai/add", data);
  },
  allmaskapai(data) {
    return client.post("maskapai/show", data);
  },
  hoteladd(data) {
    return client.post("hotel/add", data);
  },
  allhotel(data) {
    return client.post("hotel/show", data);
  },
  hoteldelete(id) {
    return client.post("hotel/delete", { id: id });
  },
  hotelupdate(data) {
    return client.post("hotel/update", data);
  },
};
