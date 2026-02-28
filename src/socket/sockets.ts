import { io } from "socket.io-client";

export const SOCKET = io("http://localhost:3002", {
    transports: ['websocket'],
});
