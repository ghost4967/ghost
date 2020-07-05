import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

  constructor(public authService: AuthService) { }

  async sendVerificationMail () {
    return await this.authService.sendVerificationMail();
  }
}
