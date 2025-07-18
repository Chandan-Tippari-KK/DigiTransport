import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGuardDashComponent } from './security-guard-dash.component';

describe('SecurityGuardDashComponent', () => {
  let component: SecurityGuardDashComponent;
  let fixture: ComponentFixture<SecurityGuardDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityGuardDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityGuardDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
