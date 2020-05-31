import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  UploadImag(filePath, file) {
    return this.storage.upload(filePath, file)
  }

  getUrl(filePath) {
    return this.storage.ref(filePath);
  }
}