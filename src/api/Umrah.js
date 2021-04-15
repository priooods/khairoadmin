import client from "./index";

export default {
  allpaket() {
    return client.get("umrah/all");
  },
  hoteladd(data) {
    return client.post("hotel/add", data);
  },
  allhotel() {
    return client.get("hotel/show");
  },
};
