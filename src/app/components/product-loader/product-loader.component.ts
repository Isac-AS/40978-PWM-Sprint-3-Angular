import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomUtilsService } from 'src/app/services/customUtils.service';
import {Product, User} from "../../models/interfaces";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-product-loader',
  templateUrl: './product-loader.component.html',
  styleUrls: ['./product-loader.component.css']
})
export class ProductLoaderComponent implements OnInit {

  @Input() whatToLoad: string = 'all';
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 1000000;

  products: Product[] = [];
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
    this.db.readCollection<Product>('products').subscribe(async res => {
        this.products = res;
      }
    )
  }

  setId(id: string) {
    this.utils.setId(id);
  }

  addToCart(productId: string) {
    this.utils.addOrIncrementInCart(productId, this.currentUser)
  }
}
