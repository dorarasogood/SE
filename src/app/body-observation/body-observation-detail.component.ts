import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BodyObservationService } from '../body-observation.service';
import * as moment from 'moment';
import item from './item'
// import {FormControl} from '@angular/forms';


export interface DialogData {
    itemOption: item[];
    id: number;
}
export interface Unit {
  value: string;
}

@Component({
    selector: 'body-observation-detail',
    templateUrl: './body-observation-detail.html',
  })

export class BodyObservationDetailDialog implements OnInit {
    value: number;
    unit: string;
    title: string;
    date: Date;
    selectedType: string;
    
    itemOption: item[] = [];

    constructor(
      public dialogRef: MatDialogRef<BodyObservationDetailDialog>,
      @Inject(MAT_DIALOG_DATA) public dialogdata:DialogData, 
      private bodyObservationService: BodyObservationService) {
        console.log("data = ", this.dialogdata.id);
        this.itemOption = this.dialogdata.itemOption;
        if(this.dialogdata.id == null){
          this.title = "Create new observation";
          this.date = new Date();
        }else{
          this.title = "Edit observation";
          bodyObservationService.getObservation(this.dialogdata.id, result =>{
            if(result.hasOwnProperty("entry")){
              let data = result["entry"][0]["resource"];
              if(data.hasOwnProperty("valueQuantity")){
                if(data["valueQuantity"].hasOwnProperty("value"))
                  this.value = data["valueQuantity"]["value"];
                // if(data["valueQuantity"].hasOwnProperty("unit"))
                  // this.unit = data["valueQuantity"]["unit"];
              }
              console.log("item", this.itemOption);
              // this.selectedType = this.itemOption[this.dialogdata.id].type;

              if(data.hasOwnProperty("effectiveDateTime")){
                this.date = new Date(data["effectiveDateTime"]);
              }

              if(data.hasOwnProperty("derivedFrom")){
                let itemType = data["derivedFrom"][0]["reference"].split('/')[1];
                console.log("aaaa008", itemType, this.itemOption);
                this.selectedType = itemType;
              } 
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

      let dateString = moment(this.date).format("YYYY-MM-DD");

      
      var body:iBody ={
        "resourceType": "Observation",
        "subject": {
          "reference": "Patient/56899"
        },
        "valueQuantity": {
          "value": this.value,
          "unit": this.unit
        },
        "effectiveDateTime": dateString
      };
      if (this.dialogdata.id!= undefined){
        body.id = this.dialogdata.id;
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
      console.log("aaa123", body);
      this.bodyObservationService.editObservation(this.dialogdata.id, body, data=>{
        
        this.dialogRef.close(data);
      }, error=>{
        console.log("error = ", error);
      });
    }

    getUnit(): string {
      let unit = '';
      this.itemOption.forEach((element)=>{
        if(this.selectedType == element.id){
          unit = element.unit;
          this.unit = element.unit;
        }
      })
      return unit;
    }
    ngOnInit() {}
}