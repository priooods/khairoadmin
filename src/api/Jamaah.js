import client from "./index";

export default {
  addjamaah(data) {
    return client.post("jamaah/add", data);
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
  jamaahPesanan(data) {
    return client.post('pesanan/update', data);
  }
};
