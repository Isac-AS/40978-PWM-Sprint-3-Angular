import {Component, Inject, Input, OnInit} from '@angular/core';
import {idPair, Product} from "../../models/interfaces";
import {databaseService} from "../../services/database.service";
import {Observable} from "rxjs";

import {NgForm} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-modify-element-modal-view',
  templateUrl: './modify-element-modal-view.component.html',
  styleUrls: ['./modify-element-modal-view.component.css']
})
export class ModifyElementModalViewComponent implements OnInit {

  id:string = '';
  path:string = '';

  observable: Observable<any>;
  currentProduct: Product = {
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
    public database: databaseService,
    public dialogRef: MatDialogRef<ModifyElementModalViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: idPair
  ) {
    this.id = data.id;
    this.path = data.path;
    console.log(this.path, this.id)
    this.observable = database.readDocument<Product>(this.path, this.id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.observable.subscribe( res =>
      this.currentProduct= res);
  }

  save(f: NgForm) {
    if (!f.valid) {
      console.log('No se va a guardar nada. Botón de enviar pulsado con formulario incorrecto.');
    } else {
      const data: Product = this.currentProduct;
      data.id = this.id;
      const path = this.path;
      this.database.createDocument<Product>(data, path, data.id).then(async (_) => {
        await alert("Producto editado correctamente");
      });
    }
  }


}
