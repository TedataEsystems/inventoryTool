import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  constructor(private titleService:Title)

  {

    this.titleService.setTitle("Home");

  }
  ngOnInit(){

  }

  /////////////////donut chart//////////////////
  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartLabelsp: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartDatap: MultiDataSet = [
    [55, 25, 20]
  ];
  // doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  // doughnutChartData: MultiDataSet = [
  //   [55, 25, 20]
  // ];
  doughnutChartType: ChartType = 'doughnut';
  colors: Color[] = [
    {
      backgroundColor: [
      '#d7d7d7',
      '#80868b',
        '#8e2279',
        'blue', 'red','pink','orange','purple','brown','DeepPink','DarkOrange'
      ]
    }
  ];

  doughnutChartPlugins = [{
    afterLayout: function (chart:any) {
      chart.legend.legendItems.forEach(
        (label:any) => {
          let value = chart.data.datasets[0].data[label.index];

          label.text += ' ' + value;
          return label;
        }
      )
    }
  }];



//////////line chart//////////////////////
lineChartData: ChartDataSets[] = [
  { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
];

lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

 lineChartOptions:ChartOptions = {
  responsive: true,
};

 lineChartColors: Color[] = [
  {
    borderColor: 'black',
    backgroundColor: 'rgba(255,255,0,0.28)',
  },
];

 lineChartLegend = true;
 lineChartPlugins = [];
 lineChartType:ChartType = 'line';



/////////bar chart/////////////////////////
barChartOptions: ChartOptions = {

  responsive: true,
};
barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];
// barcolors: Color[] = [
//   {
//     backgroundColor: [
//     'red',
//     'orange',
//     'grey'
//     ]
//   }
// ];

public barcolors: Array<any> = [
  { // first color
    backgroundColor: 'red',

  },
  { // second color
    backgroundColor: 'orange',

  },
{
  // thirdcolor
  backgroundColor: 'grey',

}];
public barChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Evaluator' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Required' },
  { data: [11, 60, 20, 20, 80, 11, 70], label: 'Average' }
];



}
