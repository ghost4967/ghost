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
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      typeUnity: this.productForm.value.typeUnity,
      description: this.productForm.value.description,
      image: this.productForm.value.image,

    }
    this.productService.insert(product);
  }

}
