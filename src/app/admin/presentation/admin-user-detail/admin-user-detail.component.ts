import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../domain/user.model';
import { GetUserByIdUseCase } from '../../domain/use-case/get-user-byid.usecase';

@Component({
  selector: 'admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css'],
  providers: [GetUserByIdUseCase]
})
export class AdminUserDetailComponent implements OnInit {
  title: String = "User";
  loading: boolean = true;
  user: UserModel;
  error: any;

  private activatedRoute = inject(ActivatedRoute);
  private getUserByIdUseCase = inject(GetUserByIdUseCase);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getUserByIdUseCase.execute(params["userId"]).subscribe({
        next: (v) => {
          this.user = v
          this.loading = false;  
        },
        error: (e) => {
          this.error = e;
          this.loading = false;
        } 
      });
    });
  }

  closeErrorDialog() {
    this.error = null;
  }

}
