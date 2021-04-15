import { Component, OnInit } from '@angular/core';
import { ComparisonDataModel } from 'src/app/models/comparison-data.model';
import { WeeklyComparisonModel } from 'src/app/models/weekly-comparison.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data: any;
  buyData: ComparisonDataModel;
  sellData: ComparisonDataModel;
  weeklyData: WeeklyComparisonModel;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getWeeklyData().subscribe((data: any) => {
      this.data = data;
      this.buyData = { label: 'Buy price', price: data.entry.buy_price, percent: data.buy_percent };
      this.sellData = { label: 'Sell price', price: data.yesterday_entry.sell_price, percent: data.sell_percent };
      this.weeklyData = data.week_entries;
    });
  }

}
