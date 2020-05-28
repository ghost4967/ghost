import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/product';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  collectionName = 'Product';

  constructor(private firestore: AngularFirestore) { }

  insert(product: Product) {
    return this.firestore.collection(this.collectionName).add(product);
  }

  getAll() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  get(id: string) {
    return this.firestore
    .collection(this.collectionName)
    .doc(id)
    .valueChanges();
  }

  update(product: Product) {
    return this.firestore.collection(this.collectionName).doc(product._id).set(product);
  }

  delete(id: string) {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}