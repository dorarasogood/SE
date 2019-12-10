import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BodyObservationService {

  constructor(private http: HttpClient) { }

  getAllObservation(dateRange, successCallback, failureCallback){
    console.log("AAA000", dateRange);
    if(dateRange.start === dateRange.end){
      this.http.get("http://hapi.fhir.org/baseR4/Observation?patient=56899&date=" + dateRange.start + "&_pretty=true&_format=json")
      .subscribe(successCallback, failureCallback);
    }else{      
      this.http.get("http://hapi.fhir.org/baseR4/Observation?patient=56899&date=>=" + dateRange.start + "&date=<=" + dateRange.end +"&_pretty=true&_format=json")
      .subscribe(successCallback, failureCallback);
    }
  }
  deleteObservation(id, successCallback, failureCallback){
    this.http.delete("http://hapi.fhir.org/baseR4/Observation/" + id + "?_pretty=true")
    .subscribe(successCallback, failureCallback);
  };
  getObservation(id, successCallback, failureCallback){
    this.http.get("http://hapi.fhir.org/baseR4/Observation?_id=" + id + "&_pretty=true")
    .subscribe(successCallback, failureCallback);
  }
  createObservation(body, successCallback, failureCallback){
    let headers = new HttpHeaders({
      'Content-Type': 'text/json'
    });
    let options = {
      headers
    };
    this.http.post<any>("http://hapi.fhir.org/baseR4/Observation?_format=json&_pretty=true", body, options)
    .subscribe(successCallback, failureCallback);
  }
  editObservation(id, body, successCallback, failureCallback){
    console.log("id = ", id, body);
    let headers = new HttpHeaders({
      "Accept": "application/fhir+json;q=1.0, application/json+fhir;q=0.9",
      "Content-Type": "application/fhir+json; charset=UTF-8"
    });
    let options = {
      headers
    };
    this.http.put<any>("http://hapi.fhir.org/baseR4/Observation/" + id + "?_format=json&_pretty=true", body, options)
    .subscribe(successCallback, failureCallback);
  }

  getAllObservationItem(successCallback, failureCallback){
    
  }
}
