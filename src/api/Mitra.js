import client from "./index";

export default {
  allmitra() {
    return client.get("mitra/show");
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
