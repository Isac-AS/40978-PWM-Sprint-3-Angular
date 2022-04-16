import {Router} from "@angular/router";
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MessagePopupPair} from "../../models/interfaces";
import {InfoMessagePopupComponent} from "../../components/info-message-popup/info-message-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {CustomUtilsService} from "../../services/customUtils.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  credentials = this.fb.group({
    email : ['', [Validators.required, Validators.email]],
    password : [ '', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authFirebase: AuthService,
    private utils: CustomUtilsService
  ) { }

  ngOnInit(): void { }

  async onSubmit() {
    const res = await this.authFirebase.login(this.credentials.value.email,
                                              this.credentials.value.password)
      .catch( error => {
        this.utils.openMessageDialog( {
          message: 'Error: Nombre de usuario o contraseña incorrectos',
          status: false
        })
      });
    if (res) {
      await this.utils.openMessageDialog( {
        message: 'Bienvenido!',
        status: true
      })
      await this.router.navigate(['/home']);
    }
  }

  clearForm(){
    this.credentials.setValue({
      email: '',
      password: '',
    })
  }
}
