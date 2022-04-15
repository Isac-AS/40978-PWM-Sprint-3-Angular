// Basic imports
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
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
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { AddNewProductComponent } from './pages/add-new-product/add-new-product.component';
import { RudCollectionComponent } from './pages/rud-collection/rud-collection.component';
// Components
import { CommonsHeaderComponent } from './components/commons-header/commons-header.component';
import { CommonsFooterComponent } from './components/commons-footer/commons-footer.component';
import { ProductLoaderComponent } from './components/product-loader/product-loader.component';
import { ModifyElementModalViewComponent } from './components/modify-element-modal-view/modify-element-modal-view.component';
import { HomePageWelcomingButtonsComponent } from './components/home-page-welcoming-buttons/home-page-welcoming-buttons.component';
import { HomePageTrendingCategoriesComponent } from './components/home-page-trending-categories/home-page-trending-categories.component';
import { HeaderResponsiveDialogComponent } from './components/commons-header/header-responsive-dialog/header-responsive-dialog.component';



// @ts-ignore
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
    HeaderResponsiveDialogComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
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
    MatFormFieldModule
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

