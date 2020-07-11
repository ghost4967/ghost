import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../auth.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
        ],
      ],
      password: ["", [Validators.required, Validators.minLength(2)]],
    });
  }

  async signIn() {
    const email = this.loginForm.controls["email"].value;
    const password = this.loginForm.controls["password"].value;
    try {
      const user = await this.authService.signIn(email, password);
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.info(error);
    }
  }

  async onGoogleLogin() {
    try {
      const user =  await this.authService.loginGoogle();
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['product']);
    } else if (user) {
      this.router.navigate(['/auth/verify-email-address']);
    } 
  }
}
