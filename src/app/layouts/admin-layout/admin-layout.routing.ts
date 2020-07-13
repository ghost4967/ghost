import { Routes } from '@angular/router';

import { CanAdminGuard } from './../../auth/guards/can-admin.guard'
export const AdminLayoutRoutes: Routes = [
  {
    path: 'cart',
    loadChildren: () =>
      import('./../../cart-module/cart-module.module').then((m) => m.CartModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./../../product-module/product-module.module').then((m) => m.ProductModule),
  },{
  path: 'auth',
  loadChildren: () =>
    import('./../../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./../../admin/admin.module').then((m) => m.AdminModule),
      canActivate: [CanAdminGuard],
  },
  {
    path: 'user-list',
    loadChildren: () =>
    import('./../../super-admin/super-admin.module').then((m) => m.SuperAdminModule)
  }
];
