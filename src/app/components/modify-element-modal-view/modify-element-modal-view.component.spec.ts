import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyElementModalViewComponent } from './modify-element-modal-view.component';

describe('ModifyElementModalViewComponent', () => {
  let component: ModifyElementModalViewComponent;
  let fixture: ComponentFixture<ModifyElementModalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyElementModalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyElementModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
