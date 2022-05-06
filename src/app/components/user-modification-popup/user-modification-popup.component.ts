import { Observable } from 'rxjs';
import {IdPair, Product, User} from "../../models/interfaces";
import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { DatabaseService } from "../../services/database.service";
import { StorageService } from 'src/app/services/storage.service';
import { CustomUtilsService } from "../../services/customUtils.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-modification-popup',
  templateUrl: './user-modification-popup.component.html',
  styleUrls: ['./user-modification-popup.component.css']
})

export class UserModificationPopupComponent implements OnInit {

  uid: string = '';
  path: string = 'users';

  hidden: boolean = false;
  write: boolean = false;

  uploadPercent$: Observable<number | undefined> | undefined;
  downloadURL: Observable<string | null> | undefined;
  observable: Observable<any>;

  currentUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      image_url: ['', [Validators.required]]
    }
  );

  databaseElement: User = {
    name: '',
    email: '',
    uid: '',
    password: '',
    profile: 'regular',
    shoppingCart: [],
    photoURL: ''
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public database: DatabaseService,
    private utils: CustomUtilsService,
    private storageService: StorageService,
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

  ngOnInit(): void { }

  initializeForm(user: User) {
    this.currentUserForm.setValue(
      {
        name: user.name,
        email: user.email,
        image_url: user.photoURL
      }
    )
  }

  onSubmit() {
    this.databaseElement.name = this.currentUserForm.value.name;
    this.databaseElement.email = this.currentUserForm.value.email;
    this.databaseElement.photoURL = this.currentUserForm.value.image_url;
    this.update();
    this.dialogRef.close();
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

  setHidden(){
    this.hidden = true;
    this.write = true;
  }

  uploadProfilePicture(imageInput: any) {
    this.storageService.uploadFile(imageInput, 'profilePictures', this.databaseElement.uid);
    const ref = this.storageService.getRef('profilePictures/' + this.databaseElement.uid);
    ref.getDownloadURL().subscribe(url => {
      this.databaseElement.photoURL = url;
      this.currentUserForm.value.image_url = url;
      this.database.updateDocument<User>(this.databaseElement, this.path, this.databaseElement.uid)
        .then(async (_) => {
          this.utils.openMessageDialog({
            message: 'Imagen modificada',
            status: true
          })
        });
    })
  }
}
