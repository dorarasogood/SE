import { TestBed, inject } from '@angular/core/testing';
import { BodyObservationService } from './body-observation.service';

import { HttpClientModule } from '@angular/common/http'; 
import { AuthService } from './log-in/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BodyObservationService', () => {
  let service: BodyObservationService;
  let httpMock: HttpTestingController;
  let dateRange = {
    start: "2019-12-01",
    end: "2019-12-30"
  }

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
      HttpTestingController
    ]
  }));

  beforeEach(()=>{
    service = TestBed.get(BodyObservationService);
    httpMock = TestBed.get(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('test_getAllObservation', () => {
  //   service.getAllObservation(dateRange, "all", ()=>{}, ()=>{});
  // });

  it('test_getAllObservation',
    inject([AuthService], (authService: AuthService) => {

      let result = {};
      let spy2 = spyOn(authService, 'getPatientId').and.returnValue('56899');
      service.getAllObservation(dateRange, "all", (data)=>{
        console.log("bbb000", data);
        result = data;
        console.log("bbb002", result);
      }, ()=>{});
      // expect(data.link[0].url).toEqual("http://hapi.fhir.org/baseR4/Observation?_format=json&_pretty=true&date=%3E%3D2019-12-01&date=%3C%3D2019-12-30&patient=56899");
      
      console.log("bbb001", result);

    })
  );
});
