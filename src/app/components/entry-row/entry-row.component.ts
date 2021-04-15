import { Component, Input, OnInit } from '@angular/core';
import { DailyDataModel } from 'src/app/models/daily-data.model';
import { EntryModel } from 'src/app/models/entry.model';

@Component({
  selector: 'app-entry-row',
  templateUrl: './entry-row.component.html',
  styleUrls: ['./entry-row.component.scss'],
})
export class EntryRowComponent implements OnInit {
  @Input() entry: DailyDataModel;

  constructor() { }

  ngOnInit() {}

}
