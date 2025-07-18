import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeroasterdashComponent } from './employeeroasterdash.component';

describe('EmployeeroasterdashComponent', () => {
  let component: EmployeeroasterdashComponent;
  let fixture: ComponentFixture<EmployeeroasterdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeroasterdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeroasterdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
