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
  shoppingCartId: any;
  subscribe: any;
  productList: any = [];
  currentShopping: any = [];
  current: any = [];
  userId: any;
  data: any;
  hideProduct: any;
  constructor(private productService: ProductService, private shoppingService: ShoppingCartService) {
    this.productService.getAll().subscribe(res => {
      this.productList = res;
    });
  }
  
  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem("user")).uid;
    this.subscribe = this.shoppingService.getShoppingCart(this.userId, "pendding").subscribe(res => {
      if (isUndefined(res)) {
        this.data = res;
        this.shoppingCartId = this.data[0];
      }
      this.data = res;
      this.hideProduct = this.data[0];
      this.shoppingProduct();
    })
  }

  shoppingProduct() {
    this.shoppingService.get(this.hideProduct._id).subscribe(res => {
      this.shoppingCart = res;
      if (!isUndefined(this.shoppingCart)) {
        this.shoppingCart.shoppingCart.forEach(element => {
          if (!isUndefined(this.productList.find(element2 => element2._id == element.product._id))) {
            this.productList = this.productList.filter(element2 => element2._id != element.product._id)
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

    if (isUndefined(this.shoppingCartId)) {
      this.currentShopping.push(currentProduct);
      const shoppingList = {
        userId: this.userId,
        status: 'pendding',
        shoppingCart: this.currentShopping,
      }
      this.shoppingService.insert(shoppingList);
      this.subscribe.unsubscribe();
      this.subscribe.unsubscribe();
      return
    }
    this.shoppingService.getByIdToPromes(this.shoppingCartId._id).then(res => {
      this.current = res;
      if (!isUndefined(this.current.shoppingCart)) {
        this.current.shoppingCart.push(currentProduct);
        this.shoppingService.update(this.current);
        return
      }
      else {

      }
    })
  }
}
