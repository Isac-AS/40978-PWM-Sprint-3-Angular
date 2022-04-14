import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commons-header',
  templateUrl: './commons-header.component.html',
  styleUrls: ['./commons-header.component.css']
})
export class CommonsHeaderComponent implements OnInit {

  logoUrl: string | undefined;
  multipleChoiceButtonUrl: string | undefined;
  magnifyingGlassUrl: string | undefined;
  userIconUrl: string | undefined;
  cartUrl: string | undefined;

  constructor() {
    this.logoUrl = "https://github.com/Isac-AS/40978-PWM-RWD/blob/master/images/Logo.PNG?raw=true";
    this.multipleChoiceButtonUrl = "https://github.com/Isac-AS/40978-PWM-RWD/blob/master/images/multipleChoiceButton.png?raw=true";
    this.magnifyingGlassUrl = "https://api.iconify.design/cil/magnifying-glass.svg";
    this.userIconUrl = "https://api.iconify.design/ant-design/user-outlined.svg";
    this.cartUrl = "https://api.iconify.design/ant-design/shopping-cart-outlined.svg";
  }

  ngOnInit(): void {
  }

}
