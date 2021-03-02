import { BaseApi, MountRespGet, MountRespPost, MountRespDelete } from '../BaseApi';

export const ApiMotivo = {
    getAll: async () => {
        return MountRespGet('api/motivo/getall');
    },
    saveUpdate: async (motivo) => {
        return MountRespPost('api/motivo/saveupdate', motivo);
    },
    deleteN2: async (motivoN2) => {
        return MountRespPost('api/motivo/deleteN2', motivoN2);
    }
}