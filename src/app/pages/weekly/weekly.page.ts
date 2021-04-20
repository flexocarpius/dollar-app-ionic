import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Chart from 'chart.js';
import { DailyDataModel } from '../../models/daily-data.model';
import { loadTodaySummary } from '../../store/actions/entries.actions';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit {
  weeklyData: DailyDataModel[];
  lineChart: any;
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
    tooltips: {
      mode: 'nearest',
      intersect: false,
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
    this.store.dispatch(loadTodaySummary());
    this.store.select(state => state.entries).subscribe(({ loading, summary }) => {
      this.loading = loading;
      if (!loading && summary) {
        this.weeklyData = summary.week_entries;
        const orderedEntries = summary.week_entries;
        const buyData = [
          {
            data: orderedEntries.map(d => d.buy_percent.toFixed(4)),
            label: 'Buy percent',
            pointRadius: 0,
            fill: false,
            borderWidth: 3,
            borderColor: '#2fdf75',
            backgroundColor: '#2fdf75',
            tension: 0
          }
        ];
        const sellData = [
          {
            data: orderedEntries.map(d => d.sell_percent.toFixed(4)),
            label: 'Sell percent',
            pointRadius: 0,
            fill: false,
            borderWidth: 3,
            borderColor: '#ff4961',
            backgroundColor: '#ff4961',
            tension: 0
          }
        ];
        const labels = orderedEntries.map(d => new Date(d.entry.date));
        this.initLineChart(labels, [...buyData, ...sellData]);
      }
    });
  }

  initLineChart(labels, datasets) {
    let ctx: any = document.getElementById("line-chart");
    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets,
      },
      options: this.lineChartOptions
    });
  }

}
