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
            minRotation: 90,
            reverse: true,
          },
        }
      ]
    },
    // plugins: {
    //   zoom: {
    //     pan: {
    //       enabled: true,
    //       mode: 'x',
    //       overScaleMode: 'x',
    //       threshold: 10,
    //       rangeMin: {
    //         x: null,
    //       },
    //       rangeMax: {
    //         x: null,
    //       },
    //     },
    //     zoom: {
    //       enabled: true,
    //       drag: true,
    //       mode: 'x',
    //       overScaleMode: 'x',
    //       speed: 0.1,
    //       threshold: 2,
    //       sensitivity: 3,
    //       rangeMin: {
    //         x: null,
    //       },
    //       rangeMax: {
    //         x: null,
    //       },
    //     }
    //   }
    // },
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
        const orderedEntries = entries;
        const buyData = [
          {
            data: orderedEntries.map(d => d.buy_price),
            label: 'Buy price',
            pointRadius: 0,
            fill: false,
            borderWidth: 3,
            backgroundColor: 'rgba(255,0,0,0.3)',
          }
        ];
        const sellData = [
          {
            data: orderedEntries.map(d => d.sell_price),
            label: 'Sell price',
            pointRadius: 0,
            fill: false,
            borderWidth: 3,
            backgroundColor: 'rgba(255,0,0,0.3)',
          }
        ];
        const labels = orderedEntries.map(d => new Date(d.date));
        this.initBuyChart(labels, buyData);
        this.initSellChart(labels, sellData);
      }
    });
  }

  initBuyChart(labels, datasets) {
    let ctx: any = document.getElementById("buy-chart");
    this.buyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets,
      },
      options: this.lineChartOptions
    });
    const context = this.buyChart.ctx;
    const gradientStroke = context.createLinearGradient(2000, 0, 100, 0);
    gradientStroke.addColorStop(0, "#34eb95");
    gradientStroke.addColorStop(1, "#02dbeb");
    this.buyChart.data.datasets[0].borderColor = gradientStroke;
    this.buyChart.chart.update();
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
    const context = this.sellChart.ctx;
    const gradientStroke = context.createLinearGradient(2000, 0, 100, 0);
    gradientStroke.addColorStop(0, "#eb7734");
    gradientStroke.addColorStop(1, "#e3dd30");
    this.sellChart.data.datasets[0].borderColor = gradientStroke;
    this.sellChart.chart.update();
  }

  resetBuyChartZoom() {
    this.buyChart.resetZoom();
  }

  resetSellChartZoom() {
    this.sellChart.resetZoom();
  }
}
