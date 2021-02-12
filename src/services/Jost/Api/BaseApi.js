import axios from 'axios';


export const BaseApi = axios.create({
    baseURL: process.env.REACT_APP_WS
});

export const MountError = (e) => {

    console.log(e.response);

    return {
        data: null,
        sucess: 0,
        message: e.response.data
    }
}