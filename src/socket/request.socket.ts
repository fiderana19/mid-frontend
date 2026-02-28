import { SOCKET } from "./sockets";

export const useRequestSocket = (action: () => void) => {
    SOCKET.on("new_request_created", (data) => action());
    SOCKET.on("new_request_accepted", (data) => action());
    SOCKET.on("new_request_denied", (data) => action());
    SOCKET.on("new_request_updated", (data) => action());
    SOCKET.on("new_request_deleted", (data) => action());
    SOCKET.on("new_request_deleted_by_user", (data) => action());

    return () => {
        SOCKET.off('new_request_created');
        SOCKET.off('new_request_accepted');
        SOCKET.off('new_request_denied');
        SOCKET.off('new_request_updated');
        SOCKET.off('new_request_deleted');
        SOCKET.off('new_request_deleted_by_user');
    };
}