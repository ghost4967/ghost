import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Product } from 'app/models/product';
import { element } from 'protractor';
import { ShoppingCart } from '../../models/shoppingCart';
import { ShoppingCartService } from '../../service/shoppingCart/shopping-cart.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
  constructor(private shoppingService: ShoppingCartService, private formBuilder: FormBuilder) {
    let product: Product;
    this.shoppingService.getByIdToPromes('userId1').then(res => {
      console.log(res)
      if (res != undefined) {
        this.shoppingCard = res;
        this.products = res;
        this.products = this.products.shoppingCart
        console.log(this.products)
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

  upDateProduct(){
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
    this.products.forEach(element => {
      this.cartSubTotal += (element.quantity * element.product.price);
    });
  }
}
