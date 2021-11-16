import { base64encode } from "nodejs-base64";
import config from "../config"

export const user = { name: "react", pass: config.reactAuth };
export const getAuth = { 
  Authorization: "Basic " + base64encode(user.name + ":" + user.pass),
  Accept: "application/json",
  "Content-Type": "application/json",
 }
