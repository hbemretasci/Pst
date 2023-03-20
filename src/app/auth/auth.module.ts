import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthLoginComponent } from "./presentation/auth-login/auth-login.component";
import { AuthProfileComponent } from './presentation/auth-profile/auth-profile.component';
import { AuthHomeComponent } from './presentation/auth-home/auth-home.component';
import { AuthForgotPasswordComponent } from './presentation/auth-forgot-password/auth-forgot-password.component';
import { AuthChangePasswordComponent } from './presentation/auth-change-password/change-password.component';
import { AuthResetPasswordComponent } from './presentation/auth-reset-password/auth-reset-password.component';

@NgModule({
    declarations: [
        AuthLoginComponent,
        AuthProfileComponent,
        AuthHomeComponent,
        AuthForgotPasswordComponent,
        AuthChangePasswordComponent,
        AuthResetPasswordComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        AuthRoutingModule,
        SharedModule
    ]
})
export class AuthModule {
}