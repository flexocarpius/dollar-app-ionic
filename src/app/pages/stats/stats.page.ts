import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Chart from 'chart.js';
import { loadAllEntries } from '../../store/actions/entries.actions';
import { AppState } from '../../store/app.state';
import * as d3 from 'd3';
import { EntryModel } from 'src/app/models/entry.model';

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
    tooltips: {
      mode: 'nearest',
      intersect: false,
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
  svg: any;
  d3Width: any;
  d3Height: any;
  buyChartWidth: number;
  sellChartWidth: number;
  buyChartStyle: any;
  sellChartStyle: any;

  constructor(private store: Store<AppState>) { }

  createSvg() {
    const margin = {top: 10, right: 30, bottom: 30, left: 30};
    this.d3Width = 400 - margin.left - margin.right;
    this.d3Height = 400 - margin.top - margin.bottom;
    this.svg = d3.select("#buy-chart")
      .append("svg")
        .attr("width", this.d3Width + margin.left + margin.right)
        .attr("height", this.d3Height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  }

  initD3Chart(data: EntryModel[]) {
    // Add X axis --> it is a date format
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date).valueOf()))
      .range([ 0, this.d3Width ]);
    this.svg.append("g")
      .attr("transform", "translate(0," + this.d3Height + ")")
      .call(d3.axisBottom(x));

    // Max value observed:
    const max = d3.max(data, d => d.buy_price);

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, max])
      .range([ this.d3Height, 0 ]);
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Set the gradient
    this.svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", y(0))
      .attr("x2", 0)
      .attr("y2", y(max))
      .selectAll("stop")
        .data([
          {offset: "0%", color: "blue"},
          {offset: "100%", color: "red"}
        ])
      .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

    // Add the line
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)" )
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(d => x(new Date(d.date).valueOf()))
        .y(d => y(d.buy_price))
        );
  }

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
    this.buyChartWidth = datasets[0].data.length;
    this.buyChartStyle = { width: `${this.buyChartWidth}px` };
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
    const gradientStroke = context.createLinearGradient(0, 0, 0, 400);
    gradientStroke.addColorStop(0, "#34eb95");
    gradientStroke.addColorStop(1, "#02dbeb");
    this.buyChart.data.datasets[0].borderColor = gradientStroke;
    this.buyChart.chart.update();
  }

  initSellChart(labels, datasets) {
    this.sellChartWidth = datasets[0].data.length;
    this.sellChartStyle = { width: `${this.sellChartWidth}px` };
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
