import {FormBuilder, Validators} from "@angular/forms";
import {IdPair, MessagePopupPair, Product, User} from "../../models/interfaces";
import {Component, Inject, OnInit} from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {InfoMessagePopupComponent} from "../info-message-popup/info-message-popup.component";
import * as Util from "util";
import {CustomUtilsService} from "../../services/customUtils.service";

@Component({
  selector: 'app-user-modification-popup',
  templateUrl: './user-modification-popup.component.html',
  styleUrls: ['./user-modification-popup.component.css']
})
export class UserModificationPopupComponent implements OnInit {

  uid: string = '';
  path: string = '';

  observable: Observable<any>;

  currentUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }
  );

  databaseElement: User = {
    name: '',
    email: '',
    uid: '',
    password: '',
    profile: 'regular',
    shoppingCart: ['']
  }

  constructor(
    private fb: FormBuilder,
    public database: DatabaseService,
    private utils: CustomUtilsService,
    public dialogRef: MatDialogRef<UserModificationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IdPair
  ) {
    this.uid = data.id;
    this.path = data.path;
    this.observable = this.database.readDocument<User>(this.path, this.uid);
    this.observable.subscribe(async res => {
        this.databaseElement = await res;
        this.initializeForm(res);
      }
    );
  }

  ngOnInit(): void {
  }

  initializeForm(user: User) {
    this.currentUserForm.setValue(
      {
        name: user.name,
        email: user.email,
        password: user.password
      }
    )
  }

  onSubmit() {
    this.databaseElement.name = this.currentUserForm.value.name;
    this.databaseElement.email = this.currentUserForm.value.email;
    this.databaseElement.password = this.currentUserForm.value.password;
    this.update()
  }

  update() {
    const data = this.databaseElement;
    data.uid = this.uid;
    this.database.updateDocument<Product>(data, this.path, data.uid).then(async (_) => {
      await this.utils.openMessageDialog({
        message: 'Producto Modificado con éxito!',
        status: true
      })
    });
  }

  clearForm() {
    this.currentUserForm.setValue(
      {
        name: '',
        email: '',
        password: ''
      }
    )
  }

}
