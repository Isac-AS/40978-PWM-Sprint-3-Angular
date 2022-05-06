import {Observable, take} from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { Component, Inject, OnInit } from '@angular/core';
import { DatabaseService } from "../../../services/database.service";
import { IdPair, Product } from "../../../models/interfaces";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import { CustomUtilsService } from "../../../services/customUtils.service";
import { StorageService } from "src/app/services/storage.service";
import {
  UserModificationPopupComponent
} from "../../../components/user-modification-popup/user-modification-popup.component";
import {TicketViewerPopupComponent} from "../../../components/ticket-viewer-popup/ticket-viewer-popup.component";

@Component({
  selector: 'app-modify-element-modal-view',
  templateUrl: './modify-element-modal-view.component.html',
  styleUrls: ['./modify-element-modal-view.component.css']
})
export class ModifyElementModalViewComponent implements OnInit {

  id: string = '';
  path: string = '';

  collection: any[] = [];
  collections: string[] = ['Productos', 'Usuarios', 'Tickets'];
  currentCollection: string = '';
  documentToModifyId: string = '';

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
    public dialog: MatDialog,
    private fb: FormBuilder,
    public database: DatabaseService,
    private utils: CustomUtilsService,
    private storageService: StorageService,
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

  collectionButtonHandler(path: string) {
    this.setCurrentCollection(path);
    this.getCollection();
  }

  getCollection() {
    this.database.readCollection(this.currentCollection).subscribe(res => {
      this.collection = res;
    })
  }

  setCurrentCollection(displayedCollection: string) {
    switch (displayedCollection) {
      case 'Productos':
        this.currentCollection = 'products'
        break;
      case 'Usuarios':
        this.currentCollection = 'users'
        break;
      case 'Tickets':
        this.currentCollection = 'tickets'
        break;
      default:
        this.currentCollection = 'products'
        break;
    }
  }


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
    this.update();
    this.dialogRef.close();
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

  uploadProductImage(imageInput: any) {
    this.storageService.uploadFile(imageInput, 'productsImages', this.databaseElement.id);
    const ref = this.storageService.getRef('productsImages/' + this.databaseElement.id);
    ref.getDownloadURL().subscribe(url => {
      this.databaseElement.imageUrl = url;
      this.database.updateDocument<Product>(this.databaseElement, this.path, this.databaseElement.id)
      .then(async (_) => {
        this.utils.openMessageDialog({
          message: 'Imagen del producto modificada con éxito!',
          status: true
        })
      });
    })
  }

  modifyElement(id: string) {
    this.documentToModifyId = id;
    switch (this.currentCollection) {
      case 'products':
        this.openProductModificationDialog();
        break;
      case 'users':
        this.openUserModificationDialog();
    }
  }

  deleteElement(id: string) {
    this.database.deleteDocument(this.currentCollection, id).then(async r => {
      await this.utils.openMessageDialog({
        message: 'Producto Eliminado con éxito!',
        status: true
      })
    });
  }

  openProductModificationDialog(): void {
    const configData: IdPair = { id: this.documentToModifyId, path: this.currentCollection }
    this.dialog.open(ModifyElementModalViewComponent, {
      data: configData,
      width: '70%',
      maxHeight: '90vh',
    });
  }

  openUserModificationDialog(): void {
    const configData: IdPair = { id: this.documentToModifyId, path: this.currentCollection }
    this.dialog.open(UserModificationPopupComponent, {
      data: configData,
      width: '70%',
    });
  }

  openTicketViewerDialog(id: string): void{
    this.database.readDocument('tickets', id).pipe(take(1)).subscribe( readTicket => {
      this.dialog.open(TicketViewerPopupComponent, {
        data: readTicket,
        width: '70%',
      })
    })
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
