import { Router} from "@angular/router";
import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {HeaderResponsiveDialogComponent} from "./header-responsive-dialog/header-responsive-dialog.component";

@Component({
  selector: 'app-commons-header',
  templateUrl: './commons-header.component.html',
  styleUrls: ['./commons-header.component.css']
})
export class CommonsHeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  logoUrl: string = "https://github.com/Isac-AS/40978-PWM-RWD/blob/master/images/Logo.PNG?raw=true";
  multipleChoiceButtonUrl: string = "https://github.com/Isac-AS/40978-PWM-RWD/blob/master/images/multipleChoiceButton.png?raw=true";

  constructor(private auth: AuthService,
              public dialog: MatDialog,
              private router: Router) {
    this.auth.userState().subscribe( res => {
      this.isLoggedIn = !!res;
      this.isAdminCall();
    })
  }

  ngOnInit(): void { }

  logOut() {
    const res = this.auth.logout().catch( async error => {
      await alert('Parece haber habido un problema. Inténtelo de nuevo.')
    });
    this.router.navigate(['/login']);
  }

  isAdminCall() {
    this.auth.isAdmin().then(r => {
      this.isAdmin = r;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HeaderResponsiveDialogComponent, {
      data: { login: this.isLoggedIn,
              admin: this.isAdmin
            },
      width: '70%',
      height: '100%',
      position: {
        left: '0px'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }
}
