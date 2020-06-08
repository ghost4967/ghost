import { Routes } from '@angular/router';

import { ProductComponent } from '../../pages/product/product.component';
import { ProductListComponent } from '../../pages/product-list/product-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'product',      component: ProductComponent },
    { path: 'productList',      component: ProductListComponent },
];
