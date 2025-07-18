import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtripdeatilsComponent } from './addtripdeatils.component';

describe('AddtripdeatilsComponent', () => {
  let component: AddtripdeatilsComponent;
  let fixture: ComponentFixture<AddtripdeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtripdeatilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtripdeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
