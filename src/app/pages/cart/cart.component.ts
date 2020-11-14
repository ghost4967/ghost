import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ShoppingCartService } from '../../service/shoppingCart/shopping-cart.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any = [];
  quantity: number = 1;
  cartSubTotal: number = 0;
  shoppingCard: any;
  userId: any;
  constructor(private shoppingService: ShoppingCartService, private formBuilder: FormBuilder) {
    this.userId = JSON.parse(localStorage.getItem("user")).uid;
    this.shoppingService.getShoppingCart(this.userId, "STARTED").subscribe(res => {
      if (!isUndefined(res)) {
        this.shoppingCard = res[0];
        this.products = res[0];
        this.products = this.products.shoppingCart
        this.recalculate();
      }
    });
  }

  ngOnInit(): void {
  }

  updateQuantity(product, quantity: number) {
    this.products.forEach(element => {
      if (element.product._id == product.product._id) {
        element.quantity = quantity
        this.upDateProduct();
      }
    });
    this.recalculate();
  }

  upDateProduct() {
    this.shoppingCard.shoppingCart = this.products;
    console.log(this.shoppingCard)
    this.shoppingService.update(this.shoppingCard)
  }

  remove(id: string) {
    const index = this.products.findIndex(line => line.product._id === id);
    this.products.splice(index, 1);
    this.upDateProduct();
    this.recalculate();
  }

  private recalculate() {
    this.cartSubTotal = 0;
    this.cartSubTotal = this.calculate(this.cartSubTotal, this.products);
  }

  public calculate(amount, productList) {
    if (!isUndefined(this.products)) {
      productList.forEach(element => {
        amount += (element.quantity * element.product.price);
      });
    }
    return amount
  }
}
