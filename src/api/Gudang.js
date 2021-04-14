import client from "./index";
export default {
  allgudang() {
    return client.get("gudang/all");
  },
  addbelanja(data) {
    return client.post("belanja/add", data);
  },
  allbelanja() {
    return client.get("belanja/show");
  },
  cancelbelanja(data) {
    return client.post("belanja/cancel", { id: data });
  },
};
