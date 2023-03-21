import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { UserCreateProjectComponent } from './presentation/user-create-project/user-create-project.component';
import { UserHomeComponent } from './presentation/user-home/user-home.component';
import { UserRoutingModule } from './user-routing.module';
import { UserProjectsComponent } from './presentation/user-projects/user-projects.component';



@NgModule({
  declarations: [
    UserHomeComponent,
    UserCreateProjectComponent,
    UserProjectsComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    MatSidenavModule,
    SharedModule
  ]
})
export class UserModule { }
