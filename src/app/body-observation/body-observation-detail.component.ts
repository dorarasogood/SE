import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface DialogData {
    value: number;
    unit: string;
}

export interface Food {
    value: string;
    viewValue: string;  
}

@Component({
    selector: 'body-observation-detail',
    templateUrl: './body-observation-detail.html',
  })

export class DialogOverviewExampleDialog implements OnInit {
    value: number;
    unit: string;

    foods: Food[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData, 
      private http: HttpClient) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    onOkClick(): void {
        let headers = new HttpHeaders({
            'Content-Type': 'text/json'
        });
        let options = {
            headers
        };

        let body = JSON.stringify({
                "resourceType": "Observation",
                "subject": {
                  "reference": "Patient/56899"
                },
                "valueQuantity": {
                  "value": 70,
                  "unit": "kg"
                }
        });

        this.http.post<any>("http://hapi.fhir.org/baseR4/Observation?_format=json&_pretty=true", body, options)
        .subscribe((data)=>{
            console.log("data", data);
            this.dialogRef.close(data.id);
        });
    }

    ngOnInit() {}
}