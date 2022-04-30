import { Component, OnInit } from '@angular/core';
import { CustomUtilsService } from 'src/app/services/customUtils.service';

@Component({
  selector: 'app-home-page-trending-categories',
  templateUrl: './home-page-trending-categories.component.html',
  styleUrls: ['./home-page-trending-categories.component.css']
})
export class HomePageTrendingCategoriesComponent implements OnInit {

  constructor(
    private utils: CustomUtilsService
  ) { }

  ngOnInit(): void {
  }

  setCategory(category: string) {
    this.utils.setCategory(category);
  }

}
