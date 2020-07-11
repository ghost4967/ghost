import { Routes } from '@angular/router';
import { ProductModule } from './../../product-module/product-module.module'
export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./../../cart-module/cart-module.module').then((m) => m.CartModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./../../product-module/product-module.module').then((m) => m.ProductModule),
  },{
  path: 'auth',
  loadChildren: () =>
    import('./../../auth/auth.module').then((m) => m.AuthModule),
  },
];
