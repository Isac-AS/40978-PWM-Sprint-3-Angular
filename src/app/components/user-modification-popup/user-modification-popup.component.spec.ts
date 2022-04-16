import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModificationPopupComponent } from './user-modification-popup.component';

describe('UserModificationPopupComponent', () => {
  let component: UserModificationPopupComponent;
  let fixture: ComponentFixture<UserModificationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserModificationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
