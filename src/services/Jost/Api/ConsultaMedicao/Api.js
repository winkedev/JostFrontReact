import { BaseApi, MountError } from '../BaseApi';

export const ApiConsultaMedicao = {

    getAll: async () => {
        var resp = await BaseApi.get("api/medicao/getall");
        return resp.data;
    },
    getBy: async (dto) => {
        var resp;
        try {
            resp = await BaseApi.post("api/medicao/getby", dto);
        }
        catch (e) {
            resp = MountError(e);
        }

        return resp.data;
    },
    updateAll: async (dic) => {
        var resp;

        try {
            resp = await BaseApi.post("api/medicao/updateall", dic)
        }
        catch (e) {
            resp = MountError(e);
        }

        return resp.data;
    }
}