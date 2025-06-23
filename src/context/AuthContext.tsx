import { createContext, ReactNode, useContext, useState } from "react";
import { userLogin } from "../api/users";
import { useNavigate } from "react-router-dom";
import { HttpStatus } from "../constants/Http_status";
import { ToastContainer } from "react-toastify";
import { LoginInterface } from "@/interfaces/User";

type AuthContextProps = {
    token?: string | null;
    isAuthenticated?: boolean;
    login: (data: LoginInterface) => Promise<any>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token"),
    );
    const navigate = useNavigate();

    const isAuthenticated = !!token;

    const login = async (loginCredentials: LoginInterface) => {
        const response = await userLogin(loginCredentials);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
            const data = response?.data.token;
            const isNotFirstLogin = response?.data.is_not_first_login;

            setToken(data);
            localStorage.setItem("token", data);

            const decodedToken = JSON.parse(atob(data.split('.')[1]));
            if(decodedToken.role[0] === "admin") {
                if(isNotFirstLogin === false) {
                    navigate("/admin/password");
                } else {
                    navigate("/admin/home");
                }
            } else {
                if(isNotFirstLogin === true) {
                    navigate("/user/password");
                } else {
                    navigate("/user/home");
                }
            }
        }
    } 

    async function logout() {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <AuthContext.Provider 
            value={{
                token,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
            <ToastContainer />
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("useAuth must be inside of a AuthProvider");
    }
    return context;
}