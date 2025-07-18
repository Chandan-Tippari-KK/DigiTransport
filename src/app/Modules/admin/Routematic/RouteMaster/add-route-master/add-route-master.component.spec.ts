import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRouteMasterComponent } from './add-route-master.component';

describe('AddRouteMasterComponent', () => {
  let component: AddRouteMasterComponent;
  let fixture: ComponentFixture<AddRouteMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRouteMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRouteMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
