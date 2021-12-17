import { getAuth } from "../auth/auth";
import config from "../config";
import axios from "axios";

import CryptoJs from "crypto-js";

/**
 *
 * @param {object} user
 * @returns
 */
export const login = async (user) => {
  try {
    const response = await axios.post(
      `${config.serverUrl}/login`,
      { n: user.n, p: CryptoJs.MD5(user.p).toString() },
      {
        headers: getAuth,
      }
    );
    const result = response.status;
    if (result === 200) {
      const data = await response.data;
      if (data !== "wrong") return data;
      else return "wrong";
    }
    return 200;
  } catch (err) {
    return String(err);
  }
};

/**
 *
 * @param {object} user
 * @returns
 */
 export const register = async (user) => {
  try {
    const response = await axios.post(
      `${config.serverUrl}/register`,
      { n: user.n, p: CryptoJs.MD5(user.p).toString() },
      {
        headers: getAuth,
      }
    );
    const result = response.status;
    if (result === 200) {
      const data = await response.data;
      if (data !== "wrong") return data;
      else return "wrong";
    }
    return 200;
  } catch (err) {
    return String(err);
  }
};