import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { LineChartService } from './line-chart.service';
import { transactionReport } from './transaction-report-data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[];
  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'rgba(17, 121, 226, 1)',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'rgba(17, 121, 226, 1)',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(74, 241, 80, .2)',
      borderColor: 'rgba(74, 241, 80, 1)',
      pointBackgroundColor: 'rgba(74, 241, 80, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(74, 241, 80, 1)'
    },
    {
      backgroundColor: 'rgba(234, 39, 25, .2)',
      borderColor: 'rgba(234, 39, 25, 1)',
      pointBackgroundColor: 'rgba(234, 39, 25, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(234, 39, 25, 1)'
    },
    {
      backgroundColor: 'rgba(251, 19, 255, .2)',
      borderColor: 'rgba(251, 19, 255, 1)',
      pointBackgroundColor: 'rgba(251, 19, 255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(251, 19, 255, 1)'
    }
  ];
  lineChartLegend = false;
  lineChartType = 'line';
  lineChartPlugins = [pluginAnnotations];

  transactionReport: any = transactionReport;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private lineChartService: LineChartService) { }

  ngOnInit() {
    const fiveDay = this.transactionReport.five_day;

    const dailyTotals = fiveDay.map(group => {
      return group.total;
    });

    this.lineChartData.push({
      data: dailyTotals,
      label: 'Five Day Report'
    });

    this.lineChartLabels = fiveDay.map(group => {
      return group.day;
    });
  }

  // async getTransactionReport() {
  //   this.transactionReport = await this.lineChartService.getTransactionReport();
  //   console.log(this.transactionReport);
  // }

  randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  changeColor() {
    this.lineChartColors[2].borderColor = `rgb(239, 107, 53)`;
    this.lineChartColors[2].backgroundColor = `rgb(239, 107, 53)`;
  }

  changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
}
