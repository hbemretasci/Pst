import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AuthForgotPasswordComponent } from "./presentation/auth-forgot-password/auth-forgot-password.component";
import { AuthHomeComponent } from "./presentation/auth-home/auth-home.component";
import { AuthLoginComponent } from "./presentation/auth-login/auth-login.component";
import { AuthProfileComponent } from "./presentation/auth-profile/auth-profile.component";
import { AuthResetPasswordComponent } from "./presentation/auth-reset-password/auth-reset-password.component";
import { AuthChangePasswordComponent } from "./presentation/auth-change-password/change-password.component";

const routes: Routes = [
  {
    path: '', component: AuthHomeComponent, children: [
      { path: 'login', component: AuthLoginComponent },
      { path: 'forgotPassword', component: AuthForgotPasswordComponent },
      { path: 'resetPassword/:resetToken', component: AuthResetPasswordComponent },
      { path: 'changePassword', canActivate: [AuthGuard], component: AuthChangePasswordComponent },
      { path: 'profile', canActivate: [AuthGuard], component: AuthProfileComponent },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AuthRoutingModule {
}