import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../../models/shoppingCart'
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  collectionName = 'shoppingCarts';

  constructor(private firestore: AngularFirestore) { }

  insert(shoppingCart: any) {
    return this.firestore.collection(this.collectionName).add(shoppingCart);
  }

  getShoppingCartByUserId(userId, status) {
    return this.firestore.collection(this.collectionName, ref =>
      ref.where("userId", "==", userId).where("status", "==", status)).valueChanges()
  }

  getShoppingCart(userId, status) {
    return this.firestore.collection(this.collectionName, ref =>
      ref.where("userId", "==", userId).where("status", "==", status)).snapshotChanges().pipe(
        map(actions => {       
          return actions.map(a => {
            const data = a.payload.doc.data() as ShoppingCart;
            data._id = a.payload.doc.id;
            return data;
          });
        })
      );
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
    return this.firestore.collection(this.collectionName).doc(shoppingCart._id).set(shoppingCart);
  }

  delete(id: string) {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}