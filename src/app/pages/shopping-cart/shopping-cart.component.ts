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
  hidden: boolean = true;

  shoppingCart: ShoppingCartElement[] = [];
  total: number = 0;

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
            this.total = 0;
            for (let element of this.shoppingCart) {
              this.total += element.count * element.price;
            }
            this.total = Math.round((this.total + Number.EPSILON) * 100) / 100
            if (this.total != 0) this.hidden = false;
          }
        });
      }
    })
  }

  ngOnInit(): void {
    console.log(this.hidden);
  }

  decrement(id: string){
    this.databaseElement.shoppingCart = this.utils.removeOrDecrementElementFromShoppingCart(this.databaseElement.shoppingCart, id);
    this.db.updateDocument<User>(this.databaseElement, this.path, this.databaseElement.uid);
  }

  clearCart(){
    this.databaseElement.shoppingCart = [];
    this.db.updateDocument<User>(this.databaseElement, this.path, this.databaseElement.uid);
    this.hidden = true;
  }

  incrementElement(id: string, price: number) {
    this.utils.addOrIncrementInCart(id, this.databaseElement, price);
  }

  delete(id: string){
    this.databaseElement.shoppingCart = this.utils.removeElementFromShoppingCart(this.databaseElement.shoppingCart, id);
    this.db.updateDocument<User>(this.databaseElement, this.path, this.databaseElement.uid);
  }
}
