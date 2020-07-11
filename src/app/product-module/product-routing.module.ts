import { ProductComponent } from '../pages/product/product.component';
import { ProductListComponent } from '../pages/product-list/product-list.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
    { path: 'product', component: ProductComponent },
    { path: 'productList', component: ProductListComponent },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class productsRoutes { }
