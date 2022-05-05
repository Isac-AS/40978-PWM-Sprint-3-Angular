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
  profileUrl: string = '';

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
    private storage: AngularFireStorage
  ) {
    this.auth.getUid().then(async r => {
      if (r) {
        this.uid = r;
        this.database.readDocument<User>(this.path, this.uid).subscribe(async res => {
          if (res) {
            this.databaseElement = res;
            this.profileUrl = this.databaseElement.photoURL;
            this.initializeForm(this.databaseElement);
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
        image_url: user.photoURL
      }
    )
  }

  onSubmit() {
    this.hidden = true;
  }

  update(url: any) {
    this.databaseElement.photoURL = url;
    const data = this.databaseElement;
    data.uid = this.uid;
    this.database.updateDocument<User>(data, this.path, data.uid).then(async (_) => {
        this.utils.openMessageDialog({
        message: 'Datos de usuario modificados con éxito!',
        status: true
      })
    });
    this.hidden = false;
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
        finalize(() =>
          fileRef.getDownloadURL().subscribe(url => this.update(url)))
     ).subscribe()
  }
}
