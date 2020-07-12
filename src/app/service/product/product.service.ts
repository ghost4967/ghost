import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  collectionName = 'Products';

  constructor(private firestore: AngularFirestore) { }

  insert(product: Product) {
    return this.firestore.collection(this.collectionName).add(product);
  }

  getAll() {
    return this.firestore.collection(this.collectionName).snapshotChanges().pipe(
      map(actions => {       
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          data._id = a.payload.doc.id;
          return data;
        });
      })
    );
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