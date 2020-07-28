import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CartComponent } from '../pages/cart/cart.component';
import { PaymentComponent } from '../pages/payment/payment.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'payment', component: PaymentComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutes { }