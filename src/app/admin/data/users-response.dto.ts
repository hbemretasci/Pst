import { UserDto } from "./user.dto";

export interface UsersResponseDto {
    success: boolean,
    data: UserDto[]
}