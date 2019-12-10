import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {BodyObservationDetailDialog} from './body-observation-detail.component'
import { BodyObservationService } from '../body-observation.service';
import * as moment from 'moment';
export interface Observation {
  // subject: string;
  type: string;
  value: number;
  unit: string;
  id: number;
  date: string
}

@Component({
  selector: 'app-body-observation',
  templateUrl: './body-observation.component.html',
  styleUrls: ['./body-observation.component.css']
})
export class BodyObservationComponent implements OnInit {
  @ViewChild(MatTable, {static:false}) table : MatTable<Observation>;
  displayedColumns: string[] = ['select', 'type', 'value', 'unit', 'date'];
  dataSource;
  editDisabled = true;
  readDisabled = true;
  deleteDisabled = true;
  value: number;
  unit: string;

  selected = {start: moment(), end: moment()};
  locale = {
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    format: 'YYYY-MM-DD'
  }

  search(){
    var dateRange = {
      start: this.selected.start.format('YYYY-MM-DD'),
      end: this.selected.end.format('YYYY-MM-DD')
    }
    this.bodyObservationService.getAllObservation(dateRange, data => {
      this.dataSource = new MatTableDataSource<Observation>([]);
      data["entry"].forEach(element => {
        this.setObservation(element["resource"]);
      });
      this.table.renderRows();
    }, this.failureCallback);
  }



  private currentSelectedRow = null;

  currentCheckedValue = null;
  ngOnInit() {}
  constructor(private ren: Renderer2, public dialog: MatDialog, private bodyObservationService: BodyObservationService) { 
    var dateRange = {
      start: this.selected.start.format('YYYY-MM-DD'),
      end: this.selected.end.format('YYYY-MM-DD')
    }
    bodyObservationService.getAllObservation(dateRange, data => {
      this.dataSource = new MatTableDataSource<Observation>([]);
      data["entry"].forEach(element => {
        this.setObservation(element["resource"]);
      });
    }, this.failureCallback);
  }

  private failureCallback(error){
    console.log("error = ", error);
  }

  setObservation(observation){
    // console.log("AAA001", observation);
    let type = "無";
    let value = 0;
    let unit = "無";
    let id = -1;
    let date = "無";

    if(observation.hasOwnProperty("id")){
      id = observation['id'];
    }
    if(observation.hasOwnProperty("code") && observation["code"].hasOwnProperty("coding") && observation["code"]["coding"].hasOwnProperty("display")){
      // if(observation["code"].hasOwnProperty("coding")){
        // if(observation["code"]["coding"].hasOwnProperty("display"))
          type = observation["code"]["coding"]["display"];
      // }
    }
    if(observation.hasOwnProperty("valueQuantity")){
      if(observation["valueQuantity"].hasOwnProperty("value"))
        value = observation["valueQuantity"]["value"];
      if(observation["valueQuantity"].hasOwnProperty("unit"))
        unit = observation["valueQuantity"]["unit"];
    }

    if(observation.hasOwnProperty("effectiveDateTime")){
      console.log("1232154 ", observation["effectiveDateTime"]);
      date = observation["effectiveDateTime"];
    }
    let ob = {
      // 'subject': subject,
      'type': type,
      'value': value,
      'unit': unit,
      'id': id,
      'date': date
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
        this.enableButtonBySelectData(false);
      } else {
        this.currentCheckedValue = el.value;
        this.currentSelectedRow = row;
        console.log("AAA", this.currentSelectedRow);
        this.enableButtonBySelectData(true);
      }
      
    })
  }

  private enableButtonBySelectData(enable){
    this.readDisabled = !enable;
    this.editDisabled = !enable;
    this.deleteDisabled = !enable;
  }

  clickDelete(){
    this.bodyObservationService.deleteObservation(this.currentSelectedRow.id, data=>{
      let index = this.dataSource.data.findIndex((element)=>{
        return element === this.currentSelectedRow;
      })
      this.currentSelectedRow = null;
      this.dataSource.data.splice(index, 1);
      this.table.renderRows();
      this.enableButtonBySelectData(false);
    }, this.failureCallback);
  }

  clickNew(){
    const dialogRef = this.dialog.open(BodyObservationDetailDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      if(result === undefined) return;
      this.bodyObservationService.getObservation(result, 
        (data)=>{
          this.setObservation(data);
          this.table.renderRows();
        }, this.failureCallback);
    });
  }

  clickEdit(){
    const dialogRef = this.dialog.open(BodyObservationDetailDialog, {
      width: '500px',
      data: this.currentSelectedRow.id
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === undefined) return;
      // console.log('The dialog was closed', result);
      
        
          if(result.hasOwnProperty("valueQuantity")){
            if(result["valueQuantity"].hasOwnProperty("value"))
              this.currentSelectedRow.value = result["valueQuantity"]["value"];
            if(result["valueQuantity"].hasOwnProperty("unit"))
              this.currentSelectedRow.unit = result["valueQuantity"]["unit"];
          }

          if(result.hasOwnProperty("effectiveDateTime")){
            this.currentSelectedRow.date = result["effectiveDateTime"];
          }

          this.table.renderRows();
      
      
      });
  }
}
