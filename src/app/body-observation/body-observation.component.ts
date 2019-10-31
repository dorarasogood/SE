import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Observation {
  subject: string;
  type: string;
  value: number;
  unit: string;
}

const ELEMENT_DATA: Observation[] = [
  {subject: "1", type: 'Hydrogen', value: 1.0079, unit: 'H'},
  {subject: "2", type: 'Helium', value: 4.0026, unit: 'He'},
];

@Component({
  selector: 'app-body-observation',
  templateUrl: './body-observation.component.html',
  styleUrls: ['./body-observation.component.css']
})
export class BodyObservationComponent implements OnInit {
  observations: Observation[];

  constructor(private http: HttpClient) { 
    this.http.get("http://hapi.fhir.org/baseR4/Observation?_pretty=true")
    .subscribe( data => {
      console.log("aaa000",data);
      data["entry"].forEach(element => {
        console.log("aaa001",element["resource"]["id"]);
        // this.setObservation(element["resource"]);
      });
    });
  }

  setObservation(observation){
    let subject = "";
    let type = "";
    let value = 0;
    let unit = "";
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

  displayedColumns: string[] = ['subject', 'type', 'value', 'unit'];
  // dataSource = this.observations;
  dataSource = ELEMENT_DATA;

  ngOnInit() {
  }

}
