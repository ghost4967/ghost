import { Component, Input } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isUndefined } from 'util';
import { ShoppingCartService } from './../service/shoppingCart/shopping-cart.service';
import { element } from 'protractor';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class cardModalComponent {
  @Input() product: any;
  @Input() productId: any;
  title = 'appBootstrap';
  closeResult: string;
  userId: any;
  shoppingCart: any = [];
  products: any;
  amount: any = 0;
  total: any;
  totalforProduct
  onlyOneProduct: any = [];
  productList: any;
  constructor(private modalService: NgbModal, private shoppingService: ShoppingCartService) {
    this.userId = JSON.parse(localStorage.getItem("user")).uid;
    this.InitModal();
  }

  InitModal() {
    this.shoppingService.getShoppingCartByUserId(this.userId, "STARTED").subscribe(res => {
      this.shoppingCart = res[0];
      if (!isUndefined(this.shoppingCart) && !isUndefined(this.shoppingCart.shoppingCart)) {
        this.products = this.shoppingCart.shoppingCart.find(element => element.product._id == this.productId);
        this.calculate(this.products)
      }
    });
  }


  updateQuantity(product, quantity: number) {
    product.quantity = quantity
    this.upDateProduct(product)
    this.calculate(product)
  }

  upDateProduct(product) {
    this.shoppingCart.shoppingCart.forEach(element => {
      if (element.product._id == product.product._id) {
        element = product;
      }
    });
    this.shoppingService.update(this.shoppingCart)
  }

  calculate(product) {
    this.amount = 0
    if (!isUndefined(product)) {
      this.amount += (product.quantity * product.product.price);
    }
  }

  remove(id: string) {
    const shopp = this.shoppingCart.shoppingCart.filter(element => element.product._id != id)
    this.shoppingCart.shoppingCart = shopp;
    this.shoppingService.update(this.shoppingCart)
    this.calculate(this.products);
  }

  open(content) {
    this.InitModal();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}