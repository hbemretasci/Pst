import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { IsLoggedUserUseCase } from "./domain/use-case/is-logged-user.usecase";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private isLoggedUserUseCase = inject(IsLoggedUserUseCase);
    private router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.isLoggedUserUseCase.execute().pipe(
            tap(isAuth => {
                if(!isAuth) {
                    this.router.navigate(['auth/login']);
                }
            })
        );
    }

}