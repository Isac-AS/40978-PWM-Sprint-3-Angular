import {Component, OnInit} from '@angular/core';
import {User} from "../../models/interfaces";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {databaseService} from "../../services/database.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  userData: User = {
    name: '',
    email: '',
    uid: '',
    password: '',
    profile: "regular"
  };

  path: string = 'users';

  constructor(private auth: AuthService,
              private db: databaseService,
              private router: Router) { }

  ngOnInit(): void {
  }

  async register() {
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

}
