import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DailyDataModel } from '../../models/daily-data.model';

@Component({
  selector: 'app-weekly-table',
  templateUrl: './weekly-table.component.html',
  styleUrls: ['./weekly-table.component.scss'],
})
export class WeeklyTableComponent implements OnInit {
  @Input() weeklyData: DailyDataModel[];
  @Input() loading: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewAllClick() {
    this.router.navigate(['/tabs/history']);
  }

}
