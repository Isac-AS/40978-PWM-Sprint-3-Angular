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

  createDocument<type>(data: any, path: string, id: string) {
    const collection = this.db.collection(path);
    return collection.doc(id).set(data);
  }

  readDocument<type>(path: string, id: string) {
    const collection = this.db.collection(path);
    return collection.doc(id).valueChanges();
  }

  updateDocument(data:any, path: string, id: string) {
    const collection = this.db.collection(path);
    return collection.doc(id).update(data);
  }

  deleteDocument(path: string, id: string) {
    const collection = this.db.collection(path);
    return collection.doc(id).delete();
  }

  readCollection(path: string) {
    const collection = this.db.collection(path);
    return collection.valueChanges();
  }

  createId() {
    return this.db.createId();
  }

}
