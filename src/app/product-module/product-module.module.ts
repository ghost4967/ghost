import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ProductComponent } from '../pages/product/product.component';

import { FormsModule } from '@angular/forms';

import { productsRoutes } from './product-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    productsRoutes
  ]
})
export class ProductModule { }
