import { Component, OnInit } from '@angular/core';
import {databaseService} from "../../services/database.service";

@Component({
  selector: 'app-rud-collection',
  templateUrl: './rud-collection.component.html',
  styleUrls: ['./rud-collection.component.css']
})
export class RudCollectionComponent implements OnInit {

  collection: any[] = [];
  collections: string[] = ['products', 'users', 'images', 'links'];
  currentCollection: string = '';

  constructor(public db: databaseService) { }

  ngOnInit(): void {
  }

  collectionButtonHandler(path: string) {
    this.getCollection(path);
    this.setCurrentCollection(path);
  }

  getCollection(path: string) {
    this.db.readCollection(path).subscribe( res => {
      console.log(res);
      this.collection = res;
    })
  }

  setCurrentCollection(collection: string) {
    this.currentCollection = collection;
  }

  modifyElement(path: string, id: string) {

  }

  deleteElement(path: string, id: string) {
    this.db.deleteDocument(path, id).then(async r =>
      await alert("Elemento eliminado correctamente")
    );
  }



}
