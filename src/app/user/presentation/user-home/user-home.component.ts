import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'src/app/shared/utils/state.model';

@Component({
  selector: 'user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  menuItems: string[] = ['User Home', 'Create Project', 'Projects']; 

  userHomeState: State = {
    title: 'User Home',
    loading: false,
    error: false,
    errorMessage: '',
    data: undefined
  }

  private router = inject(Router);

  ngOnInit(): void {
    this.userHomeState.data = 0;
  }

  navigateComponent(i: number) {
    this.userHomeState.data = i;

    switch(i) { 
      case 0: { 
        this.router.navigate(['/user']);
        break; 
      } 
      case 1: { 
        this.router.navigate(['/user/createProject']);
        break;  
      }
      case 2: { 
        this.router.navigate(['/user/projects']);
        break;  
     }
   } 
  }

}
