import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfleetComponent } from './addfleet.component';

describe('AddfleetComponent', () => {
  let component: AddfleetComponent;
  let fixture: ComponentFixture<AddfleetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfleetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
