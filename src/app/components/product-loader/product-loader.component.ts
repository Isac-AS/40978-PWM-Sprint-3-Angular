import {Product, WhatToLoad} from "../../models/interfaces";
import {Component, Input, OnInit} from '@angular/core';
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-product-loader',
  templateUrl: './product-loader.component.html',
  styleUrls: ['./product-loader.component.css']
})
export class ProductLoaderComponent implements OnInit {

  @Input() whatToLoad: WhatToLoad = {
    elementToLoad: 'all'
  };

  productsIds: string[] = [];

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.db.readCollection<Product>('products').subscribe(async res => {
        this.fillProducts(res);
      }
    )
  }

  fillProducts(collection: any[]) {
    switch (this.whatToLoad.elementToLoad) {
      case "all":
        for (let element of collection) {
          this.productsIds.push(element.id)
        }
        break;
      case "discount":
        for (let element of collection) {
          if (element.discount > 0) {
            this.productsIds.push(element.id)
          }
        }
        break;
      case "specialOffer":
        for (let element of collection) {
          if (element.discount > 50) {
            this.productsIds.push(element.id);
          }
        }
        break;
      case "clothing":
      case "furniture":
      case "games":
      case "headphones":
      case "laptops":
      case "phones":
      case "random":
      case "sports":
        for (let element of collection) {
          if (element.category == this.whatToLoad) {
            this.productsIds.push(element.id);
          }
        }
        break;
    }
  }
}
