import axios from 'axios';


export const BaseApi = axios.create({
    baseURL: process.env.REACT_APP_WS
});

export const MountError = (e) => {
    return {
        data: null,
        sucess: 0,
        message: e.message
    }
}