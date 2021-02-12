import { BaseApi } from '../BaseApi';

export const ApiPlanoInspecao = {
    getAll: async () => {
        var resp = await BaseApi.get('api/planoinspecao/getall')
        return resp.data;
    }
}