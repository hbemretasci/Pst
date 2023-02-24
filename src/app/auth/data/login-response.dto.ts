export interface LoginResponseDto {
    success: boolean,
    access_token: string,
    expiresIn: string,
    data: {
        name: string,
        email:string,
        role: string
    }
}