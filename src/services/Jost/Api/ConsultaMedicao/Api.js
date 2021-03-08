import { MountRespGet, MountRespPost } from '../BaseApi';

export const ApiConsultaMedicao = {

    getAll: async () => {
        return await MountRespGet("api/medicao/getall");
    },
    getBy: async (dto) => {
        return await MountRespPost("api/medicao/getby", dto);
    },
    getItemReprovadoBy: async (dto) => {
        return await MountRespPost("api/medicao/getItemReprovadoBy", dto);
    },
    updateAll: async (dic) => {
        return await MountRespPost("api/medicao/updateall", dic);
    }
}