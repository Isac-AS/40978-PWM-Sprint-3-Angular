import {Observable} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {Component, Inject, OnInit} from '@angular/core';
import {DatabaseService} from "../../../services/database.service";
import {IdPair, Product} from "../../../models/interfaces";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CustomUtilsService} from "../../../services/customUtils.service";

@Component({
  selector: 'app-modify-element-modal-view',
  templateUrl: './modify-element-modal-view.component.html',
  styleUrls: ['./modify-element-modal-view.component.css']
})
export class ModifyElementModalViewComponent implements OnInit {

  id: string = '';
  path: string = '';

  observable: Observable<any>;

  currentProductForm = this.fb.group({
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
    private utils: CustomUtilsService,
    public dialogRef: MatDialogRef<ModifyElementModalViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IdPair
  ) {
    this.id = data.id;
    this.path = data.path;
    this.observable = this.database.readDocument<Product>(this.path, this.id);
    this.observable.subscribe(async res => {
        this.databaseElement = await res;
        this.initializeForm(res);
      }
    );
  }

  ngOnInit(): void { }

  initializeForm(product: Product) {
    this.currentProductForm.setValue(
      {
        name: product.name,
        extendedName: product.extendedName,
        description: product.description,
        price: product.price,
        priceWithoutTax: product.priceWithoutTax,
        brand: product.brand,
        imageUrl: product.imageUrl,
        category: product.category,
        discount: product.discount,
      }
    )
  }

  onSubmit() {
    this.databaseElement.name = this.currentProductForm.value.name;
    this.databaseElement.extendedName = this.currentProductForm.value.extendedName;
    this.databaseElement.description = this.currentProductForm.value.description;
    this.databaseElement.price = this.currentProductForm.value.price;
    this.databaseElement.priceWithoutTax = this.currentProductForm.value.priceWithoutTax;
    this.databaseElement.brand = this.currentProductForm.value.brand;
    this.databaseElement.imageUrl = this.currentProductForm.value.imageUrl;
    this.databaseElement.category = this.currentProductForm.value.category;
    this.databaseElement.discount = this.currentProductForm.value.discount;
    this.update()
  }

  update() {
    const data = this.databaseElement;
    data.id = this.id;
    this.database.updateDocument<Product>(data, this.path, data.id).then(async (_) => {
      await this.utils.openMessageDialog({
        message: 'Producto Modificado con éxito!',
        status: true
      })
    });
  }

  clearForm() {
    this.currentProductForm.setValue(
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
