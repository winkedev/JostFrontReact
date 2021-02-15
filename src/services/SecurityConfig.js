import axios from 'axios';

const CONFIG = "config.json";
const CONFIGWS = "configWS";

export const SecurityConfig = {

    getConfigWS: async () => {

        let configWS = localStorage.getItem(CONFIGWS);

        if (configWS) {
            return configWS;
        }

        let resp = await axios.get(CONFIG);

        localStorage.setItem(CONFIGWS, resp.data.WS);
        console.log("set into storage");
        return resp.data.WS;
    },

    setConfigWS: async () => {
        let resp = await axios.get(CONFIG);

        localStorage.setItem(CONFIGWS, resp.data.WS);
    }

}