import { Component } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '40978-PWM-Sprint-3-Angular';
  /*items: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
  }*/
}
