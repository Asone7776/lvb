
import axios from "axios";
import Cookies from "js-cookie";
export const axiosAuth = axios.create({
    baseURL: "https://vsk-trust.ru/api/lb"
});

axiosAuth.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        let status = (error.response && error.response.status) || 0;
        if (status === 401 && window.location.pathname !== "/") {
            Cookies.remove("token");
            window.location.href = '/';
        }
        return Promise.reject(error)
    });

axiosAuth.interceptors.request.use(function (request) {
    const token = Cookies.get("token");
    request.headers["Authorization"] = `Bearer ${token}`;
    return request;
});



export const axiosDefault = axios.create({
    baseURL: "https://vsk-trust.ru/api/lb"
});

