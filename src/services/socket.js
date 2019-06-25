import socketIOClient from "socket.io-client";
import { config } from "../config/config";

export const socket = socketIOClient(config.url);
