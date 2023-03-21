import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { UserCreateProjectComponent } from "./presentation/user-create-project/user-create-project.component";
import { UserHomeComponent } from "./presentation/user-home/user-home.component";
import { UserProjectsComponent } from "./presentation/user-projects/user-projects.component";

const routes: Routes = [
  {
    path: '', component: UserHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'createProject', component: UserCreateProjectComponent },
      { path: 'projects', component: UserProjectsComponent },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class UserRoutingModule {

}