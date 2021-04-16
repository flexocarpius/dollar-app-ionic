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
  public buyData: any[];
  public sellData: any[];
  public lineChartLabels: any;
  public lineChartOptions: (any & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        { 
          type: 'time',
          display: true,
          position: 'bottom',
          time: {
            displayFormats: { 'day': 'MM/YYYY' },
            tooltipFormat: 'DD/MM/YYYY',
            unit: 'month'
          }
        }
      ]
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          overScaleMode: 'x',
          threshold: 10,
        },
        zoom: {
          enabled: true,
          drag: true,
          mode: 'x',
          overScaleMode: 'x',
          threshold: 2,
          sensitivity: 3,
        }
      }
    },
    transitions: {
      zoom: {
        animation: {
          duration: 1000,
          easing: 'easeOutCubic'
        }
      }
    }
  };
  public buyLineChartColors: any = [
    {
      borderColor: 'rgb(52, 235, 149)',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public sellLineChartColors: any = [
    {
      borderColor: 'rgb(235, 119, 52)',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  loading: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadAllEntries());
    this.store.select(state => state.entries).subscribe(({ loading, entries }) => {
      this.loading = loading;
      if (!loading && entries) {
        const reversed = entries.slice().reverse();
        this.buyData = [
          {
            data: reversed.map(d => d.buy_price),
            label: 'Buy price',
            pointRadius: 0,
            fill: false,
            borderWidth: 3,
          }
        ];
        this.sellData = [
          {
            data: reversed.map(d => d.sell_price),
            label: 'Sell price',
            pointRadius: 0,
            fill: false,
            borderWidth: 3,
          }
        ];
        this.lineChartLabels = reversed.map(d => new Date(d.date))
      }
    });
  }

}
