import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from './../../service/shoppingCart/shopping-cart.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  cartList: Array<any> = [];;
  load:boolean = true;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.getAll().subscribe(carts => {
      this.load = false;
      console.log('lista de carts ---------',carts);
      this.cartList = carts;
    });
  }

}
