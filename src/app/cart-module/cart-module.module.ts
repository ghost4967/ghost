import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CartComponent } from '../pages/cart/cart.component';
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
