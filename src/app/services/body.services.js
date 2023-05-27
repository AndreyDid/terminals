import httpService from "./http.service";
import {bodyEndpoint} from "../../endpoints";

const bodyService = {
    createBody: async (payload) => {
        const { data } = await httpService.put(bodyEndpoint + payload._id, payload)
        return data
    },
    removeBody: async (bodyId) => {
        const { data } = await httpService.delete(bodyEndpoint + bodyId)
        return data
    },

    getBody: async () => {
        const { data } = await httpService.get(bodyEndpoint)
        return data
    }
}
export default bodyService