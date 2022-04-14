import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/interfaces";
import {databaseService} from "../../services/database.service";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  newProduct: Product = {
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

  constructor(public database: databaseService) { }

  ngOnInit(): void {
  }

  save() {
    console.log('Object sent to save:', this.newProduct);
    const data = this.newProduct;
    data.id = this.database.createId();
    const path = 'products';
    this.database.createDocument<Product>(data, path, data.id).then( (_) => {
      console.log('Element saved successfully!');
    });
  }

}
