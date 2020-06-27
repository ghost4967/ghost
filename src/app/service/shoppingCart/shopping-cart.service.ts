import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/product';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  collectionName = 'shoppingCarts';

  constructor(private firestore: AngularFirestore) { }

  insert(shoppingCart: any) {
    return this.firestore.collection(this.collectionName).doc(shoppingCart.userId).set(shoppingCart);
  }

  getAll() {
    return this.firestore.collection(this.collectionName).valueChanges();
  }

  get(id: string) {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .valueChanges();
  }

  getByIdToPromes(id: string) {
    return this.firestore
      .collection(this.collectionName)
    .doc(id).get().toPromise().then((item) => ({ id: item.id, ...item.data() }))
  }

update(shoppingCart: any) {
    return this.firestore.collection(this.collectionName).doc(shoppingCart.userId).set(shoppingCart);
  }

  delete(id: string) {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}