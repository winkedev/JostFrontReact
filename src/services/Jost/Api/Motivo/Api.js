import { BaseApi, MountRespGet, MountRespPost, MountRespDelete } from '../BaseApi';

export const ApiMotivo = {
    getAll: async () => {
        return await MountRespGet('api/motivo/getall');
    },
    saveUpdate: async (motivo) => {
        return await MountRespPost('api/motivo/saveupdate', motivo);
    },
    deleteN1: async (motivoN1) => {
        return await MountRespPost('api/motivo/deleteN1', motivoN1);
    },
    deleteN2: async (motivoN2) => {
        return await MountRespPost('api/motivo/deleteN2', motivoN2);
    }
}