import { createContext, ReactNode, useContext, useState } from "react";
import { checkEmailExistisAPI, userLogin } from "../api/users";
import { useNavigate } from "react-router-dom";

type AuthContextProps = {
    token?: string | null;
    isAuthenticated?: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token"),
    );
    const navigate = useNavigate();

    const isAuthenticated = !!token;

    const login = async (email: string, password: string) => {
        try {
            const data = await userLogin(email, password)

            if(data) {
                setToken(data);
                localStorage.setItem("token", data);

                const decodedToken = JSON.parse(atob(data.split('.')[1]));
                if(decodedToken.role[0] === "admin") {
                    navigate("/admin/home");
                } else if(decodedToken.role[0] === "user" && !decodedToken.id) {
                    const user = await checkEmailExistisAPI(email);
                    console.log(user);
                    if(user) {
                        navigate("/");
                    } else {
                        console.error("User not found.", user);
                    }
                } else {
                    navigate("/user/home");
                }
            }
        } catch (error) {
            throw error;
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