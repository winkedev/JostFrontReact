import { BaseApi, MountError } from '../BaseApi';

export const ApiConnection = {
    testConnection: async () => {

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

    getConnection: async () => {
        let resp;
        try {
            resp = await BaseApi.get("api/connection/getconnection")
        }
        catch (e) {
            resp = MountError(e)
        }

        return resp.data;
    }
}