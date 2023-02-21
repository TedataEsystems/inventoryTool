import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { NotificationService } from 'src/app/shared/service/notification.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit ,AfterViewInit {
  TotalNumorderStat:number=0;
  TotalNumReceiptStat:number=0;
  TotalNumR:number=0;
  Total:number=0;
  TotalinvenStat:number=0;
  count:number=0;
  userRole= localStorage.getItem('userGroup');

  ternumber:number=0;
  sennumber:number=0;
  tefnumber:number=0;



 constructor(
    //private hardwareService:HardwareService,
    public notificationService: NotificationService,
    private loader:LoaderService,
   // public service:EmpService ,
    private titleService:Title,private dashboard:DashboardService,private router:Router ){

    this.titleService.setTitle("Home");
    this.loader.busy();

  }


  ngAfterViewInit() {
    setTimeout(()=>this.loader.idle(),1000)

  }



  /////////////////donut chart//////////////////
  doughnutChartOptions:ChartOptions = {
    responsive: true,
    legend: {
      position: 'left'
   }

  };

  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    []
  ];
  doughnutChartLabelsp: Label[] = [];
  doughnutChartDatap: MultiDataSet = [
    []
  ];

  doughnutChartLabelsps: Label[] = [];
  doughnutChartDataps: MultiDataSet = [
    []
  ];
  doughnutChartType: ChartType = 'doughnut';
  colors: Color[] = [
    {
      backgroundColor: [
        '#8e2279',
        '#80868b',
      '#d7d7d7',
"#0f1323",
 "#1b3c51",
 "#791a75",

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
  ngOnInit(){
  
this.dashboard.GetReceviedStatusChart().subscribe(res=>
{
//  console.log(res.key,"Firstkey");
//  console.log(res.val,"Firstval");
this.doughnutChartLabelsp=res.key;
this. doughnutChartDatap=res.val;
for(var val of res.val)
{
if(val>0){
this.TotalNumorderStat +=val;
}
}

}

)

this.dashboard.GetOutgoingStatusChart().subscribe(res=>
{

  // console.log(res.key,"key");
  //  console.log(res.val,"val");
  this.doughnutChartLabels=res.key;
  this. doughnutChartData=res.val;
  for(var val of res.val)
{
  if(val>0){
    this.TotalNumReceiptStat +=val;
  }
}
})



this.dashboard.GetTotalChart().subscribe(res=>
  {
    //debugger
    //console.log("tt",this.TotalNumorderStat);
   // console.log("tt",this.TotalNumReceiptStat);
    // console.log(res.val,"val");
    this.doughnutChartLabelsps=res.key;
this. doughnutChartDataps=res.val;

this.TotalNumR = res.val[0];
this.TotalinvenStat =(res.val[0])-(res.val[1] );

  })



 }//oninit


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

