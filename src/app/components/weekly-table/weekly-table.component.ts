import { Component, Input, OnInit } from '@angular/core';
import { DailyDataModel } from '../../models/daily-data.model';
import { TodaySummaryModel } from '../../models/weekly-comparison.model';

@Component({
  selector: 'app-weekly-table',
  templateUrl: './weekly-table.component.html',
  styleUrls: ['./weekly-table.component.scss'],
})
export class WeeklyTableComponent implements OnInit {
  @Input() weeklyData: DailyDataModel[];
  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
