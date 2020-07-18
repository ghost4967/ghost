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
  shoppingCard: any = [];
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
    this.shoppingService.get(this.userId).subscribe(res => {
      this.shoppingCard = res;
      if (!isUndefined(this.shoppingCard)) {
        this.products = this.shoppingCard.shoppingCart.find(element => element.product._id == this.productId);
      }
    });

  }


  updateQuantity(product, quantity: number) {
    product.quantity = quantity
    this.upDateProduct(product)
    this.calculate(this.amount, product)
  }

  upDateProduct(product) {
    this.shoppingCard.shoppingCart.forEach(element => {
      if (element.product._id == product.product._id) {
        element = product;
      }
    });
    this.shoppingService.update(this.shoppingCard)
  }

  calculate(amount, product) {
    console.log(product)
    // if (!isUndefined(this.products)) {
    //   amount += (product.quantity * product.product.price);
    // }
    // return amount
  }

  remove(id: string) {
    this.shoppingCard.shoppingCart.filter(element => element.product._id != id)
    this.calculate(this.amount, this.products);
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