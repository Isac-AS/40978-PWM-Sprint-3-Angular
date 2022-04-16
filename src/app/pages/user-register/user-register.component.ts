import {Component, OnInit} from '@angular/core';
import {User} from "../../models/interfaces";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {databaseService} from "../../services/database.service";
import {FormBuilder, Validators} from "@angular/forms";

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

  constructor(private auth: AuthService,
              private db: databaseService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  async register() {
    this.userData.name = this.registerForm.value.name;
    this.userData.email = this.registerForm.value.email;
    this.userData.password = this.registerForm.value.password;

    const res = await this.auth.register(this.userData).catch( error => {
      alert('Error: No se puedo crear la cuenta de usuario')
    });
    if (res) {
      await alert('Exito en la creacion del usuario.')
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

}
