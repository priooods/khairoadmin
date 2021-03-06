import client from "./index";
export default {
  allgudang(data) {
    return client.post("gudang/show", { page: data });
  },
  addbelanja(data) {
    return client.post("belanja/add", data);
  },
  allbelanja(data) {
    return client.post("belanja/show", data);
  },
  deleteGudang(data) {
    return client.post("gudang/delete", data);
  },
  updateGudang(data) {
    return client.post("gudang/update", data);
  },
  cancelbelanja(data) {
    return client.post("belanja/cancel", { id: data });
  },
  akuntan() {
    return client.get("akuntan/show");
  },
};
