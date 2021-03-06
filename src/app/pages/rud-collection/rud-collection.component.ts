import { IdPair } from "../../models/interfaces";
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DatabaseService } from "../../services/database.service";
import { CustomUtilsService } from "../../services/customUtils.service";
import { ModifyElementModalViewComponent } from "./modify-element-modal-view/modify-element-modal-view.component";
import {
  UserModificationPopupComponent
} from "../../components/user-modification-popup/user-modification-popup.component";
import { take } from "rxjs";
import { TicketViewerPopupComponent } from "src/app/components/ticket-viewer-popup/ticket-viewer-popup.component";


@Component({
  selector: 'app-rud-collection',
  templateUrl: './rud-collection.component.html',
  styleUrls: ['./rud-collection.component.css']
})
export class RudCollectionComponent implements OnInit {

  collection: any[] = [];
  collections: string[] = ['Productos', 'Usuarios', 'Tickets'];
  currentCollection: string = '';
  documentToModifyId: string = '';

  constructor(
    public dialog: MatDialog,
    public db: DatabaseService,
    private utils: CustomUtilsService,
  ) { }

  ngOnInit(): void { }

  collectionButtonHandler(path: string) {
    this.setCurrentCollection(path);
    this.getCollection();
  }

  getCollection() {
    this.db.readCollection(this.currentCollection).subscribe(res => {
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
      case 'Tickets':
        this.currentCollection = 'tickets'
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
      await this.utils.openMessageDialog({
        message: 'Producto Eliminado con ??xito!',
        status: true
      })
    });
  }

  openProductModificationDialog(): void {
    const configData: IdPair = { id: this.documentToModifyId, path: this.currentCollection }
    this.dialog.open(ModifyElementModalViewComponent, {
      data: configData,
      maxWidth: '70%',
      maxHeight: '95vh',
      panelClass: 'header-dialog-container',
      autoFocus: false
    });
  }

  openUserModificationDialog(): void {
    const configData: IdPair = { id: this.documentToModifyId, path: this.currentCollection }
    this.dialog.open(UserModificationPopupComponent, {
      data: configData,
      maxWidth: '70%',
      maxHeight: '95vh',
      panelClass: 'header-dialog-container',
      autoFocus: false
    });
  }

  openTicketViewerDialog(id: string): void{
    this.db.readDocument('tickets', id).pipe(take(1)).subscribe( readTicket => {
      this.dialog.open(TicketViewerPopupComponent, {
        data: readTicket,
        width: '70%',
      })
    })
  }
}
