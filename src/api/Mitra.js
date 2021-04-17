import client from "./index";

export default {
  allmitra() {
    return client.post("mitra/show", { fee: 2000000, mitra_fee: 200000 });
  },
  loginmitra(data) {
    return client.post("mitra/login", data);
  },
  addmitra(data) {
    return client.post("mitra/add", data);
  },
  deletemitra(username) {
    return client.post("mitra/delete", { username: username });
  },
  addCabang(data) {
    return client.post("cabang/add", data);
  },
  allCabang() {
    return client.get("cabang/show");
  },
  updateCabang(data) {
    return client.post("cabang/update", data);
  },
  deleteCabang(data) {
    return client.post("cabang/delete", data);
  },
};
