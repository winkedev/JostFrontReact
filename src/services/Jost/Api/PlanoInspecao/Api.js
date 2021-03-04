import { MountRespGet, MountRespPost } from '../BaseApi';

export const ApiPlanoInspecao = {
    getAll: async () => {
        return await MountRespGet('api/planoinspecao/getall');
    },
    getBy: async (dto) => {
        return await MountRespPost('api/planoinspecao/getby', dto);
    },
    getAllCodCC: async () => {
        return await MountRespGet('api/planoinspecao/getallcodcc');
    },
    getAllCodItem: async () => {
        return await MountRespGet('api/planoinspecao/getallcoditem');
    },
    getAllVersaoPlanoPadrao: async () => {
        return await MountRespGet('api/planoinspecao/getallversaopp');
    }
}