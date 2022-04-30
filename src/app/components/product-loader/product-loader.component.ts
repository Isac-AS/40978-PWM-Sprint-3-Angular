import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/interfaces";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-product-loader',
  templateUrl: './product-loader.component.html',
  styleUrls: ['./product-loader.component.css']
})
export class ProductLoaderComponent implements OnInit {

  @Input() whatToLoad: string = 'all';

  products: Product[] = [];

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.db.readCollection<Product>('products').subscribe(async res => {
        this.products = res;
      }
    )
  }
}
