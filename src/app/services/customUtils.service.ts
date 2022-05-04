import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DatabaseService } from "./database.service";
import { MessagePopupPair, ShoppingCartElement, User } from "../models/interfaces";
import { InfoMessagePopupComponent } from "../components/info-message-popup/info-message-popup.component";

@Injectable({
  providedIn: 'root'
})
export class CustomUtilsService {

  timeout: number = 0;
  currentCategory: string = '';
  currentProductId: string = '';

  constructor(
    public db: DatabaseService,
    public dialog: MatDialog
  ) {

  }

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

  removeOrDecrementElementFromShoppingCart(array: ShoppingCartElement[], element: string): ShoppingCartElement[] {
    array.forEach((value, index) => {
      if (value.id === element) {
        if (value.count > 1) value.count--;
        else if (value.count === 1) array.splice(index, 1);
      }
    });
    return array;
  }

  removeElementFromShoppingCart(array: ShoppingCartElement[], element: string): ShoppingCartElement[] {
    array.forEach((value, index) => {
      if (value.id === element) {
        array.splice(index, 1);
      }
    });
    return array;
  }

  addOrIncrementInCart(productId: string, user: User, price: number) {
    let found: boolean = false;
    user.shoppingCart.forEach((value) => {
      if (value.id === productId) {
        if (value.count > 0) value.count++;
        found = true;
      }
    });
    if (!found) user.shoppingCart.push({id: productId, count: 1, price: price})
    this.db.updateDocument(user, 'users', user.uid)
  }

}
