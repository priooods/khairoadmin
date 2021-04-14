import axios from "axios";
const client = axios.create({
  baseURL: "https://digitalsystemindo.com/khairo/public/api/",
});

export default client;
