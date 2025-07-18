import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGuardFormComponent } from './security-guard-form.component';

describe('SecurityGuardFormComponent', () => {
  let component: SecurityGuardFormComponent;
  let fixture: ComponentFixture<SecurityGuardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityGuardFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityGuardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
