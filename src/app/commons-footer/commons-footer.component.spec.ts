import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonsFooterComponent } from './commons-footer.component';

describe('CommonsFooterComponent', () => {
  let component: CommonsFooterComponent;
  let fixture: ComponentFixture<CommonsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonsFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
