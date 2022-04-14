import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonsHeaderComponent } from './commons-header.component';

describe('CommonsHeaderComponent', () => {
  let component: CommonsHeaderComponent;
  let fixture: ComponentFixture<CommonsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
