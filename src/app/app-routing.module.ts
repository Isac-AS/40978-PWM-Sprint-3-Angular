import { map } from "rxjs";
import { NgModule } from '@angular/core';
import {canActivate} from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";
import { AngularFireAuthGuard } from "@angular/fire/compat/auth-guard";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { UserRegisterComponent } from "./components/user-register/user-register.component";
import { CategoryPageComponent } from "./pages/category-page/category-page.component";
import { RudCollectionComponent } from "./pages/rud-collection/rud-collection.component";
import { AddNewProductComponent } from "./pages/add-new-product/add-new-product.component";
import {AboutUsPageComponent} from "./pages/about-us-page/about-us-page.component";
import {TicketPageComponent} from "./pages/ticket-page/ticket-page.component";
import { ConcreteProductPageComponent } from "./pages/concrete-product-page/concrete-product-page.component";

const adminUid = '1QpnBzjOCYe6y4mAxU1I2yP47kl1';
const adminOnly = () => map((user:any) => !!user && (user.uid === adminUid));

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'category',
    component: CategoryPageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'addProduct',
    component: AddNewProductComponent,
    ...canActivate(adminOnly)
  },
  {
    path: 'collections',
    component: RudCollectionComponent,
    ...canActivate(adminOnly)
  },
  {
    path: 'about-us',
    component: AboutUsPageComponent
  },
  {
    path: 'product',
    component: ConcreteProductPageComponent
  },
  {
    path: 'ticket',
    component: TicketPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
