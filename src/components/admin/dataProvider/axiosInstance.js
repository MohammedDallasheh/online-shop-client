import axios from "axios";
import { alert, errorAlert } from "../../../function/alert";
const apiUrl = "http://localhost:5000/api";
const defaultConfig = {
  baseURL: apiUrl,
  headers: { "Admin-Dashboard": "true" },
};
const axiosMethods = [
  "get",
  "delete",
  "head",
  "options",
  "post",
  "put",
  "patch",
];

const axiosInstance = axiosMethods.reduce((instance, method) => {
  instance[method] = async (...arg) => {
    try {
      const res = await axios[method](...arg, defaultConfig);
      return res;
    } catch (err) {
      errorAlert(err);
      return { data: { docs: [] } };
    }
  };
  return instance;
}, {});

const mergeConfig = (config) => ({ ...defaultConfig, ...config });
const axiosMethods2 = {
  get: (url, config) => axios.get(url, config),
  delete: () => axios.delete(),
  post: () => axios.post(),
  put: () => axios.put(),
};

export default axiosInstance;
