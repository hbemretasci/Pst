import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { UserCreateProjectComponent } from './presentation/user-create-project/user-create-project.component';
import { UserHomeComponent } from './presentation/user-home/user-home.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    UserHomeComponent,
    UserCreateProjectComponent
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
