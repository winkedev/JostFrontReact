import { BaseApi, MountError } from '../BaseApi';

export const ApiConnection = {
    testConnection: async () => {
        console.log(process.env.REACT_APP_WS);

        let resp;
        try {
            console.log("try open connection...")
            resp = await BaseApi.get("api/connection/test");
            console.log(`Response from test connection: ${resp}`);
        } catch (e) {
            resp = MountError(e);
        }

        return resp.data;
    },
    getConnectionString: async () => {
        let resp;
        try {
            console.log("try get connection string");
            resp = await BaseApi.get("api/connection/getconnection");
            console.log(`Response from get connection: ${resp}`);
        } catch (e) {
            resp = MountError(e);
        }

        return resp.data;
    }
}