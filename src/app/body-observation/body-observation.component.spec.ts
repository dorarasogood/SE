import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyObservationComponent } from './body-observation.component';

describe('BodyObservationComponent', () => {
  let component: BodyObservationComponent;
  let fixture: ComponentFixture<BodyObservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyObservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
