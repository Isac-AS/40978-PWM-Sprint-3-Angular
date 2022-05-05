import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: AngularFireStorage,

  ) { }

  uploadFile(event: any, folder: string, id: string) {
    const file = event.target.files[0];
    const filePath = folder + '/' + id;
    const task = this.storage.upload(filePath, file);
    return task;
  }

  getRef(path: string) {
    return this.storage.ref(path)
  }

}
