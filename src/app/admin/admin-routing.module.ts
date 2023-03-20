import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "./presentation/admin-home/admin-home.component";
import { AdminCreateUserComponent } from "./presentation/admin-create-user/admin-create-user.component";
import { AdminUserDetailComponent } from "./presentation/admin-user-detail/admin-user-detail.component";
import { AdminUsersComponent } from "./presentation/admin-users/admin-users.component";
import { AdminGuard } from "./admin.guard";

const routes: Routes = [
  {
    path: '', component: AdminHomeComponent, canActivate: [AdminGuard], children: [
      { path: 'register', component: AdminCreateUserComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'user/:userId', component: AdminUserDetailComponent },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AdminRoutingModule {

}