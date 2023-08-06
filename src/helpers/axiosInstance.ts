import axios from "axios";

const axiosInstance = axios.create({ baseURL: "/api", cancelToken: axios.CancelToken.source().token });

export default axiosInstance;
