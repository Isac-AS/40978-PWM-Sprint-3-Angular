import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/interfaces';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

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
