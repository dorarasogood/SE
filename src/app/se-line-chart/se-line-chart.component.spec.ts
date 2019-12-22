import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeLineChartComponent } from './se-line-chart.component';

import { ChartsModule } from "ng2-charts";

describe('SeLineChartComponent', () => {
  let component: SeLineChartComponent;
  let fixture: ComponentFixture<SeLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeLineChartComponent ],
      imports: [
        ChartsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
