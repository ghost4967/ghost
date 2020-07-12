import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CartComponent } from '../pages/cart/cart.component';

const routes: Routes = [
  { path: '', component: CartComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutes { }