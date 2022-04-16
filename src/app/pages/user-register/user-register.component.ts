import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MessagePopupPair, User} from "../../models/interfaces";
import {databaseService} from "../../services/database.service";
import {InfoMessagePopupComponent} from "../../components/info-message-popup/info-message-popup.component";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerForm = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(2)]],
    email : ['', [Validators.required, Validators.email]],
    password : [ '', [Validators.required, Validators.minLength(6)]]
  });

  userData: User = {
    name: '',
    email: '',
    uid: '',
    password: '',
    profile: "regular",
    shoppingCart: ['']
  };

  path: string = 'users';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private auth: AuthService,
    private db: databaseService
  ) { }

  ngOnInit(): void {
  }

  async register() {
    this.userData.name = this.registerForm.value.name;
    this.userData.email = this.registerForm.value.email;
    this.userData.password = this.registerForm.value.password;

    const res = await this.auth.register(this.userData).catch( error => {
      this.openDialog( {
        message: 'Error: No se puedo crear la cuenta de usuario',
        status: false
        })
    });
    if (res) {
      await this.openDialog( {
          message: 'Éxito en la creación de la cuenta',
          status: true
        })

      this.userData.uid = res.user!.uid;
      this.userData.password = 'null';
      await this.db.createDocument(this.userData, this.path, this.userData.uid);
      await this.router.navigate(['/home'])
    }
  }

  clearForm(){
    this.registerForm.setValue({
      name: '',
      email: '',
      password: '',
    })
  }

  openDialog(messagePopupPair: MessagePopupPair): void {
    const dialogRef = this.dialog.open(InfoMessagePopupComponent, {
      data: messagePopupPair
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }

}
