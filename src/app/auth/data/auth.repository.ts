import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, exhaustMap, map, Observable, take, tap } from "rxjs";
import { LoggedUser } from "../domain/logged-user";
import { LoginModel } from "../domain/login.model";
import { StoraggedUserEntity } from "./storagged-user.entity";
import { AuthMapper } from "./auth.mapper";
import { LoginResponseDto } from "./login-response.dto";

@Injectable({
    providedIn: 'root'
})
export class AuthRepository {
    user = new BehaviorSubject<LoggedUser>(null);

    url = "http://localhost:5000/api/auth";
    
    mapper = new AuthMapper();

    private httpClient = inject(HttpClient)

    loginUser(params: { email: string; password: string }): Observable<LoginModel> {
        return this.httpClient.post<LoginResponseDto>(this.url + '/login', params)
        .pipe( 
            map(r => this.mapper.loginToModel(r))
        )
    }

    removeLocalStorage(key: string) {
        localStorage.removeItem(key);
    }

    setLocalStorage(key: string, value: StoraggedUserEntity) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getLocalStorage(key: string): StoraggedUserEntity {
        return JSON.parse(localStorage.getItem(key));
    }

    isLoggedUserAdmin(): Observable<boolean> {
        return this.user.pipe(
            map(user => {
                if((user) && (user.role == "Admin")) {
                    return true;
                } else {
                    return false;
                }
            }),
            tap(isAdmin => {
                return isAdmin;
            })
        );
    }

    isLoggedUser(): Observable<boolean> {
        return this.user.pipe(
            map(user => {
                if(user) {
                    return true;
                } else {
                    return false;
                }
            })
        );
    }

    getLoggedUser(): Observable<LoggedUser> {
        return this.user;
    }

    addTokenToRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user) {
                    return next.handle(req);
                }
                const updatedRequest = req.clone({
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "Authorization": "Bearer: " + user.token
                    })
                })
                return next.handle(updatedRequest);
            })
        )
    }

    addLoggedUserToSubject(loggedUser: LoggedUser) {
        this.user.next(loggedUser);
    }

    removeLoggedUserFromSubject() {
        this.user.next(null);
    }

}