import client from "./index";
export default {
  LoginOperator(data) {
    return client.post("operator/login", data);
  },
  AllOperator() {
    return client.get("operator/show");
  },
  LogoutOperator(username) {
    return client.post("operator/logout", { username: username });
  },
  UpdateOperator(data) {
    return client.post("operator/update", data);
  },
  DeleteOperator(username) {
    return client.post("operator/delete", { username: username });
  },
  AddOperator(data) {
    return client.post("operator/add", data);
  },
};
