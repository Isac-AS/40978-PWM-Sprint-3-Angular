// Basic imports
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule} from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Fire imports
import { AngularFireModule} from "@angular/fire/compat";
import { provideAuth,getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireAuthModule} from "@angular/fire/compat/auth";
import { provideStorage,getStorage } from '@angular/fire/storage';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { AngularFireStorageModule, BUCKET  } from '@angular/fire/compat/storage';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';

// Angular Material imports
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";

// Component imports
import { AppComponent } from './app.component';
// Pages
import { ContactComponent } from './pages/contact/contact.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AddNewProductComponent } from './pages/add-new-product/add-new-product.component';
import { RudCollectionComponent } from './pages/rud-collection/rud-collection.component';
import { ConcreteProductPageComponent } from './pages/concrete-product-page/concrete-product-page.component';

// Components
import { ProductComponent } from './components/product/product.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CommonsHeaderComponent } from './components/commons-header/commons-header.component';
import { CommonsFooterComponent } from './components/commons-footer/commons-footer.component';
import { ProductLoaderComponent } from './components/product-loader/product-loader.component';
import { InfoMessagePopupComponent } from './components/info-message-popup/info-message-popup.component';
import { UserModificationPopupComponent } from './components/user-modification-popup/user-modification-popup.component';
import { HomePageWelcomingButtonsComponent } from './components/home-page-welcoming-buttons/home-page-welcoming-buttons.component';
import { ModifyElementModalViewComponent } from './pages/rud-collection/modify-element-modal-view/modify-element-modal-view.component';
import { HomePageTrendingCategoriesComponent } from './components/home-page-trending-categories/home-page-trending-categories.component';
import { HeaderResponsiveDialogComponent } from './components/commons-header/header-responsive-dialog/header-responsive-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CommonsHeaderComponent,
    CommonsFooterComponent,
    HomePageComponent,
    HomePageWelcomingButtonsComponent,
    HomePageTrendingCategoriesComponent,
    ProductLoaderComponent,
    UserLoginComponent,
    AddNewProductComponent,
    CategoryPageComponent,
    RudCollectionComponent,
    ModifyElementModalViewComponent,
    UserRegisterComponent,
    HeaderResponsiveDialogComponent,
    InfoMessagePopupComponent,
    UserModificationPopupComponent,
    ProfilePageComponent,
    AboutUsPageComponent,
    ProductComponent,
    ConcreteProductPageComponent,
    ShoppingCartComponent,
    ContactComponent,
    CartProductComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
    UserTrackingService,
    ScreenTrackingService,
    //{ provide: BUCKET, useValue: 'default' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

