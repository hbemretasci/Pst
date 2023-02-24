import { UserModel } from "../domain/user.model";
import { UserResponseDto } from "./user-response.dto";
import { UserDto } from "./user.dto";
import { UsersResponseDto } from "./users-response.dto";

export class AdminMapper {

    userToModel(param: UserResponseDto): UserModel {
        return {
            id: param.data._id,
            fullName: param.data.name,
            email: param.data.email,
            role: param.data.role,
            organizationName: param.data.organizationName,
            title: param.data.title,
            department: param.data.department
        }
    }

    convert(param: UserDto): UserModel {
        return {
            id: param._id,
            fullName: param.name,
            email: param.email,
            role: param.role,
            organizationName: param.organizationName,
            title: param.title,
            department: param.department
        }
    }

    usersToModel(param: UsersResponseDto): UserModel[] {
        return param.data.map(this.convert);
    }
    
}