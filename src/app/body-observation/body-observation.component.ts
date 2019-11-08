import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData, DialogOverviewExampleDialog} from './body-observation-detail.component'

export interface Observation {
  // subject: string;
  type: string;
  value: number;
  unit: string;
}

@Component({
  selector: 'app-body-observation',
  templateUrl: './body-observation.component.html',
  styleUrls: ['./body-observation.component.css']
})
export class BodyObservationComponent implements OnInit {
  @ViewChild(MatTable, {static:false}) table : MatTable<Observation>;
  observations: Observation[] = [];
  displayedColumns: string[] = ['select', 'type', 'value', 'unit'];
  dataSource;
  editDisabled = true;
  readDisabled = true;
  deleteDisabled = true;
  value: number;
  unit: string;

  private currentSelectedRow = null;

  currentCheckedValue = null;
  ngOnInit() {}
  constructor(private http: HttpClient, private ren: Renderer2, public dialog: MatDialog) { 
    this.http.get("http://hapi.fhir.org/baseR4/Observation?patient=56899&_pretty=true")
    .subscribe( data => {
      console.log("AAA000", data);
      data["entry"].forEach(element => {
        this.setObservation(element["resource"]);
      });
      this.dataSource = new MatTableDataSource<Observation>(this.observations);
      // this.dataSource.data.splice(this.dataSource.data.length - 1, 1);
    });
  }

  setObservation(observation){
    console.log("AAA001", observation);
    // let subject = "無";
    let type = "無";
    let value = 0;
    let unit = "無";
    // if(observation.hasOwnProperty("subject")){
    //   if(observation["subject"].hasOwnProperty("display"))
    //     subject = observation["subject"]["display"];
    // }
    if(observation.hasOwnProperty("code")){
      if(observation["code"].hasOwnProperty("coding")){
        if(observation["code"]["coding"].hasOwnProperty("display"))
          type = observation["code"]["coding"]["display"];
      }
    }
    if(observation.hasOwnProperty("valueQuantity")){
      if(observation["valueQuantity"].hasOwnProperty("value"))
        value = observation["valueQuantity"]["value"];
      if(observation["valueQuantity"].hasOwnProperty("unit"))
        unit = observation["valueQuantity"]["unit"];
    }
    let ob = {
      // 'subject': subject,
      'type': type,
      'value': value,
      'unit': unit
    }
    this.observations.push(ob);
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
    let index = this.dataSource.data.findIndex((element)=>{
      return element === this.currentSelectedRow;
    })
    this.currentSelectedRow = null;
    this.dataSource.data.splice(index, 1);
    this.table.renderRows();
    this.enableButtonBySelectData(false);
  }

  clickNew(){
    
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '500px',
        data: {value: this.value, unit: this.unit}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        this.http.get("http://hapi.fhir.org/baseR4/Observation/" + result + "?_pretty=true")
        .subscribe((data)=>{
          let type = "無";
          let value = 0;
          let unit = "無";
          
          if(data.hasOwnProperty("valueQuantity")){
            if(data["valueQuantity"].hasOwnProperty("value"))
              value = data["valueQuantity"]["value"];
            if(data["valueQuantity"].hasOwnProperty("unit"))
              unit = data["valueQuantity"]["unit"];
          }
          let obj = {
            'type': type,
            'value': value,
            'unit': unit
          }
          this.dataSource.data.push(obj);
          this.table.renderRows();
        });
      });

    
  }

  
}
