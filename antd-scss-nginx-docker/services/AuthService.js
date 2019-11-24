import BaseService from "./BaseService";
import { LOGIN_PATH, LOGOUT_PATH } from "../constants/Urls";

export default class AuthService {

    static loginRequest = (auth) => {
        return BaseService.post(LOGIN_PATH, auth);
    };

    static logoutRequest = (auth) => {
        return BaseService.post(LOGOUT_PATH, auth);
    };

}

