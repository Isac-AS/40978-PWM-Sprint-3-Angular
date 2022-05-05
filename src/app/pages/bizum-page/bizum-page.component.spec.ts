import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizumPageComponent } from './bizum-page.component';

describe('BizumPageComponent', () => {
  let component: BizumPageComponent;
  let fixture: ComponentFixture<BizumPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BizumPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BizumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
