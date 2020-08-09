import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { isUndefined } from 'util';

import { ProductService } from '../../service/product/product.service';
import { ShoppingCartService } from '../../service/shoppingCart/shopping-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  shoppingCart: any;
  productList: any = [];
  productsInCard: boolean;
  currentShopping: any = [];
  current: any = [];
  userId: any;
  load:boolean = true;
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private shoppingService: ShoppingCartService
  ) {
    this.productService.getAll().subscribe((res) => {
      this.shoppingProduct(res);
    });
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).uid;
  }

  shoppingProduct(currentProductList) {
    this.shoppingService.get(this.userId).subscribe((res) => {
      this.shoppingCart = res;
      if (!isUndefined(this.shoppingCart)) {
        this.productList = currentProductList;
        this.shoppingCart.shoppingCart.forEach((element) => {
          if (
            !isUndefined(
              this.productList.find(
                (element2) => element2._id == element.product._id
              )
            )
          ) {
            this.productList = this.productList.filter(
              (element2) => element2._id != element.product._id
            );
            this.productsInCard = true;
          }
        });
        this.load = false;
      }
    });
  }

  addProduct(product) {
    const currentProduct = {
      product: product,
      quantity: 1,
    };
    this.shoppingService.getByIdToPromes(this.userId).then((response) => {
      this.current = response;
      if (!isUndefined(this.current.shoppingCart)) {
        this.current.shoppingCart.push(currentProduct);
        this.shoppingService.update(this.current).then(_ => {
          this.notificationSuccess('Producto Agregado Excitosamente');
        });
      } else {
        this.currentShopping.push(currentProduct);
        const shoppingList = {
          userId: this.userId,
          shoppingCart: this.currentShopping,
        };
        this.shoppingService.update(shoppingList);
      }
    });
  }

  private notificationSuccess(message: string) {
    const from = 'top';
    const align = 'center';
    this.toastr.success(
      `<span data-notify='icon' class='nc-icon nc-bell-55'></span><span data-notify='message'>${message}</span>`,
      '',
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-success alert-with-icon',
        positionClass: 'toast-' + from + '-' + align,
      }
    );
  }
}
