import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModuleComponent } from '../product-module/product-module.component';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { productsRoutes } from './product.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ProductModuleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes),
    FormsModule,
    NgbModule
  ]
})
export class ProductModule { }
