import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { CommonsHeaderComponent } from './components/commons-header/commons-header.component';
import { CommonsFooterComponent } from './components/commons-footer/commons-footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomePageWelcomingButtonsComponent } from './components/home-page-welcoming-buttons/home-page-welcoming-buttons.component';
import { HomePageTrendingCategoriesComponent } from './components/home-page-trending-categories/home-page-trending-categories.component';
import { ProductLoaderComponent } from './components/product-loader/product-loader.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { AddNewProductComponent } from './pages/add-new-product/add-new-product.component';

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
    AddNewProductComponent
  ],
  imports: [
    BrowserModule,
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
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
      {path: 'addNewProduct', component: AddNewProductComponent},
      {path: 'login', component: UserLoginComponent}
    ])
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
