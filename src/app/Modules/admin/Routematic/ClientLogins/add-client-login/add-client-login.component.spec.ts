import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientLoginComponent } from './add-client-login.component';

describe('AddClientLoginComponent', () => {
  let component: AddClientLoginComponent;
  let fixture: ComponentFixture<AddClientLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
