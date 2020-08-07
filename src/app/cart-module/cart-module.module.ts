import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CartComponent } from '../pages/cart/cart.component';
import { PaymentComponent } from '../pages/payment/payment.component';
import { GhostGoogleMapsModule } from '../shared/google-maps/ghost-maps.module';
import { LayoutRoutes } from './layout-routing.module';

@NgModule({
  declarations: [
    CartComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GhostGoogleMapsModule,
    NgbModule,
    LayoutRoutes
  ]
})
export class CartModule { }
