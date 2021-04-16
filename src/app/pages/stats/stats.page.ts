import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Chart from 'chart.js';
import { loadAllEntries } from '../../store/actions/entries.actions';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  buyChart: any;
  sellChart: any;
  lineChartOptions: (any & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    legend: false,
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
          },
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90
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
          rangeMin: {
            x: null,
          },
          rangeMax: {
            x: null,
          },
        },
        zoom: {
          enabled: true,
          drag: true,
          mode: 'x',
          overScaleMode: 'x',
          speed: 0.1,
          threshold: 2,
          sensitivity: 3,
          rangeMin: {
            x: null,
          },
          rangeMax: {
            x: null,
          },
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
  loading: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadAllEntries());
    this.store.select(state => state.entries).subscribe(({ loading, entries }) => {
      this.loading = loading;
      if (!loading && entries) {
        const reversed = entries.slice().reverse();
        const buyData = [
          {
            data: reversed.map(d => d.buy_price),
            label: 'Buy price',
            pointRadius: 0,
            fill: false,
            borderWidth: 3,
            borderColor: 'rgb(52, 235, 149)',
            backgroundColor: 'rgba(255,0,0,0.3)',
          }
        ];
        const sellData = [
          {
            data: reversed.map(d => d.sell_price),
            label: 'Sell price',
            pointRadius: 0,
            fill: false,
            borderWidth: 3,
            borderColor: 'rgb(235, 119, 52)',
            backgroundColor: 'rgba(255,0,0,0.3)',
          }
        ];
        const labels = reversed.map(d => new Date(d.date));
        this.initBuyChart(labels, buyData);
        this.initSellChart(labels, sellData);
      }
    });
  }

  initBuyChart(labels, datasets) {
    let ctx = document.getElementById("buy-chart") as HTMLCanvasElement;
    this.buyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets,
      },
      options: this.lineChartOptions
    });
  }

  initSellChart(labels, datasets) {
    let ctx = document.getElementById("sell-chart") as HTMLCanvasElement;
    this.sellChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets,
      },
      options: this.lineChartOptions
    });
  }

  resetBuyChartZoom() {
    this.buyChart.resetZoom();
  }

  resetSellChartZoom() {
    this.sellChart.resetZoom();
  }
}
