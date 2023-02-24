import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { IsLoggedUserAdminUseCase } from "../auth/domain/use-case/is-logged-user-admin.usecase";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    private isLoggedUserAdminUseCase = inject(IsLoggedUserAdminUseCase);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.isLoggedUserAdminUseCase.execute();
    }

}