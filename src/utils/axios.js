import axios from "axios";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: "http://ed63-190-114-41-177.ngrok.io",
  headers: { "Access-Control-Allow-Origin": "*" },
  mode: "CORS",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Algo a salido mal"
    )
);

export default axiosInstance;
