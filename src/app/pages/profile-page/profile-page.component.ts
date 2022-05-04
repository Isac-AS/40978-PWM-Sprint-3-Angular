import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Product, User } from "../../models/interfaces";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { DatabaseService } from "../../services/database.service";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CustomUtilsService } from "../../services/customUtils.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  uid: string = '';
  path: string = 'users';

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
    shoppingCart: [],
    photoURL: ''
  }

  uploadPercent$: Observable<number | undefined> | undefined;
  downloadURL: Observable<string | null> | undefined;

  profileUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public database: DatabaseService,
    private utils: CustomUtilsService,
    private storage: AngularFireStorage
  ) {
    this.auth.getUid().then(async r => {
      if (r) {
        this.uid = r;
        this.database.readDocument<User>(this.path, this.uid).subscribe(async res => {
          if (res) {
            this.databaseElement = res;
            this.initializeForm(res);
            let ref = this.storage.ref('profilePictures/'+ this.databaseElement.uid );
            ref.getDownloadURL().subscribe(res => {
              this.profileUrl = res;
              console.log(this.profileUrl)
            });
          }
        });
      }
    })
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
        this.utils.openMessageDialog({
        message: 'Datos de usuario modificados con éxito!',
        status: true
      })
    });
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = 'profilePictures/' + this.databaseElement.uid;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent$ = task.percentageChanges();

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }


}
