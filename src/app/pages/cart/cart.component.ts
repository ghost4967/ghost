import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Product } from 'app/models/product';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  lines: CartLine[] = [];
  quantity: number = 1;
  cartSubTotal: number = 0;

  constructor() {
    let product: Product;
    product = {
      name: 'cocacola',
      description: 'jsjsa',
      price: 13,
      typeUnity: 'lt',
      quantity: 56,
      image: ''
    };
    this.addProduct(product);
  }

  ngOnInit(): void {
  }

  addProduct(product: Product) {
    this.lines.push(new CartLine(product, this.quantity));
    this.recalculate();
  }

  updateQuantity(product: Product, quantity: number) {
    const line = this.lines.find(b => b.product.name === product.name);

    if (line !== undefined) {
      line.quantity = Number(quantity);
    }

    this.recalculate();
  }

  removeLine(id: string) {
    const index = this.lines.findIndex(line => line.product._id === id);
    this.lines.splice(index, 1);
    this.recalculate();
  }

  clear() {
    this.lines = [];
    this.cartSubTotal = 0;
  }

  private recalculate() {
    this.lines.forEach(l => {
      this.cartSubTotal += (l.quantity * l.product.price);
    });
  }
}

export class CartLine {

  constructor(public product: Product, public quantity: number) { }
}
