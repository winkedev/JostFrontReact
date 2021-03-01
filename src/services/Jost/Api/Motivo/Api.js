import { BaseApi, MountError } from '../BaseApi';

export const ApiMotivo = {
    getAll: async () => {
        var resp;
        try {
            resp = await BaseApi.get('api/motivo/getall')
        }
        catch (e) {
            resp = MountError(e);
        }

        return resp.data;
    }
}