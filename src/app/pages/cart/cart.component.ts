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
    this.shoppingService.getByIdToPromes(this.userId).then(res => {
      if (!isUndefined(res)) {
        this.shoppingCard = res;
        this.products = res;
        this.products = this.products.shoppingCart
        this.recalculate();
      }
    });
  }

  ngOnInit(): void {
  }

  updateQuantity(product, quantity: number) {
    this.products.forEach(element => {
      if (element.product.name == product.product.name) {
        element.quantity = quantity
        this.upDateProduct();
      }
    });
    this.recalculate();
  }

  upDateProduct() {
    this.shoppingCard.shoppingCart = this.products;
    this.shoppingService.update(this.shoppingCard)
  }

  removeLine(id: string) {
    const index = this.products.findIndex(line => line.product._id === id);
    this.products.splice(index, 1);
    this.upDateProduct();
    this.recalculate();
  }

  private recalculate() {
    this.cartSubTotal = 0;
    if (!isUndefined(this.products)) {
      this.products.forEach(element => {
        this.cartSubTotal += (element.quantity * element.product.price);
      });
    }
  }
}
