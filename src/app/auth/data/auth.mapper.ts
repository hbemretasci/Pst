import { MessageModel } from "../domain/message.model";
import { ForgotPassModel } from "../domain/forgot-pass.model";
import { LoginModel } from "../domain/login.model";
import { MessageResponseDto } from "./message-response.dto";
import { ForgotPassResponseDto } from "./forgot-pass-response.dto";
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

    forgotToModel(param: ForgotPassResponseDto): ForgotPassModel {
        return {
            success: param.success,
            message: param.message
        }
    }

    editToModel(param: MessageResponseDto): MessageModel {
        return {
            success: param.success,
            message: param.message
        }
    }

}