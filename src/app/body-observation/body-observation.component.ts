import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  displayedColumns: string[] = ['subject', 'type', 'value', 'unit'];
  dataSource;

  constructor(private http: HttpClient) { 
    this.http.get("http://hapi.fhir.org/baseR4/Observation?_pretty=true")
    .subscribe( data => {
      data["entry"].forEach(element => {
        this.setObservation(element["resource"]);
      });
      this.dataSource = this.observations;
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


  ngOnInit() {
  }

}
