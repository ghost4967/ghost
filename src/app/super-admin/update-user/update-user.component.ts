import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  public createUserForm: FormGroup;

  userUid: string;
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private activaterouter: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userUid = this.activaterouter.snapshot.params['uid'];
    this.createUserForm = this.buildLoginForm();
    this.createUserForm.controls['role'].setValue('USER');
    this.userService.get(this.userUid)
      .pipe(first())
      .subscribe(user => {
        this.userData = user;
        this.createUserForm.controls['displayName'].setValue(this.userData.displayName);
        this.createUserForm.controls['email'].setValue(this.userData.email);
        if(this.userData.role){
          this.createUserForm.controls['role'].setValue(this.userData.role);
        }
      })
  }

  buildLoginForm() {
    return this.formBuilder.group({
      displayName: [
        "",
        [
          Validators.required
        ]
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
        ],
      ],
      role: [
        "",
        [
          Validators.required
        ]
      ],
    });
  }

  saveUser(){
    let user: User;
    user = {
     displayName: this.createUserForm.controls['displayName'].value,
     email: this.createUserForm.controls['email'].value,
     role: this.createUserForm.controls['role'].value,
     emailVerified: this.userData.emailVerified,
     photoURL: this.userData.photoURL,
     uid: this.userData.uid
    }
    this.userService.update(user).then(_ => {
      this.notificationSuccess('Usuario actualizado exitosamente');
      this.router.navigate(['user-list']);
    });
  }

  goUserList() {
    this.router.navigate(['user-list']);
  }

  get displayName() {
    return this.createUserForm.get('displayName');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  private notificationSuccess(message: string) {
    const from = "top";
    const align = "center";
    this.toastr.success(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${message}</span>`,
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-" + from + "-" + align,
      }
    );
  }
}
