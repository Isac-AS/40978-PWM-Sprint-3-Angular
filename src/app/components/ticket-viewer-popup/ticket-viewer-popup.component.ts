import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from 'src/app/models/interfaces';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-ticket-viewer-popup',
  templateUrl: './ticket-viewer-popup.component.html',
  styleUrls: ['./ticket-viewer-popup.component.css']
})
export class TicketViewerPopupComponent implements OnInit {

  constructor(
    public database: DatabaseService,
    public dialogRef: MatDialogRef<TicketViewerPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public ticket: Ticket
  ) { }

  ngOnInit(): void {
  }

}
