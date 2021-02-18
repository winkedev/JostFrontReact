import { BaseApi, MountError } from '../BaseApi';

export const ApiPlanoInspecao = {
    getAll: async () => {
        var resp = await BaseApi.get('api/planoinspecao/getall')
        return resp.data;
    },
    getBy: async (dto) => {
        let resp;

        try {
            resp = await BaseApi.post('api/planoinspecao/getby', dto);
        }
        catch (e) {
            resp = MountError(e);
        }

        return resp.data;
    },
    getAllCodCC: async () => {
        var resp;

        try {
            resp = await BaseApi.get('api/planoinspecao/getallcodcc')
        }
        catch (e) {
            resp = MountError(e);
        }

        return resp.data;
    },
    getAllCodItem: async () => {
        var resp;

        try {
            resp = await BaseApi.get('api/planoinspecao/getallcoditem')
        }
        catch (e) {
            resp = MountError(e);
        }

        return resp.data;
    },
}