import { getAuth } from "../auth/auth";
import config from "../config";
import axios from "axios";

export const connectionState = async () => {
    try {
        const response = await axios.get(`${config.serverUrl}/status`, {
            headers: getAuth,
        });
        const result = response.status
        if (result != 200) return response.statusText
        return result
    } catch (err) {
        return String(error)
    }
}