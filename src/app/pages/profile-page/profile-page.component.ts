import { Observable } from 'rxjs';
import { User } from "../../models/interfaces";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { DatabaseService } from "../../services/database.service";
import { StorageService } from 'src/app/services/storage.service';
import { CustomUtilsService } from "../../services/customUtils.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  uid: string = '';
  path: string = 'users';

  hidden: boolean = false;

  uploadPercent$: Observable<number | undefined> | undefined;
  downloadURL: Observable<string | null> | undefined;

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
    private storageService: StorageService
  ) {
    this.auth.getUid().then(async r => {
      if (r) {
        this.uid = r;
        this.database.readDocument<User>(this.path, this.uid).subscribe(async res => {
          if (res) {
            this.databaseElement = res;
            this.initializeForm(this.databaseElement);
          }
        });
      }
    })
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
    this.hidden = true;
  }

  uploadProfilePicture(imageInput: any) {
    this.storageService.uploadFile(imageInput, 'profilePictures', this.databaseElement.uid);
    const ref = this.storageService.getRef('profilePictures/' + this.databaseElement.uid);
    ref.getDownloadURL().subscribe(url => {
      this.databaseElement.photoURL = url;
      this.database.updateDocument<User>(this.databaseElement, this.path, this.databaseElement.uid)
        .then(async (_) => {
          this.utils.openMessageDialog({
            message: 'Datos de usuario modificados con éxito!',
            status: true
          })
        });
    })
    this.hidden = false;
  }
}
