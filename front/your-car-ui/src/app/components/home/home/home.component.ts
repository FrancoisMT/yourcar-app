import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('role') == 'ADMIN') {
      this.isAdmin = true;
    }
  }

  openChat(): void {
    if (this.isAdmin) {
      this.router.navigate(['/admin-chat']); 
    } else {
      this.router.navigate(['/user-chat']); 
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    localStorage.removeItem('name');

    this.router.navigate(['/login']);
  }
}
