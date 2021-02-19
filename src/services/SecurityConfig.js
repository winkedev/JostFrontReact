import axios from 'axios';

const CONFIG = "config.json";
const CONFIGWS = "configWS";
const ENABLELOGS = "logs";

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
    },

    getEnableLogs: () => {
        return localStorage.getItem(ENABLELOGS) ?? false;
    },

    setEnableLogs: (enableLogs) => {
        localStorage.setItem(ENABLELOGS, enableLogs);
    },

    writeLogs: (screen, content) => {
        if (localStorage.getItem(ENABLELOGS) == 'true') {
            console.log(`${screen} : ${content}`)
        }
    },

}