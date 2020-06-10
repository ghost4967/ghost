import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/service/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  shoppingCart: Array<any> = [];
  productList: Array<any> = [];

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.productService.getAll().subscribe(res => this.productList.push(res[0]))
  }
    
      
  
  addProduct(product){
    console.log(product)
    this.shoppingCart.push(product);
    console.log(this.shoppingCart)
  }

}
