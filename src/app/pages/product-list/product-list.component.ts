import { Component, OnInit } from '@angular/core';

import { ProductService } from 'app/service/product/product.service';
import { ShoppingCartService } from '../../service/shoppingCart/shopping-cart.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  shoppingCart: any;
  productList: any = [];
  productsInCard: boolean;
  currentShopping: any = [];
  current: any = [];
  userId: any;
  constructor(private productService: ProductService, private shoppingService: ShoppingCartService) {
    this.productService.getAll().subscribe(res => {
      this.productList = res;
      this.shoppingProduct();
    });
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem("user")).uid;
  }

  shoppingProduct() {
    this.shoppingService.get(this.userId).subscribe(res => {
      this.shoppingCart = res;
      if (!isUndefined(this.shoppingCart)) {
        this.shoppingCart.shoppingCart.forEach(element => {
          if (this.productList.find(element2 => element2._id == element.product._id)._id == element.product._id) {
            this.productList = this.productList.filter(element2 => element2._id != element.product._id)
            this.productsInCard = true;
          }
        });
      }
    });
  }

  addProduct(product) {
    const currentProduct = {
      product: product,
      quantity: 1
    }
    this.shoppingService.getByIdToPromes(this.userId).then(response => {
      this.current = response;
      if (!isUndefined(this.current.shoppingCart)) {
        this.current.shoppingCart.push(currentProduct);
        this.shoppingService.update(this.current);
      }
      else {
        this.currentShopping.push(currentProduct);
        const shoppingList = {
          userId: this.userId,
          shoppingCart: this.currentShopping,
        }
        this.shoppingService.update(shoppingList);
      }
    })
  }

}
