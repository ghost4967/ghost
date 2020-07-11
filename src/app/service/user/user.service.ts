import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { User } from './../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName = 'users';

  constructor(private firestore: AngularFirestore) {  }

  insert(user: User) {
    return this.firestore.collection(this.collectionName).add(user);
  }

  getAll() {
    return this.firestore.collection(this.collectionName).valueChanges();
  }

  get(uid: string) {
    return this.firestore
    .collection(this.collectionName)
    .doc(uid)
    .valueChanges();
  }

  update(user: User) {
    return this.firestore.collection(this.collectionName).doc(user.uid).set(user);
  }

  delete(uid: string) {
    return this.firestore.collection(this.collectionName).doc(uid).delete();
  }

  getUserFromStorage() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
