import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutetrackingComponent } from './routetracking.component';

describe('RoutetrackingComponent', () => {
  let component: RoutetrackingComponent;
  let fixture: ComponentFixture<RoutetrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutetrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutetrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
