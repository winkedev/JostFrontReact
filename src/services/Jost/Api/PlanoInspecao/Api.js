import { MountRespGet, MountRespPost } from '../BaseApi';

export const ApiPlanoInspecao = {
    getAll: async () => {
        return await MountRespGet('api/planoinspecao/getall');
    },
    getBy: async (dto) => {
        return await MountRespPost('api/planoinspecao/getby', dto);
    },
    getReprovadoBy: async (dto) => {
        return await MountRespPost('api/planoinspecao/getreprovadoby', dto);
    },
    getAllCodCC: async () => {
        return await MountRespGet('api/planoinspecao/getallcodcc');
    },
    getAllCodItem: async () => {
        return await MountRespGet('api/planoinspecao/getallcoditem');
    },
    getAllVersaoPlanoPadrao: async () => {
        return await MountRespGet('api/planoinspecao/getallversaopp');
    },
    getAllPlanoPadrao: async () => {
        return await MountRespGet('api/planoinspecao/getallplanopadrao');
    }
}