import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../pages/cart/cart.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout.component'

@NgModule({
  declarations: [
    CartComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ]
})
export class CartModule { }
