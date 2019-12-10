import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BodyObservationService } from '../body-observation.service';

export interface DialogData {
    item: string;
    unit: string;
}

@Component({
    selector: 'observation-item-detail',
    templateUrl: './observation-item-detail.html',
})

export class ObservationItemDetailDialog implements OnInit {
    value: string;
    unit: string;

    
    ngOnInit() {}
}