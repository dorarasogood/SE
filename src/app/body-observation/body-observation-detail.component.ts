import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BodyObservationService } from '../body-observation.service';


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

export class BodyObservationDetailDialog implements OnInit {
    value: number;
    unit: string;
    title: string;

    foods: Food[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];
  
    constructor(
      public dialogRef: MatDialogRef<BodyObservationDetailDialog>,
      @Inject(MAT_DIALOG_DATA) public id: DialogData, 
      private bodyObservationService: BodyObservationService) {
        console.log("data = ", this.id);
        if(this.id == null){
          this.title = "Create new observation";
        }else{
          this.title = "Edit observation";
          bodyObservationService.getObservation(this.id, data =>{
            if(data.hasOwnProperty("valueQuantity")){
              if(data["valueQuantity"].hasOwnProperty("value"))
                this.value = data["valueQuantity"]["value"];
              if(data["valueQuantity"].hasOwnProperty("unit"))
                this.unit = data["valueQuantity"]["unit"];
            }
          },error=>{
            console.log("error = ", error)
          });
        }
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    private httpBody(): string {
      interface iBody {
        [key: string]: any
      }
      var body:iBody ={
        "resourceType": "Observation",
        "subject": {
          "reference": "Patient/56899"
        },
        "valueQuantity": {
          "value": this.value,
          "unit": this.unit
        }
      };
      if (this.id!= undefined){
        body.id = this.id;
      }
      return JSON.stringify(body);
    }

    onOkClick(): void {
        let body = this.httpBody();
        this.bodyObservationService.createObservation(body, data=>{
            console.log("data", data);
            this.dialogRef.close(data.id);
        }, error=>{
          console.log("error = ", error);
        });
    }
    onUpdateClick(): void {
      let body = this.httpBody();
      this.bodyObservationService.editObservation(this.id, body, data=>{
        
        this.dialogRef.close(data);
      }, error=>{
        console.log("error = ", error);
      });
    }

    ngOnInit() {}
}