import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/interfaces';
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

  constructor(
    private db: DatabaseService,
    private utils: CustomUtilsService
  ) { 
    this.productId = this.utils.getId();
  }

  ngOnInit(): void {
    this.db.readDocument<Product>('products', this.productId).subscribe( async res => {
      if (res)
        this.product = res;
    })
  }

}
