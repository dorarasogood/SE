import { Component, OnInit } from '@angular/core';
import { DiagnosisDataModel, DiagnosisData } from "./diagnosis_data_model";

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

  constructor() { }

  diagnosisDataModel = new DiagnosisDataModel();

  getDiagnosisData(){
    return this.diagnosisDataModel.items;
  }

  ngOnInit() {
  }

}
