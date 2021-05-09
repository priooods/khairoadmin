import client from "./index";

export default {
  addjamaah(data) {
    return client.post("jamaah/add", data);
  },
  pesananupdate(data) {
    return client.post("pesanan/update", data);
  },
  alljamaah(data) {
    return client.post("jamaah/show", data);
  },
  jamaahbelumbayar() {
    return client.get("jamaah/tagihan");
  },
  jamaahbayar(data) {
    return client.post("jamaah/bayar", data);
  },
  jamaahhapus(id) {
    return client.post("jamaah/delete", { id: id });
  },
  jamaahupdate(data) {
    return client.post("jamaah/update", data);
  },
};
