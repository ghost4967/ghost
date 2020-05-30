import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../service/product/product.service';
import { StorageService } from '../../service/storage/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  product: any;
  urlImage: Observable<any>;
  uploadPercent: Observable<number>;
  image;
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private storage: StorageService) {
    this.productFormInit();
  }

  ngOnInit(): void {
  }

  onUpload() {
    const id = Math.random().toString(36).substring(2);
    const filePath = `uploads/profile_${id}`;
    const task = this.storage.UploadImag(filePath, this.image);
    const ref = this.storage.getUrl(filePath);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => {
      ref.getDownloadURL().subscribe(urlImage => {
        this.urlImage = urlImage;
        this.setProduct();
        console.log(urlImage)
        this.productService.insert(this.product);
      })
    })).subscribe();
  }

  chargeImage(e) {
    this.image = e.target.files[0];
  }

  productFormInit() {
    this.productForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      typeUnity: new FormControl(''),
      description: new FormControl('')
    });
  }

  setProduct() {
    this.product = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      typeUnity: this.productForm.value.typeUnity,
      description: this.productForm.value.description,
      image: this.urlImage.toString()
    }
  }
  
  createProduct() {
    this.onUpload();
  }

}
