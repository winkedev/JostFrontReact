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

export const MountRespGet = async (url) => {
    var resp;
    try {
        resp = await BaseApi.get(url);
    }
    catch (e) {
        resp = MountError(e);
    }

    return resp.data;
}

export const MountRespPost = async (url, data) => {
    var resp;
    try {
        resp = await BaseApi.post(url, data);
    }
    catch (e) {
        resp = MountError(e);
    }

    return resp.data;
}

export const MountRespDelete = async (url, data) => {
    var resp;
    try {
        resp = await BaseApi.delete(url, data);
    }
    catch (e) {
        resp = MountError(e);
    }

    return resp.data;
}

export const MountRespPut = async (url, data) => {
    var resp;
    try {
        resp = await BaseApi.put(url, data);
    }
    catch (e) {
        resp = MountError(e);
    }

    return resp.data;
}