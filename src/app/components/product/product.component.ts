import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  product = new Array();

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
    this.productFormInit();
  }

  ngOnInit(): void {
  }

  productFormInit() {
      this.productForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      typeUnity: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl('')
    });
  }

  createProduct() {
    console.log(this.productForm.value)
    const product = {
      name: this.productForm.value.name,
      price: 5,
      quantity: 5,
      typeUnity: "",
      description: "",
      image: "",

    }
    //this.productService.insert(product);
  }
  changeSuit(item, id) {
    console.log(item.target.value)
    this.product.push({ id : item.target.value});
    console.log(this.product[0].target.value)
  }

}
