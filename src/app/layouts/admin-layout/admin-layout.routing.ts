import { Routes } from '@angular/router';

import { ProductComponent } from '../../pages/product/product.component';
import { CartComponent } from '../../pages/cart/cart.component';
import { ProductListComponent } from '../../pages/product-list/product-list.component';
import { CanAdminGuard } from './../../auth/guards/can-admin.guard'

export const AdminLayoutRoutes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'productList', component: ProductListComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./../../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./../../admin/admin.module').then((m) => m.AdminModule),
      canActivate: [CanAdminGuard],
  }
];
