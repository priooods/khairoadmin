import client from "./index";

export default {
  addjamaah(data) {
    return client.post("jamaah/add", data);
  },
  pesananupdate(id, value) {
    return client.post("pesanan/update", {  id: id, harga_kamar: value  });
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
};
