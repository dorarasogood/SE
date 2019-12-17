import { Component, NgModule } from '@angular/core';
import { multi } from './data';
import item from '../body-observation/item';
import {BodyObservationService } from '../body-observation.service'

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  multi: any[];
  view: any[] = [900, 520];

  itemOption: item[] = [];
  selectedType = "";
  selected = null;
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private bodyObservationService: BodyObservationService) {
    this.bodyObservationService.getAllObservationItem((data)=>{
      if(data.hasOwnProperty("entry")){
        this.setObservationItem(data["entry"]);
      }
    },()=>{});
    Object.assign(this, {multi});
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  setObservationItem(itemSource):void{
    itemSource.forEach((item)=>{
      this.itemOption.push({
        id: item.resource.id,
        type: item.resource.code.text,
        unit: item.resource.valueQuantity.unit
      });
    });
  }

  generateDisabled(): boolean{
    console.log("aaa", this.selected, this.selectedType);
    if(this.selected !=null && this.selectedType != ""){
      
      return false;
    }else 
      return true;
  }
}