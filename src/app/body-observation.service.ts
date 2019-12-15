import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './log-in/auth.service'

@Injectable({
  providedIn: 'root'
})
export class BodyObservationService {
  

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllObservation(dateRange, itemType, successCallback, failureCallback){
    let url = "http://hapi.fhir.org/baseR4/Observation?patient=";
    url = url + this.authService.getPatientId();
    if(dateRange.start === dateRange.end){
      url = url + "&date=" + dateRange.start;
    }else{      
      url = url + "&date=>=" + dateRange.start + "&date=<=" + dateRange.end;
    }

    if(itemType != "all")
      url = url + "&derived-from=" + itemType;

    url = url +"&_pretty=true&_format=json";

    this.http.get(url).subscribe(successCallback, failureCallback);
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
    body.subject = {
      "reference": "Patient/" + this.authService.getPatientId()
    };
    body = JSON.stringify(body);
    this.http.post<any>("http://hapi.fhir.org/baseR4/Observation?_format=json&_pretty=true", body, options)
    .subscribe(successCallback, failureCallback);
  }
  editObservation(id, body, successCallback, failureCallback){
    let headers = new HttpHeaders({
      "Accept": "application/fhir+json;q=1.0, application/json+fhir;q=0.9",
      "Content-Type": "application/fhir+json; charset=UTF-8"
    });
    let options = {
      headers
    };
    body.subject = {
      "reference": "Patient/" + this.authService.getPatientId()
    };
    body = JSON.stringify(body);
    this.http.put<any>("http://hapi.fhir.org/baseR4/Observation/" + id + "?_format=json&_pretty=true", body, options)
    .subscribe(successCallback, failureCallback);
  }

  getAllObservationItem(successCallback, failureCallback){
    let urlPrefix = "http://hapi.fhir.org/baseR4/Observation?";
    let url = urlPrefix + "patient=" + this.authService.getPatientId() + "&code=unit&_pretty=true";
    this.http.get(url)
      .subscribe(successCallback, failureCallback);
  }
}
