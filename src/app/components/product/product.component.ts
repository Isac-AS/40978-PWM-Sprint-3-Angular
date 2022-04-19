import {Component, Input, OnInit} from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {Product, User} from "../../models/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  path = 'products';

  @Input() productId: string = '';
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

  observable: Observable<any> | undefined;

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.observable = this.db.readDocument<Product>('products', this.productId);
    this.observable.subscribe( async res => {
      if (res)
        this.product = await res;
    })
  }

}
