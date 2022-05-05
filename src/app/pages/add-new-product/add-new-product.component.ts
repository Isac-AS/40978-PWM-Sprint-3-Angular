import {Component, OnInit, ViewChild} from '@angular/core';
import {MessagePopupPair, Product} from "../../models/interfaces";
import {DatabaseService} from "../../services/database.service";
import {FormBuilder, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {InfoMessagePopupComponent} from "../../components/info-message-popup/info-message-popup.component";
import {CustomUtilsService} from "../../services/customUtils.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective | undefined;

  private path: string = 'products';
  private uniqueId: string = '';
  imageUploaded: boolean = false;

  newProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      extendedName: ['', [Validators.required, Validators.minLength(12)]],
      description: ['', [Validators.minLength(12)]],
      price: ['', [Validators.required]],
      priceWithoutTax: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      category: ['', [Validators.required]],
      discount: ['']
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
    private storageService: StorageService
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.databaseElement.name = this.newProductForm.value.name;
    this.databaseElement.extendedName = this.newProductForm.value.extendedName;
    this.databaseElement.description = this.newProductForm.value.description;
    this.databaseElement.price = this.newProductForm.value.price;
    this.databaseElement.priceWithoutTax = this.newProductForm.value.priceWithoutTax;
    this.databaseElement.brand = this.newProductForm.value.brand;
    this.databaseElement.category = this.newProductForm.value.category;
    this.databaseElement.discount = this.newProductForm.value.discount;
    this.save();

  }

   save() {
    const data = this.databaseElement;
    data.id = this.uniqueId;
    this.database.createDocument<Product>(data, this.path, data.id).then(async (_) => {
      await this.utils.openMessageDialog( {
        message: 'Producto guardado con éxito!',
        status: true
      })
      this.formDirective?.resetForm();
      this.imageUploaded = false;
    });
  }

   async uploadProductImage(imageInput: any) {
    this.uniqueId = this.database.createId();
    await this.storageService.uploadFile(imageInput, 'productsImages', this.uniqueId);
    const ref = await this.storageService.getRef('productsImages/' + this.uniqueId);
    await ref.getDownloadURL().subscribe(url => {
      this.databaseElement.imageUrl = url;
      this.imageUploaded = true;
    });
  }


  clearForm() {
    this.newProductForm.reset();

  }

}
