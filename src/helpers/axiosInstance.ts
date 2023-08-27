import axios from "axios";

const axiosInstance = axios.create({ baseURL: "/api", cancelToken: axios.CancelToken.source().token });
axiosInstance.defaults.headers["Cache-Control"] = "no-cache";
axiosInstance.defaults.headers["Pragma"] = "no-cache";
export default axiosInstance;
