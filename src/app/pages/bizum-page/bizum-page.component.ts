import { Component, OnInit } from '@angular/core';
import {ShoppingCartElement, User} from "../../models/interfaces";
import {AuthService} from "../../services/auth.service";
import {DatabaseService} from "../../services/database.service";
import {CustomUtilsService} from "../../services/customUtils.service";

@Component({
  selector: 'app-bizum-page',
  templateUrl: './bizum-page.component.html',
  styleUrls: ['./bizum-page.component.css']
})
export class BizumPageComponent implements OnInit {

  uid: string = '';
  path: string = 'users';

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
          }
        });
      }
    })
  }

  ngOnInit(): void {
  }

  cleanUserCart(){
    this.databaseElement.shoppingCart = [];
    this.db.updateDocument<User>(this.databaseElement, this.path, this.databaseElement.uid);

  }

}
