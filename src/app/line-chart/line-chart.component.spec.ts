import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';

import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http'; 
import {MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from "ng2-charts";
import { NgModule } from '@angular/core';

import { BodyObservationService } from '../body-observation.service';
import { CarePlanService } from "../care-plan/care-plan.service";
import { SeLineChartComponent } from "../se-line-chart/se-line-chart.component";

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

var allCarePlanData = {
  "resourceType": "Bundle",
  "id": "41cf2aff-9ba4-4139-b1cc-351c2ee610cc",
  "meta": {
    "lastUpdated": "2019-12-22T02:37:35.170+00:00"
  },
  "type": "searchset",
  "total": 3,
  "link": [
    {
      "relation": "self",
      "url": "http://hapi.fhir.org/baseR4/Goal?_format=json&_pretty=true&patient=56899"
    }
  ],
  "entry": [
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Goal/579963",
      "resource": {
        "resourceType": "Goal",
        "id": "579963",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2019-12-20T10:42:48.664+00:00",
          "source": "#TC8ie63kvviLINoO"
        },
        "description": {
          "text": "diet plan"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "target": [
          {
            "detailQuantity": {
              "value": 75
            }
          }
        ],
        "outcomeReference": [
          {
            "reference": "Observation/249507"
          }
        ]
      },
      "search": {
        "mode": "match"
      }
    },
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Goal/579964",
      "resource": {
        "resourceType": "Goal",
        "id": "579964",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2019-12-20T10:44:01.110+00:00",
          "source": "#fl79dG1IxmFyl1iz"
        },
        "description": {
          "text": "test plan"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "target": [
          {
            "detailQuantity": {
              "value": 120
            }
          }
        ],
        "outcomeReference": [
          {
            "reference": "Observation/249628"
          }
        ]
      },
      "search": {
        "mode": "match"
      }
    },
    {
      "fullUrl": "http://hapi.fhir.org/baseR4/Goal/579965",
      "resource": {
        "resourceType": "Goal",
        "id": "579965",
        "meta": {
          "versionId": "1",
          "lastUpdated": "2019-12-20T10:45:07.427+00:00",
          "source": "#LqmPlgs4eRwEjuBs"
        },
        "description": {
          "text": "height record"
        },
        "subject": {
          "reference": "Patient/56899"
        },
        "target": [
          {
            "detailQuantity": {
              "value": 170
            }
          }
        ],
        "outcomeReference": [
          {
            "reference": "Observation/251353"
          }
        ]
      },
      "search": {
        "mode": "match"
      }
    }
  ]
}

@NgModule({
  declarations: [SeLineChartComponent],
  imports: [
    ChartsModule
    // FormsModule,
    // MatFormFieldModule,
    // MatSelectModule,
    // BrowserModule
  ],
  entryComponents: [
    SeLineChartComponent,
  ]
})
class TestModuleSeLineChartComponent {}

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartComponent ],
      imports: [
        FormsModule,
        NgxChartsModule,
        NgxDaterangepickerMd.forRoot({
          // separator: '-',
          cancelLabel: 'Cancel',
          applyLabel: 'Apply'
        }),
        MatFormFieldModule,
        MatSelectModule,
        HttpClientModule,
        MatInputModule,
        BrowserAnimationsModule,
        ChartsModule,
        TestModuleSeLineChartComponent
      ]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LineChartComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(inject([CarePlanService, BodyObservationService], (carePlanService: CarePlanService, bodyObservationService: BodyObservationService) => {
    // let spy = spyOn(bodyObservationService, 'getAllObservationItem').and.callFake((successCallback, failureCallback) => {
    //     successCallback(allObservationItemData);
    //     failureCallback('test');
    // });
    let spy2 = spyOn(carePlanService, 'getAllCarePlan').and.callFake((successCallback, failureCallback) => {
      successCallback(allCarePlanData);
      failureCallback('test');
    });
    // let spy3 = spyOn(bodyObservationService, 'getAllObservation').and.callFake((dateRange, itemType, successCallback, failureCallback) => {
    //   successCallback(allObservationData);
    //   failureCallback('test');
    // });

    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
