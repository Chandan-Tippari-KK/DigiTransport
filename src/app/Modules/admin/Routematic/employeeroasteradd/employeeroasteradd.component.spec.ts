import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeroasteraddComponent } from './employeeroasteradd.component';

describe('EmployeeroasteraddComponent', () => {
  let component: EmployeeroasteraddComponent;
  let fixture: ComponentFixture<EmployeeroasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeroasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeroasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
