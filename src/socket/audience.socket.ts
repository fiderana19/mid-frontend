import { SOCKET } from "./sockets";

export const useAudienceUserSocket = (action: () => void) => {
    SOCKET.on("new_audience_organized", (data) => action());
    SOCKET.on("new_audience_treated", (data) => action());
    SOCKET.on("new_audience_closed", (data) => action());
    SOCKET.on("new_audience_missed", (data) => action());
    SOCKET.on("new_audience_reported", (data) => action());

    return () => {
        SOCKET.off('new_audience_organized');
        SOCKET.off('new_audience_treated');
        SOCKET.off('new_audience_closed');
        SOCKET.off('new_audience_missed');
        SOCKET.off('new_audience_reported');
    };
}