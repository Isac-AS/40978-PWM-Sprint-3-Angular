import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcreteProductPageComponent } from './concrete-product-page.component';

describe('ConcreteProductPageComponent', () => {
  let component: ConcreteProductPageComponent;
  let fixture: ComponentFixture<ConcreteProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcreteProductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcreteProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
