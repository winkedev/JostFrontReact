import axios from 'axios';

export const BaseApi = axios.create({
    baseURL: localStorage.getItem("configWS")
});

export const MountError = (e) => {
    return {
        data: null,
        sucess: 0,
        message: e.response?.data
    }
}