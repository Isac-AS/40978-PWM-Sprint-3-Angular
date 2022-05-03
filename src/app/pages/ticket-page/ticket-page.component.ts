import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {MessagePopupPair, Ticket} from "../../models/interfaces";
import { InfoMessagePopupComponent } from "../../components/info-message-popup/info-message-popup.component";
import { MatDialog } from "@angular/material/dialog";
import { CustomUtilsService } from "../../services/customUtils.service";
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.css']
})
export class TicketPageComponent implements OnInit {

  private path: string = 'tickets';

  ticket = this.fb.group({
    name : ['', [Validators.required]],
    email : ['', [Validators.required, Validators.email]],
    reason : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    messageText : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
  })

  databaseElement: Ticket = {

    id: '',
    name: '',
    email: '',
    subject: '',
    messageText: ''

  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private database: DatabaseService,
    private utils: CustomUtilsService
  ) { }

  ngOnInit(): void {}

  onSubmit() {

    this.databaseElement.name = this.ticket.value.name;
    this.databaseElement.email = this.ticket.value.email;
    this.databaseElement.subject = this.ticket.value.reason;
    this.databaseElement.messageText = this.ticket.value.messageText;
    this.save();

  }

  save() {

    const data = this.databaseElement;
    data.id = this.database.createId();
    this.database.createDocument<Ticket>(data, this.path, data.id).then(async (_)=> {
      await this.utils.openMessageDialog({
        message: 'Consulta enviada. Se le atenderá con la mayor brevedad posible',
        status: true
      })
    });

    this.ticket.reset()

  }
}
