import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComparisonDataModel } from '../../models/comparison-data.model';
import { DailyDataModel } from '../../models/daily-data.model';
import { loadTodaySummary } from '../../store/actions/entries.actions';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  buyData: ComparisonDataModel;
  sellData: ComparisonDataModel;
  weeklyData: DailyDataModel[];
  loading: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadTodaySummary());
    this.store.select(state => state.entries).subscribe((state) => {
      const { loading, summary } = state;
      this.loading = loading;
      if (!loading && summary) {
        this.buyData = { label: 'Buy price', price: summary.entry.buy_price, percent: summary.buy_percent };
        this.sellData = { label: 'Sell price', price: summary.yesterday_entry.sell_price, percent: summary.sell_percent };
        this.weeklyData = summary.week_entries;
      }
    });
  }

}
