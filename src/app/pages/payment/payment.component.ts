import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  paymentForm: FormGroup;
  mapMode: String = 'edit';

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  procedToCheckout() {
    // @TODO: update the cart
  }

  setPosition({ lat, lng }) {
    this.paymentForm.patchValue({
      position: { lat, lng }
    });
  }

  private initForm() {
    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      position: this.formBuilder.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required]
      })
    })
  }

}
