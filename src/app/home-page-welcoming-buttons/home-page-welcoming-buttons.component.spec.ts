import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageWelcomingButtonsComponent } from './home-page-welcoming-buttons.component';

describe('HomePageWelcomingButtonsComponent', () => {
  let component: HomePageWelcomingButtonsComponent;
  let fixture: ComponentFixture<HomePageWelcomingButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageWelcomingButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageWelcomingButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
