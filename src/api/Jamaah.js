import client from "./index";

export default {
  addjamaah(data) {
    return client.post("jamaah/add", data);
  },
  alljamaah() {
    return client.get("jamaah/show");
  },
  jamaahbelumbayar() {
    return client.get("jamaah/tagihan");
  },
};
