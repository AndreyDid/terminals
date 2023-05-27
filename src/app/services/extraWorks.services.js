import httpService from "./http.service";
import {extraWorksEndpoint} from "../../endpoints";

const extraWorkService = {
    createExtraWork: async (payload) => {
        const { data } = await httpService.put(extraWorksEndpoint + payload._id, payload)
        return data
    },

    updateExtraWork: async (payload) => {
        const { data } = await httpService.patch(
            extraWorksEndpoint + payload._id,
            payload
        );
        return data;
    },
    removeExtraWork: async (workId) => {
        const { data } = await httpService.delete(extraWorksEndpoint + workId)
        return data
    },
    getExtraWork: async () => {
        const { data } = await httpService.get(extraWorksEndpoint)
        return data
    }
}
export default extraWorkService