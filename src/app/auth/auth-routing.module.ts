import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AuthHomeComponent } from "./presentation/auth-home/auth-home.component";
import { AuthLoginComponent } from "./presentation/auth-login/auth-login.component";
import { AuthProfileComponent } from "./presentation/auth-profile/auth-profile.component";

const routes: Routes = [
  {
    path: '',
    component: AuthHomeComponent,
    children: [
      { path: 'home', component: AuthHomeComponent },
      { path: 'login', component: AuthLoginComponent },
      { path: 'profile', canActivate: [AuthGuard], component: AuthProfileComponent }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AuthRoutingModule {

}