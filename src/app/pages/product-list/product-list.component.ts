import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/service/product/product.service';
import { ShoppingCartService } from '../../service/shoppingCart/shopping-cart.service';
import { ShoppingCart } from '../../models/shoppingCart';
import { Product } from 'app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  shoppingCart: any;
  productList: any = [];
  productsInCard: boolean;
  currentShopping: any = [];
  current: any = [];
  constructor(private productService: ProductService, private shoppingService: ShoppingCartService) {
    this.productService.getAll().subscribe(res => {
      this.productList = res;
      console.log(res)
      this.shoppingProduct();
    });
  }

  ngOnInit(): void {
  }

  shoppingProduct() {
    this.shoppingService.get('userId1').subscribe(res => {
      this.shoppingCart = res;
      if (this.shoppingCart != undefined) {
        this.shoppingCart.shoppingCart.forEach(element => {
          if (this.productList.find(element2 => element2._id == element.product._id)._id == element.product._id) {
            this.productList = this.productList.filter(element2 => element2._id != element.product._id)
            this.productsInCard = true;
            console.log(this.productList)
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
    this.shoppingService.getByIdToPromes('userId1').then(response => {
      this.current = response;
      if (this.current.shoppingCart != undefined) {
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
