import { Component, OnInit } from '@angular/core';
import { isUndefined } from 'util'; ''

import { ProductService } from 'app/service/product/product.service';
import { ShoppingCartService } from '../../service/shoppingCart/shopping-cart.service';
import { UserService } from '../../service/user/user.service';

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
  product: any;
  constructor(private productService: ProductService, private shoppingService: ShoppingCartService,
    private userService: UserService) {
    this.productService.getAll().subscribe(res => {
      this.productList = res;
    });
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem("user")).uid;
    this.userService.getByIdToPromes(this.userId).then(res => {
      this.data = res;
      console.log(this.data)
      this.shoppingCartId = this.data.cartId;
      if(this.shoppingCartId != "") {
        this.shoppingProduct();
      }
    })
  }

  shoppingProduct() {
    this.shoppingService.get(this.shoppingCartId).subscribe(res => {
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
    if (this.shoppingCartId == "") {

      this.currentShopping.push(currentProduct);
      const shoppingList = {
        userId: this.userId,
        status: 'STARTED',
        shoppingCart: this.currentShopping,
      }
      this.shoppingService.insert(shoppingList).then(() => {
        console.log(this.userId)
        this.shoppingService.getShoppingCart(this.userId, 'STARTED').subscribe(res => {
          this.product = res[0]
          if(!isUndefined(this.product)) {
            console.log(this.product)
            this.data.cartId = this.product._id
            console.log(this.data)
            this.userService.update(this.data);
          }
        })
      });
    }
    else {
      this.shoppingService.getByIdToPromes(this.shoppingCartId).then(res => {
        this.current = res;
        if (!isUndefined(this.current.shoppingCart)) {
          this.current.shoppingCart.push(currentProduct);
          this.shoppingService.update(this.current);
          return
        }
      })
    }

  }
}
