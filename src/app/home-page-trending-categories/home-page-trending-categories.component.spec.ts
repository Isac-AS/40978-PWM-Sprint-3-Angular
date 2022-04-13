import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageTrendingCategoriesComponent } from './home-page-trending-categories.component';

describe('HomePageTrendingCategoriesComponent', () => {
  let component: HomePageTrendingCategoriesComponent;
  let fixture: ComponentFixture<HomePageTrendingCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageTrendingCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageTrendingCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
