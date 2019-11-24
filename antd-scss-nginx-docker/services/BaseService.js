import axios from "axios";
import cookie from "js-cookie";
import { redirectTo } from "../components/common/Redirect";
import { LOGIN_PATH } from "../constants/Routes";

export default class BaseService {

    static get = (url, { headers, params } = {headers: {}}) => {
        const newHeaders = { ...BaseService.getAuthHeader(), ...headers };

        const res = axios.get(url, { headers: newHeaders, params});
        res.catch(err => {
            BaseService.handleAuthError(err);
        });

        return res;
    };

    static post = (url, body, { headers, params } = { headers: {} }) => {
        const newHeaders = { ...BaseService.getAuthHeader(), ...headers };
        const res = axios.post(url, body, { headers: newHeaders, params});

        res.catch(err => BaseService.handleAuthError(err));

         return res;
    };


    static getAuthHeader = () => {
        return {
            Authorization: `Bearer ${JSON.parse(cookie.get("auth")||"{}").token}`
        };
    };

    static handleAuthError = async (err) => {
        console.log(err);
        console.log(err.response);
        switch(err.response.status) {
            case 401:
                cookie.remove("auth");
                await redirectTo(LOGIN_PATH);
                break;
            case 403:
                console.log("Forbidden!");
                break;
        }
    }

}
