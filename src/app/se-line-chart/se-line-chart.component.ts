import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-se-line-chart',
  templateUrl: './se-line-chart.component.html',
  styleUrls: ['./se-line-chart.component.css']
})
export class SeLineChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { 
      data: [70, 69, 70, 69, 70, 69, 60, 80], 
      label: 'Body Observation' 
    }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,0,0)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

}
