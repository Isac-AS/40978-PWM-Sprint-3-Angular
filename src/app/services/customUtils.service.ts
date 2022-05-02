import { Injectable } from "@angular/core";
import {MessagePopupPair} from "../models/interfaces";
import {InfoMessagePopupComponent} from "../components/info-message-popup/info-message-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class CustomUtilsService {

  currentCategory: string = '';
  currentProductId: string = '';

  constructor(
    public dialog: MatDialog
  ) { }

  openMessageDialog(messagePopupPair: MessagePopupPair): void {
    const dialogRef = this.dialog.open(InfoMessagePopupComponent, {
      data: messagePopupPair
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
