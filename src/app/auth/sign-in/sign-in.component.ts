import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
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
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
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
      return user;
    } catch (error) {
      console.info(error);
    }
  }
}
