import { Component, OnInit } from '@angular/core';
import { Product, User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CustomUtilsService } from 'src/app/services/customUtils.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-concrete-product-page',
  templateUrl: './concrete-product-page.component.html',
  styleUrls: ['./concrete-product-page.component.css']
})
export class ConcreteProductPageComponent implements OnInit {

  productId: string;
  product : Product = {
    id: '',
    name: '',
    extendedName: '',
    description: '',
    price: 0,
    priceWithoutTax: 0,
    brand: '',
    imageUrl: '',
    category: '',
    discount: 0,
  };

  currentUserId: string = '';

  currentUser: User = {
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
    private db: DatabaseService,
    private utils: CustomUtilsService
  ) { 
    this.productId = this.utils.getId();
    this.auth.getUid().then(async r => {
      if (r) {
        this.currentUserId = r;
        this.db.readDocument<User>('users', this.currentUserId).subscribe(async res => {
          if (res) {
            this.currentUser = res;
          }
        });
      }
    })
  }

  ngOnInit(): void {
    this.db.readDocument<Product>('products', this.productId).subscribe( async res => {
      if (res)
        this.product = res;
    })
  }

  addToCart(productId: string, price: number) {
    this.utils.addOrIncrementInCart(productId, this.currentUser, price)
  }

}
