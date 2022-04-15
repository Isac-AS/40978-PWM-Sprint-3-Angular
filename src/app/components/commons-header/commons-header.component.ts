import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-commons-header',
  templateUrl: './commons-header.component.html',
  styleUrls: ['./commons-header.component.css']
})
export class CommonsHeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  logoUrl: string | undefined;
  multipleChoiceButtonUrl: string | undefined;
  magnifyingGlassUrl: string | undefined;
  userIconUrl: string | undefined;
  cartUrl: string | undefined;

  constructor(private auth: AuthService,
              private router: Router) {
    this.auth.userState().subscribe( res => {
      this.isLoggedIn = !!res;
    })

    this.logoUrl = "https://github.com/Isac-AS/40978-PWM-RWD/blob/master/images/Logo.PNG?raw=true";
    this.multipleChoiceButtonUrl = "https://github.com/Isac-AS/40978-PWM-RWD/blob/master/images/multipleChoiceButton.png?raw=true";
    this.magnifyingGlassUrl = "https://api.iconify.design/cil/magnifying-glass.svg";
    this.userIconUrl = "https://api.iconify.design/ant-design/user-outlined.svg";
    this.cartUrl = "https://api.iconify.design/ant-design/shopping-cart-outlined.svg";
  }

  ngOnInit(): void {
  }

  logOut() {
    const res = this.auth.logout().catch( async error => {
      await alert('Parece haber habido un problema. Inténtelo de nuevo.')
    });
    this.router.navigate(['/login']);
  }

}
