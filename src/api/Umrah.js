import client from "./index";

export default {
  allpaket(data) {
    return client.post("umrah/show", data);
  },
  umrahall(data) {
    return client.post("umrah/show", data);
  },
  umrahadd(data) {
    return client.post("umrah/add", data);
  },
  umrahupdate(data) {
    return client.post("umrah/update", data);
  },
};
