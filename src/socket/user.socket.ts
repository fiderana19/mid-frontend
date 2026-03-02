import { SOCKET } from "./sockets";

export const useUserAccountSocket = (action: () => void) => {
    SOCKET.on("new_user_created", (data) => action());

    return () => {
        SOCKET.off('new_user_created');
    };
}