import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMasterDashboardComponent } from './area-master-dashboard.component';

describe('AreaMasterDashboardComponent', () => {
  let component: AreaMasterDashboardComponent;
  let fixture: ComponentFixture<AreaMasterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaMasterDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaMasterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
