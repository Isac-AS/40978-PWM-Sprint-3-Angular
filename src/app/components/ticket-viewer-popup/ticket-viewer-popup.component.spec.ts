import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketViewerPopupComponent } from './ticket-viewer-popup.component';

describe('TicketViewerPopupComponent', () => {
  let component: TicketViewerPopupComponent;
  let fixture: ComponentFixture<TicketViewerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketViewerPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
