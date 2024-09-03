import { PageDto } from "./page.dto";
import { UserDto } from "./user.dto";

export interface UsersResponseDto {
    success: boolean,
    count: string,
    pagination: {
        previous?: PageDto,
        next?: PageDto
    }
    data: UserDto[]
}