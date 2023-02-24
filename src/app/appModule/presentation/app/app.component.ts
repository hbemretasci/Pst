import { Component, inject, OnInit } from '@angular/core';
import { AutoLoginUseCase } from 'src/app/auth/domain/use-case/auto-login.usecase';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AutoLoginUseCase]
})
export class AppComponent implements OnInit {
  private autoLoginUseCase = inject(AutoLoginUseCase)

  ngOnInit(): void {
    this.autoLoginUseCase.execute();
  }
  
}