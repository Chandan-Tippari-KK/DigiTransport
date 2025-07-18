import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMasterDashboardComponent } from './route-master-dashboard.component';

describe('RouteMasterDashboardComponent', () => {
  let component: RouteMasterDashboardComponent;
  let fixture: ComponentFixture<RouteMasterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteMasterDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteMasterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
