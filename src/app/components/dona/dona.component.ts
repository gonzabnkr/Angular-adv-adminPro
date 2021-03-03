import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent{

  @Input() title = "Sin titulo"
  @Input('labels') doughnutChartLabels: Label[] = ['Label1','Label2','Label3']
  @Input('data') doughnutChartData: MultiDataSet = [[250, 130, 70]];
  public doughnutChartType: ChartType = 'doughnut';
  public colors : Color[]=[
    {backgroundColor:['#6857E6','#009FEE','#F02059']}
  ];


}
