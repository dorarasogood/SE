import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { BodyObservationService } from '../body-observation.service';

export interface ObservationItem {
  // subject: string;
  item: string;
  unit: string;
}

@Component({
  selector: 'app-observation-item',
  templateUrl: './observation-item.component.html',
  styleUrls: ['./observation-item.component.css']
})

export class ObservationItemComponent implements OnInit {
  @ViewChild(MatTable, {static:false}) table : MatTable<ObservationItem>;
  displayedColumns: string[] = ['select', 'item', 'unit'];
  dataSource;
  editDisabled = true;
  readDisabled = true;
  item: string;
  unit: string;

  private currentSelectedRow = null;
  currentCheckedValue = null;

  constructor(private ren: Renderer2, private bodyObservationService: BodyObservationService) { 
    bodyObservationService.getAllObservationItem( data => {
      this.dataSource = new MatTableDataSource<ObservationItem>([]);
      data["entry"].forEach(element => {
        this.setObservationItem(element["resource"]);
      });
    }, this.failureCallback);
  }

  private failureCallback(error){
    console.log("error = ", error);
  }

  setObservationItem(observationItem){
    let item = "無";
    let unit = "無";
    // let id = -1;

    // if(observation.hasOwnProperty("id")){
    //   id = observation['id'];
    // }
    if(observationItem.hasOwnProperty("code") && observationItem["code"].hasOwnProperty("text") ){
      // if(observation["code"].hasOwnProperty("coding")){
        // if(observation["code"]["coding"].hasOwnProperty("display"))
          item = observationItem["code"]["text"];
      // }
    }
    if(observationItem.hasOwnProperty("valueQuantity")){
      if(observationItem["valueQuantity"].hasOwnProperty("unit"))
        unit = observationItem["valueQuantity"]["unit"];
    }

    let ob = {
      'item': item,
      'unit': unit,
    }
    this.dataSource.data.push(ob);
  }

  checkState(el, row) {
    setTimeout(() => {
      if (this.currentCheckedValue && this.currentCheckedValue === el.value) {
        el.checked = false;
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-program-focused');
        this.currentCheckedValue = null;
        this.currentSelectedRow = null;
        // this.enableButtonBySelectData(false);
      } else {
        this.currentCheckedValue = el.value;
        this.currentSelectedRow = row;
        console.log("AAA", this.currentSelectedRow);
        // this.enableButtonBySelectData(true);
      }
      
    })
  }

  ngOnInit() {
  }

}