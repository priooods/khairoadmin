import client from "./index";

export default {
  allpaket() {
    return client.get("umrah/all");
  },
  hoteladd() {
    return client.post("hotel/add");
  },
  allhotel() {
    return client.get("hotel/show");
  },
};
