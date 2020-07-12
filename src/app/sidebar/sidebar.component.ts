import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/product', title: 'Product', icon: 'nc-bank', class: '' },
    { path: '/cart', title: 'Cart', icon: 'nc-cart-simple', class: '' },
    { path: '/product/productList',     title: 'Lista de Prodcutos',         icon:'nc-bullet-list-67',       class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
