import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {HeaderDialogPair} from "../../../models/interfaces";

@Component({
  selector: 'app-header-responsive-dialog',
  templateUrl: './header-responsive-dialog.component.html',
  styleUrls: ['./header-responsive-dialog.component.css']
})
export class HeaderResponsiveDialogComponent implements OnInit {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private auth: AuthService,
              public dialogRef: MatDialogRef<HeaderResponsiveDialogComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data:HeaderDialogPair){
    this.isLoggedIn = data.login;
    this.isAdmin = data.admin;
  }

  ngOnInit(): void {
  }

  logOut() {
    const res = this.auth.logout().catch( async error => {
      await alert('Parece haber habido un problema. Inténtelo de nuevo.')
    });
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
