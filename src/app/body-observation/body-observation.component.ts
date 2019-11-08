import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface Observation {
  subject: string;
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
  observations: Observation[] = [];
  displayedColumns: string[] = ['select', 'subject', 'type', 'value', 'unit'];
  dataSource;

  selection = new SelectionModel<Observation>(true, []);

  currentCheckedValue = null;

  constructor(private http: HttpClient, private ren: Renderer2) { 
    this.http.get("http://hapi.fhir.org/baseR4/Observation?_pretty=true")
    .subscribe( data => {
      data["entry"].forEach(element => {
        this.setObservation(element["resource"]);
      });
      this.dataSource = new MatTableDataSource<Observation>(this.observations);
      this.dataSource.data.splice(this.dataSource.data.length - 1, 1);
    });
  }

  

  setObservation(observation){
    let subject = "無";
    let type = "無";
    let value = 0;
    let unit = "無";
    if(observation.hasOwnProperty("subject")){
      if(observation["subject"].hasOwnProperty("display"))
        subject = observation["subject"]["display"];
    }
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
      'subject': subject,
      'type': type,
      'value': value,
      'unit': unit
    }
    this.observations.push(ob);
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  toggle(row){
    this.selection.clear();
    this.selection.select(row);
  }

  checkState(el) {
    setTimeout(() => {
      if (this.currentCheckedValue && this.currentCheckedValue === el.value) {
        el.checked = false;
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-program-focused');
        this.currentCheckedValue = null;
      } else {
        this.currentCheckedValue = el.value;
      }
    })
  }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: Observation): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }


  ngOnInit() {
  }

}
