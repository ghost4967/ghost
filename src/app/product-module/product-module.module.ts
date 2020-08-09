import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ProductComponent } from '../pages/product/product.component';
import { productsRoutes } from './product-routing.module';
import { NgxLoadingXModule } from 'ngx-loading-x';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    productsRoutes,
    ReactiveFormsModule,
    NgxLoadingXModule
  ]
})
export class ProductModule { }
