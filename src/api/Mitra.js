import client from "./index";

export default {
  showmitra() {
    return client.post("mitra/show", { fee: 2000000, mitra_fee: 200000 });
  },
  allmitra(params) {
    return client.get("mitra/all", {
      params: params,
    });
  },
  search(data) {
    return client.post("mitra/search", data);
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
  updatemitra(data) {
    return client.post("mitra/update", data);
  },
  addCabang(data) {
    return client.post("cabang/add", data);
  },
  allCabang(data) {
    return client.post("cabang/show", data);
  },
  updateCabang(data) {
    return client.post("cabang/update", data);
  },
  deleteCabang(data) {
    return client.post("cabang/delete", data);
  },
  logoutMitra(data) {
    return client.post("mitra/logout", { username: data });
  },
};
