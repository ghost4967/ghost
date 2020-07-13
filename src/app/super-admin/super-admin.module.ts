import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxLoadingXModule } from 'ngx-loading-x';

import { UpdateUserComponent } from './update-user/update-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { SuperAdminRoutingModule } from './super-admin-routing.module';

@NgModule({
  declarations: [UserListComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    ReactiveFormsModule,
    NgxLoadingXModule
  ]
})
export class SuperAdminModule { }
