import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxLoadingXModule } from 'ngx-loading-x';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxLoadingXModule
  ]
})
export class AdminModule { }
