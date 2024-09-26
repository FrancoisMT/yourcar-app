import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,  private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required] 
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const role = this.loginForm.value.role;

      if (role == 'admin') {
        this.authService.loginAdmin(email).subscribe(response => {
          console.log('Admin logged in:', response); 
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.router.navigate(['/home']);

        }, error => {
          console.log('Admin login error:', error);
        });
      } else {
        this.authService.loginUser(email).subscribe(response => {
          console.log('User logged in:', response); 
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.router.navigate(['/home']);

        }, error => {
          console.log('User login error:', error);
        });
      }
    } else {
      console.log('Form invalid');
    }
  }



}
