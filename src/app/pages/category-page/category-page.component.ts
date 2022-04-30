import { Component, OnInit } from '@angular/core';
import { CustomUtilsService } from 'src/app/services/customUtils.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  category: string;

  constructor(
    private utils: CustomUtilsService
  ) { 
    this.category = this.utils.getCategory();
  }

  ngOnInit(): void {
  }

}
