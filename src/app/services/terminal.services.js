import httpService from "./http.service";
import {terminalEndpoint} from "../../endpoints";

const terminalService = {
    createTerminal: async (payload) => {
        const { data } = await httpService.put(terminalEndpoint + payload._id, payload)
        return data
    },
    getTerminal: async () => {
        const { data } = await httpService.get(terminalEndpoint)
        return data
    },
    updateTerminal: async (payload) => {
        const { data } = await httpService.patch(
            terminalEndpoint + payload._id,
            payload
        );
        return data;
    },
    removeTerminal: async (terminalId) => {
        const { data } = await httpService.delete(terminalEndpoint + terminalId)
        return data
    }
}
export default terminalService