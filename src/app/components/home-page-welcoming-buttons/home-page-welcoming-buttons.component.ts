import { Component, OnInit } from '@angular/core';
import { CustomUtilsService } from 'src/app/services/customUtils.service';

@Component({
  selector: 'app-home-page-welcoming-buttons',
  templateUrl: './home-page-welcoming-buttons.component.html',
  styleUrls: ['./home-page-welcoming-buttons.component.css']
})
export class HomePageWelcomingButtonsComponent implements OnInit {

  constructor(
    private utils: CustomUtilsService
  ) { }

  ngOnInit(): void {
  }

  setCategory(category: string) {
    this.utils.setCategory(category);
  }
}
