import { Component, Input, OnInit } from '@angular/core';
import { WeeklyComparisonModel } from 'src/app/models/weekly-comparison.model';

@Component({
  selector: 'app-weekly-table',
  templateUrl: './weekly-table.component.html',
  styleUrls: ['./weekly-table.component.scss'],
})
export class WeeklyTableComponent implements OnInit {
  @Input() weeklyData: WeeklyComparisonModel;

  constructor() { }

  ngOnInit() {}

}
