import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {User} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFirebase: AngularFireAuth) { }

  login(email: string, password:string) {
    return this.authFirebase.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.authFirebase.signOut();
  }

  register(data: User) {
    return this.authFirebase.createUserWithEmailAndPassword(data.email,data.password);
  }

  userState() {
    return this.authFirebase.authState;
  }
}
