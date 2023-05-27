import httpService from "./http.service";
import {worksEndpoint} from "../../endpoints";

const workService = {
    createWork: async (payload) => {
        const { data } = await httpService.put(worksEndpoint + payload._id, payload)
        return data
    },

    updateWork: async (payload) => {
        const { data } = await httpService.patch(
            worksEndpoint + payload._id,
            payload
        );
        return data;
    },
    removeWork: async (workId) => {
        const { data } = await httpService.delete(worksEndpoint + workId)
        return data
    },
    getWork: async () => {
        const { data } = await httpService.get(worksEndpoint)
        return data
    }
}
export default workService