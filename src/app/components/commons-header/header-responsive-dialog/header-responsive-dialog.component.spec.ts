import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderResponsiveDialogComponent } from './header-responsive-dialog.component';

describe('HeaderResponsiveDialogComponent', () => {
  let component: HeaderResponsiveDialogComponent;
  let fixture: ComponentFixture<HeaderResponsiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderResponsiveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderResponsiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
