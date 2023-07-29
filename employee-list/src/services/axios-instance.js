import axios from "axios";

const axiosApiInstance = axios.create();

axiosApiInstance.defaults.headers.post["Content-Type"] = "application/json";

axiosApiInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

 export default axiosApiInstance;
