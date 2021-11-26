import { getAuth } from "../auth/auth";
import config from "../config";
import axios from "axios";
import ChatMessage from "../models/ChatMessage";
import User from "../models/User";

/**
 *
 * @param {ChatMessage} message
 * @param {User} target
 * @returns
 */
export const sendMessage = async (message, target) => {
  try {
    const response = await axios.post(
      `${config.serverUrl}/send/message`,
      {
        u: message.Sender,
        t: target.Name,
        m: message.Message,
      },
      {
        headers: getAuth,
      }
    );
    const result = response.status;
    if (result != 200) return response.statusText;
    return result;
  } catch (err) {
    return String(err);
  }
};
