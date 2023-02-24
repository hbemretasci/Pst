import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { UserCreateProjectComponent } from "./presentation/user-create-project/user-create-project.component";
import { UserHomeComponent } from "./presentation/user-home/user-home.component";

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: UserHomeComponent },
      { path: 'crproject', component: UserCreateProjectComponent }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class UserRoutingModule {

}