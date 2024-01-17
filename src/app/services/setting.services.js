import httpService from "./http.service";
import {settingEndpoint} from "../../endpoints";

const settingService = {
    createSetting: async (payload) => {
        const { data } = await httpService.put(settingEndpoint + payload._id, payload)
        return data
    },
    removeSetting: async (settingId) => {
        const { data } = await httpService.delete(settingEndpoint + settingId)
        return data
    },
    updateSetting: async (payload) => {
        const { data } = await httpService.patch(
            settingEndpoint + payload._id,
            payload
        );
        return data;
    },
    getSetting: async () => {
        const { data } = await httpService.get(settingEndpoint)
        return data
    }
}
export default settingService