import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";
import {Product} from "../../models/interfaces";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  }

  constructor(private authFirebase: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async login() {
    const res = await this.authFirebase.login(this.credentials.email, this.credentials.password).catch(
      error => { alert('Error: Usuario o contraseña invalidos')}
    );
    if (res) {
      alert('Ha iniciado sesion correctamente');
      await this.router.navigate(['/home']);
    }
  }

}
