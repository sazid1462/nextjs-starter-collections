import React, { createContext, useState } from "react";
import AuthService from "../services/AuthService";
import { redirectTo } from "../components/common/Redirect";
import cookie from "js-cookie";
import { LOGIN_PATH, HOME_PATH } from "../constants/Routes";

export const AuthContext = createContext();


const AuthContextProvider = ({auth, children}) => {


    const [ loading, setLoading ] = useState(false);
    const [ user, setUser ] = useState(auth ? auth : null);

    const loginRequest = async (credential) => {

        setLoading(true);

        AuthService.loginRequest(credential).then(res => {
            setLoading(false);
            setUser(res.data);

            /* NOTE:
             * Need to set all valid data in cookies.
             */
            cookie.set("auth", JSON.stringify({
                token: res.data,
                user: null
            }));

            return redirectTo(HOME_PATH);
        }).catch(err => {
            setLoading(false);
            setUser(null);
        });

    };

    const logout = () => {
        setUser(null);
        cookie.remove("auth");
        return redirectTo(LOGIN_PATH);
    };

    return (
        <AuthContext.Provider
            value={{
                loading,
                principal: user,
                loginRequest,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
