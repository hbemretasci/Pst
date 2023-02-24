import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AdminHomeComponent } from "./presentation/admin-home/admin-home.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { SummaryPipe } from "./summary.pipe";
import { UserFilterPipe } from "./user-filter.pipe";
import { AdminCreateUserComponent } from "./presentation/admin-create-user/admin-create-user.component";
import { AdminUserDetailComponent } from "./presentation/admin-user-detail/admin-user-detail.component";
import { AdminUsersComponent } from "./presentation/admin-users/admin-users.component";
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    declarations: [
        AdminUsersComponent,
        AdminUserDetailComponent,
        SummaryPipe,
        UserFilterPipe,
        AdminCreateUserComponent,
        AdminHomeComponent
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AdminRoutingModule,
        MatSidenavModule,
        SharedModule,
    ],
    exports: [
    ]
})
export class AdminModule {

}