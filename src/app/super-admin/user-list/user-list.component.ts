import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UserService } from 'app/service/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: Array<any> = [];;
  load:boolean = true;

  constructor(private userService: UserService, private router: Router,) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.load = false;
      this.userList = users;
    });
  }

  updateUser(uid: string) {
    this.router.navigate(["/user-list/update-user", uid]);
  }
}
