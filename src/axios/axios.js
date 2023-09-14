import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"http://localhost:5124/api",
});

axiosInstance.interceptors.request.use(
    config => {
        console.log("hi")
        const token = localStorage.getItem('authtoken');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
            console.log(config.headers.authorization)
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
