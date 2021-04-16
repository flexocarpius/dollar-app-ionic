import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartDataSets } from 'chart.js';
import { loadAllEntries } from '../../store/actions/entries.actions';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  public buyData: ChartDataSets[];
  public sellData: any;
  public lineChartLabels: any;
  public lineChartOptions: (any & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [
        { display: false }
      ]
    }
  };
  public lineChartColors: any = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadAllEntries());
    this.store.select(state => state.entries).subscribe(({ loading, entries }) => {
      if (!loading && entries) {
        const reversed = entries.slice().reverse();
        this.buyData = [
          {
            data: reversed.map(d => d.buy_price),
            label: 'Buy price',
            pointRadius: 0,
          }
        ];
        this.sellData = [
          {
            data: reversed.map(d => d.sell_price),
            label: 'Sell price',
            pointRadius: 0,
            borderColor: 'green'
          }
        ];
        this.lineChartLabels = reversed.map(d => d.date)
      }
    });
  }

}
