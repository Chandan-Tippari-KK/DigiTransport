import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAreaMasterComponent } from './add-area-master.component';

describe('AddAreaMasterComponent', () => {
  let component: AddAreaMasterComponent;
  let fixture: ComponentFixture<AddAreaMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAreaMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAreaMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
