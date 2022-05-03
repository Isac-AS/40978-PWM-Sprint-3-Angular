import { ShoppingCartElement, User } from 'src/app/models/interfaces';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { CustomUtilsService } from 'src/app/services/customUtils.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  uid: string = '';
  path: string = 'users';

  shoppingCart: ShoppingCartElement[] = [];

  databaseElement: User = {
    name: '',
    email: '',
    uid: '',
    password: '',
    profile: 'regular',
    shoppingCart: [],
    photoURL: ''
  }

  constructor(
    private auth: AuthService,
    public db: DatabaseService,
    private utils: CustomUtilsService,
  ) { 
    this.auth.getUid().then(async r => {
      if (r) {
        this.uid = r;
        this.db.readDocument<User>(this.path, this.uid).subscribe(async res => {
          if (res) {
            this.databaseElement = res;
            this.shoppingCart = this.databaseElement.shoppingCart;
          }
        });
      }
    })
  }

  ngOnInit(): void {
  }

  decrement(id: string){
    this.databaseElement.shoppingCart = this.utils.removeOrDecrementElementFromShoppingCart(this.databaseElement.shoppingCart, id);
    this.db.updateDocument<User>(this.databaseElement, this.path, this.databaseElement.uid);
  }

  clearCart(){
    this.databaseElement.shoppingCart = [];
    this.db.updateDocument<User>(this.databaseElement, this.path, this.databaseElement.uid);
  }

  incrementElement(id: string) {
    this.utils.addOrIncrementInCart(id, this.databaseElement);
  }

  delete(id: string){
    this.databaseElement.shoppingCart = this.utils.removeElementFromShoppingCart(this.databaseElement.shoppingCart, id);
    this.db.updateDocument<User>(this.databaseElement, this.path, this.databaseElement.uid);
  }
}
