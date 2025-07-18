import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedtripsComponent } from './assignedtrips.component';

describe('AssignedtripsComponent', () => {
  let component: AssignedtripsComponent;
  let fixture: ComponentFixture<AssignedtripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedtripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedtripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
