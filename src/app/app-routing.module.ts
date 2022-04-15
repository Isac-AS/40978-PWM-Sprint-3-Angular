import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {CategoryPageComponent} from "./pages/category-page/category-page.component";
import {AddNewProductComponent} from "./pages/add-new-product/add-new-product.component";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {RudCollectionComponent} from "./pages/rud-collection/rud-collection.component";
import {UserLoginComponent} from "./pages/user-login/user-login.component";
import {UserRegisterComponent} from "./pages/user-register/user-register.component";
import {map} from "rxjs";
import {canActivate} from "@angular/fire/auth-guard";

const adminUid = '1QpnBzjOCYe6y4mAxU1I2yP47kl1';
const adminOnly = () => map((user:any) => !!user && (user.uid === adminUid));

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'category', component: CategoryPageComponent},
  {path: 'addProduct', component: AddNewProductComponent, ...canActivate(adminOnly) },
  {path: 'collections', component: RudCollectionComponent, ...canActivate(adminOnly) },
  {path: 'login', component: UserLoginComponent},
  {path: 'register', component: UserRegisterComponent}
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