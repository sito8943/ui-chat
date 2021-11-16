import { getAuth } from "../auth/auth";
import config from "../config";
import axios from "axios";

export async const sendMessage = (who, target, message) => {
    try {
        const response = await axios.post(`${config.serverUrl}/send/message`, {
            who: who,
            target: target,
            message: message
        },
        {
            headers: getAuth
        }
        )
        const result = response.status
        if (result != 200) return response.statusText
        return result
    } catch (err) {
        return String(error)
    }
}