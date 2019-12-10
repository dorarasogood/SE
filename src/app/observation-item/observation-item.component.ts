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
  displayedColumns: string[] = ['item', 'unit'];
  dataSource;
  editDisabled = true;
  readDisabled = true;
  item: string;
  unit: string;

  constructor(private ren: Renderer2, private bodyObservationService: BodyObservationService) { 
    bodyObservationService.getAllObservationItem( data => {
      // this.dataSource = new MatTableDataSource<ObservationItem>([]);
      // data["entry"].forEach(element => {
      //   this.setObservation(element["resource"]);
      // });
    }, this.failureCallback);
  }

  private failureCallback(error){
    console.log("error = ", error);
  }

  ngOnInit() {
  }

}
