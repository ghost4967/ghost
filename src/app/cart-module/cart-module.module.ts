import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../pages/cart/cart.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutes } from './layout-routing.module';

@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    LayoutRoutes
  ]
})
export class CartModule { }
