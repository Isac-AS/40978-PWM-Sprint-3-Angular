import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RudCollectionComponent } from './rud-collection.component';

describe('RudCollectionComponent', () => {
  let component: RudCollectionComponent;
  let fixture: ComponentFixture<RudCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RudCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RudCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
