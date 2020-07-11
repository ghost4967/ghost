import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from './../auth.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  public user$: Observable<User> = this.authService.afAuth.user;

  constructor(public authService: AuthService) { }

  async sendVerificationMail () {
    return await this.authService.sendVerificationMail();
  }
}
