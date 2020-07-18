import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import{ cardModalComponent } from '../modals/card-modal.component'
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ProductComponent } from '../pages/product/product.component';
import { productsRoutes } from './product-routing.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    cardModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    productsRoutes,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
