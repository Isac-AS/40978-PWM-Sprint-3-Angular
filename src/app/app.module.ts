import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonsHeaderComponent } from './commons-header/commons-header.component';
import { CommonsFooterComponent } from './commons-footer/commons-footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageWelcomingButtonsComponent } from './home-page-welcoming-buttons/home-page-welcoming-buttons.component';
import { HomePageTrendingCategoriesComponent } from './home-page-trending-categories/home-page-trending-categories.component';
import { ProductLoaderComponent } from './product-loader/product-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    CommonsHeaderComponent,
    CommonsFooterComponent,
    HomePageComponent,
    HomePageWelcomingButtonsComponent,
    HomePageTrendingCategoriesComponent,
    ProductLoaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
