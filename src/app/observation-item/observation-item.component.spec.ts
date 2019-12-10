import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationItemComponent } from './observation-item.component';

describe('ObservationItemComponent', () => {
  let component: ObservationItemComponent;
  let fixture: ComponentFixture<ObservationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
