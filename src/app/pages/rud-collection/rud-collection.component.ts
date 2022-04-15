import { Component, OnInit } from '@angular/core';
import { databaseService } from "../../services/database.service";
import { ModifyElementModalViewComponent } from "../../components/modify-element-modal-view/modify-element-modal-view.component";

import { idPair } from "../../models/interfaces";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-rud-collection',
  templateUrl: './rud-collection.component.html',
  styleUrls: ['./rud-collection.component.css']
})
export class RudCollectionComponent implements OnInit {

  collection: any[] = [];
  collections: string[] = ['products', 'users', 'images', 'links'];
  currentCollection: string = '';
  documentToModifyId:string = '';

  constructor(public db: databaseService, public dialog: MatDialog) { }

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
    this.documentToModifyId = id;
    this.currentCollection = path;
    this.openDialog();
  }

  deleteElement(path: string, id: string) {
    this.db.deleteDocument(path, id).then(async r =>
      await alert("Elemento eliminado correctamente")
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModifyElementModalViewComponent, {
      data: {id: this.documentToModifyId, path: this.currentCollection},

    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }



}
