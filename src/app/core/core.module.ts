import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthIntercepter } from "./auth.intercepter";
import { ErrorInterceptor } from "./error.interceptor";

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true }
      ]
})
export class CoreModule {
}