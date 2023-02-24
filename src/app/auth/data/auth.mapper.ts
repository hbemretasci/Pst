import { LoginModel } from "../domain/login.model";
import { LoginResponseDto } from "./login-response.dto";

export class AuthMapper {

    loginToModel(param: LoginResponseDto): LoginModel {
        return {
            name: param.data.name,
            email: param.data.email,
            role: param.data.role,
            token: param.access_token,
            expiresIn: param.expiresIn,
        }
    }
}