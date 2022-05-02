import {Component, Input, OnInit} from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {Product, User} from "../../models/interfaces";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

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

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.db.readDocument<Product>('products', this.productId).subscribe( async res => {
      if (res)
        this.product = res;
    })
  }

}
