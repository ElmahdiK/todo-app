import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup: FormGroup = new FormGroup({
    login: new FormControl("test1", [Validators.required]),
    password: new FormControl("123", [Validators.required])
  })

  constructor(private authService: AuthService, private router: Router) { }

  submitForm() {
    if (this.formGroup.invalid) return;
    this.authService
      .login(this.formGroup.get("login")?.value, this.formGroup.get("password")?.value)
      .subscribe(response => {
        this.router.navigate(['/todos']);
      })
  }

  getUserName() {
    return localStorage.getItem(`user-name`);
  }

  loggedIn() {
    return localStorage.getItem(`token`);
  }

  logout() {
    this.authService.logout()
  }
}