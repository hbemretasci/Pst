import { UserDto } from "./user.dto";

export interface UserResponseDto {
    success: boolean,
    data: UserDto
}