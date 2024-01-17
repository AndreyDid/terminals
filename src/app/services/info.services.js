import httpService from "./http.service";
import {infoEndpoint} from "../../endpoints";

const infoService = {
    createInfo: async (payload) => {
        const { data } = await httpService.put(infoEndpoint + payload._id, payload)
        return data
    },

    updateInfo: async (payload) => {
        const { data } = await httpService.patch(
            infoEndpoint + payload._id,
            payload
        );
        return data;
    },
    removeInfo: async (infoId) => {
        const { data } = await httpService.delete(infoEndpoint + infoId)
        return data
    },
    getInfo: async () => {
        const { data } = await httpService.get(infoEndpoint)
        return data
    }
}
export default infoService