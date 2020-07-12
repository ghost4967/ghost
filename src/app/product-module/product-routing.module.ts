import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ProductComponent } from '../pages/product/product.component';


const routes: Routes = [
    { path: '', component: ProductComponent },
    { path: 'productList', component: ProductListComponent },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class productsRoutes { }
