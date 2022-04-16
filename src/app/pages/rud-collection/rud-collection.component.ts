import {IdPair} from "../../models/interfaces";
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { databaseService } from "../../services/database.service";
import {CustomUtilsService} from "../../services/customUtils.service";
import { ModifyElementModalViewComponent } from "./modify-element-modal-view/modify-element-modal-view.component";
import {
  UserModificationPopupComponent
} from "../../components/user-modification-popup/user-modification-popup.component";


@Component({
  selector: 'app-rud-collection',
  templateUrl: './rud-collection.component.html',
  styleUrls: ['./rud-collection.component.css']
})
export class RudCollectionComponent implements OnInit {

  collection: any[] = [];
  collections: string[] = ['Productos', 'Usuarios'];
  currentCollection: string = '';
  documentToModifyId:string = '';

  constructor(
    public dialog: MatDialog,
    public db: databaseService,
    private utils: CustomUtilsService,
  ) { }

  ngOnInit(): void { }

  collectionButtonHandler(path: string) {
    this.setCurrentCollection(path);
    this.getCollection();
  }

  getCollection() {
    this.db.readCollection(this.currentCollection).subscribe( res => {
      this.collection = res;
    })
  }

  setCurrentCollection(displayedCollection: string) {
    switch (displayedCollection) {
      case 'Productos':
        this.currentCollection = 'products'
        break;
      case 'Usuarios':
        this.currentCollection = 'users'
        break;
      default:
        this.currentCollection = 'products'
        break;
    }
  }

  modifyElement(id: string) {
    this.documentToModifyId = id;
    switch (this.currentCollection) {
      case 'products':
        this.openProductModificationDialog();
        break;
      case 'users':
        this.openUserModificationDialog();
    }
  }

  deleteElement(id: string) {
    this.db.deleteDocument(this.currentCollection, id).then(async r => {
      await this.utils.openMessageDialog( {
        message: 'Producto Eliminado con éxito!',
        status: true
      })
    });
  }

  openProductModificationDialog(): void {
    const configData: IdPair = {id: this.documentToModifyId, path:this.currentCollection}
    this.dialog.open(ModifyElementModalViewComponent, {
      data: configData,
      width: '70%',
      maxHeight: '90vh'
    });
  }

  openUserModificationDialog(): void {
    const configData: IdPair = {id: this.documentToModifyId, path:this.currentCollection}
    this.dialog.open(UserModificationPopupComponent, {
      data: configData,
      width: '70%',
    });
  }

}
