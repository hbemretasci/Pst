import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { UserModel } from "../domain/user.model";
import { AdminMapper } from "./admin.mapper";
import { UserResponseDto } from "./user-response.dto";
import { UsersResponseDto } from "./users-response.dto";

@Injectable({
    providedIn: 'root'
})
export class AdminRepository {   
    url = "http://localhost:5000/api/admin";

    mapper = new AdminMapper();

    private httpClient = inject(HttpClient)

    register(params: {
        name: string;
        email: string;
        role: string;
        password: string;
        organization: string;
        organizationName: string;
        title: string;
        department: string;
        disabled: boolean
    }): Observable<UserModel> {
        return this.httpClient.post<UserResponseDto>(this.url + '/register', params )
        .pipe(
            map(r => this.mapper.userToModel(r))
        );
    }
    
    getUserById(params: { userId: string }): Observable<UserModel> {
        return this.httpClient.get<UserResponseDto>(this.url + '/user/' + params.userId)
        .pipe(
            map(r => this.mapper.userToModel(r))
        );
    }

    getUsersByCategory(params: { categoryName: string }): Observable<UserModel[]> {
        let newUrl = this.url + '/users';
        if(params.categoryName) newUrl += '/' + params.categoryName;

        return this.httpClient.get<UsersResponseDto>(newUrl)
        .pipe(
            map(r => this.mapper.usersToModel(r))
        );
    } 

    getAllUsers(): Observable<UserModel[]> {
        return this.httpClient.get<UsersResponseDto>(this.url + '/users')
        .pipe(
            map(r => this.mapper.usersToModel(r))
        );
    } 

}