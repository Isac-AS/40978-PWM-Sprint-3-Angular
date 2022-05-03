import { Injectable } from "@angular/core";
import {MessagePopupPair} from "../models/interfaces";
import {InfoMessagePopupComponent} from "../components/info-message-popup/info-message-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class CustomUtilsService {

  timeout: number = 0;
  currentCategory: string = '';
  currentProductId: string = '';

  constructor(
    public dialog: MatDialog
  ) { }

  openMessageDialog(messagePopupPair: MessagePopupPair): void {

    const dialogRef = this.dialog.open(InfoMessagePopupComponent, {
      data: messagePopupPair,
      position: {top: '2%'},
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterOpened().subscribe(_ => {
      switch (messagePopupPair.status){

        case false:
          this.timeout = 6000;
          break;

        case true:
          this.timeout = 2500;
          break;

        default:
          this.timeout = 3000;
      }
      setTimeout(() => {
        dialogRef.close();
      }, this.timeout)
    });

    dialogRef.afterClosed().subscribe(res => {
    });
  }

  setCategory(category: string) {
    this.currentCategory = category;
  }

  getCategory(): string {
    return this.currentCategory;
  }

  setId(id: string) {
    this.currentProductId = id;
  }

  getId(): string {
    return this.currentProductId;
  }

}
