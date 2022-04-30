import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor( public db: AngularFirestore) {
  }

  createDocument<T>(data: T, path: string, id: string) {
    const collection = this.db.collection<T>(path);
    return collection.doc(id).set(data);
  }

  readDocument<T>(path: string, id: string) {
    const collection = this.db.collection<T>(path);
    return collection.doc(id).valueChanges();
  }

  updateDocument<T>(data:any, path: string, id: string) {
    const collection = this.db.collection<T>(path);
    return collection.doc(id).update(data);
  }

  deleteDocument<T>(path: string, id: string) {
    const collection = this.db.collection<T>(path);
    return collection.doc(id).delete();
  }

  readCollection<T>(path: string) {
    const collection = this.db.collection<T>(path);
    return collection.valueChanges();
  }

  createId() {
    return this.db.createId();
  }
}
