import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/service/product/product.service';
import { ShoppingCartService } from '../../service/shoppingCart/shopping-cart.service';
import {ShoppingCart } from '../../models/shoppingCart';
import { Product } from 'app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  shoppingCart: any;
  productList: Array<any> = [];
  productsInCard: boolean;
  currentShopping: any = [];
  current: any = [];
  constructor(private productService: ProductService, private shoppingService: ShoppingCartService) {
    this.productService.getAll().subscribe(res => {
      this.productList = res;
      this.shoppingProduct();
    });
  }

  ngOnInit(): void {
  }

  shoppingProduct() {
    this.shoppingService.get('userId1').subscribe(res => {
      this.shoppingCart = res;
      this.shoppingCart.shoppingCart.forEach(element => {
        if (this.productList.find(element2 => element2.name == element.product.name).name == element.product.name) {
          this.productsInCard = true;
          this.productList = this.productList.filter(element2 => element2.name != element.product.name)
        }
      });
    });
  }

  addProduct(product) {
    const currentProduct = {
      product: product,
      quantity: 1
    }
    this.shoppingService.getByIdToPromes('userId1').then(response => {
      this.current = response;
      if (this.current.shoppingCart != undefined) {
        console.log(this.current.shoppingCart)
        this.current.shoppingCart.push(currentProduct);
        this.shoppingService.update(this.current);
      }
      else {
        this.currentShopping.push(currentProduct);
        const shoppingList = {
          userId: 'userId1',
          shoppingCart: this.currentShopping,
        }
        this.shoppingService.update(shoppingList);
      }
    })
  }

}
