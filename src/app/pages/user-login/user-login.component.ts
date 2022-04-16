import {Router} from "@angular/router";
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

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

  constructor(private authFirebase: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void { }

  async onSubmit() {
    const res = await this.authFirebase.login(this.credentials.value.email,
                                              this.credentials.value.password)
      .catch(error => {
        alert('Error: Usuario o contraseña invalidos'
      )}
    );
    if (res) {
      alert('Ha iniciado sesion correctamente');
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
