import { Injectable } from "@angular/core";
import { AngularFirestore,
          AngularFirestoreDocument,
          AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class databaseService {
  constructor( public db: AngularFirestore) {
  }

  createDocument<Product>(data: any, path: string, id: string) {
    const ref = this.db.collection<any>(path);
    return ref.doc(id).set(data);
  }

  readDocument() {

  }

  updateDocument() {

  }

  deleteDocument() {

  }

  readCollection(path: string) {
    const ref = this.db.collection(path);
    return ref.valueChanges();
  }

  createId() {
    return this.db.createId();
  }

}
