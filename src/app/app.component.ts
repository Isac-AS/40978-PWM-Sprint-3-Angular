import { Component } from '@angular/core';

import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '40978-PWM-Sprint-3-Angular';

  constructor(private store: AngularFirestore) {
  }

}
