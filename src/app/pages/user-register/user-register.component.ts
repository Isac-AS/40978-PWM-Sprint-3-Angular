import {Router} from "@angular/router";
import {User} from "../../models/interfaces";
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {DatabaseService} from "../../services/database.service";
import {CustomUtilsService} from "../../services/customUtils.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {

  errorMessage: string = "";
  path: string = 'users';

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
    shoppingCart: [''],
    photoURL: 'gs://pwm-sprint3-angular.appspot.com/user-pic.jpg'
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private db: DatabaseService,
    private utils: CustomUtilsService
  ) { }

  ngOnInit(): void {
  }

  async register() {
    this.userData.name = this.registerForm.value.name;
    this.userData.email = this.registerForm.value.email;
    this.userData.password = this.registerForm.value.password;

    const res = await this.auth.register(this.userData).catch( error => {
      switch(error.code){

        case "auth/email-already-in-use":
          this.errorMessage = "Error: El email introducido ya está en uso";
          break;

        case "auth/internal-error":
          this.errorMessage = "Error del sistema. Inténtelo de nuevo";
          break;

        default:
          this.errorMessage = "Error desconocido. Inténtelo de nuevo";
      }

      this.utils.openMessageDialog({
        message: this.errorMessage, status: false})
    });
    if (res) {
      await this.utils.openMessageDialog( {
          message: 'Éxito en la creación de la cuenta',
          status: true
        })

      this.userData.uid = res.user!.uid;
      this.userData.password = 'null';
      await this.db.createDocument(this.userData, this.path, this.userData.uid);
      await this.router.navigate(['/home'])
    }
  }

  clearForm() {
    this.registerForm.reset();
  }
}
