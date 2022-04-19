import {Component, OnInit} from '@angular/core';
import {MessagePopupPair, Product} from "../../models/interfaces";
import {DatabaseService} from "../../services/database.service";
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {InfoMessagePopupComponent} from "../../components/info-message-popup/info-message-popup.component";
import {CustomUtilsService} from "../../services/customUtils.service";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  private path: string = 'products';

  newProductForm = this.fb.group({
      name: ['', [Validators.required]],
      extendedName: [''],
      description: [''],
      price: ['', [Validators.required]],
      priceWithoutTax: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      category: ['', [Validators.required]],
      discount: ['', [Validators.required]]
    }
  );

  databaseElement: Product = {
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
    private fb: FormBuilder,
    public database: DatabaseService,
    private utils: CustomUtilsService
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.databaseElement.name = this.newProductForm.value.name;
    this.databaseElement.extendedName = this.newProductForm.value.extendedName;
    this.databaseElement.description = this.newProductForm.value.description;
    this.databaseElement.price = this.newProductForm.value.price;
    this.databaseElement.priceWithoutTax = this.newProductForm.value.priceWithoutTax;
    this.databaseElement.brand = this.newProductForm.value.brand;
    this.databaseElement.imageUrl = this.newProductForm.value.imageUrl;
    this.databaseElement.category = this.newProductForm.value.category;
    this.databaseElement.discount = this.newProductForm.value.discount;
    this.save()
  }

  save() {
    const data = this.databaseElement;
    data.id = this.database.createId();
    this.database.createDocument<Product>(data, this.path, data.id).then(async (_) => {
      await this.utils.openMessageDialog( {
        message: 'Producto Guardado con éxito!',
        status: true
      })
    });
    this.clearForm();
  }

  clearForm() {
    this.newProductForm.setValue(
      {
        name: '',
        extendedName: '',
        description: '',
        price: '',
        priceWithoutTax: '',
        brand: '',
        imageUrl: '',
        category: '',
        discount: '',
      }
    )
  }

}
