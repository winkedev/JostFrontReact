import { BaseApi, MountError } from '../BaseApi';


export const ApiOrdemProducao = {
    getAll: async () => {
        var resp;

        try {
            resp = await BaseApi.get("api/ordemproducao/getall")
        }
        catch (e) {
            resp = MountError(e);
        }

        return resp.data;
    }
}