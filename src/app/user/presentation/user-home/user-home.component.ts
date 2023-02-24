import { Component, inject, OnInit } from '@angular/core';
import { IsLoggedUserAdminUseCase } from 'src/app/auth/domain/use-case/is-logged-user-admin.usecase';

@Component({
  selector: 'user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers: [IsLoggedUserAdminUseCase]
})
export class UserHomeComponent implements OnInit {
  isAdminUser: boolean = false;

  private isLoggedUserAdminUseCase = inject(IsLoggedUserAdminUseCase);

  ngOnInit(): void {
    this.isLoggedUserAdminUseCase.execute().subscribe({
      next: (v) => {
        this.isAdminUser = v;
      }
    });
  }

}
