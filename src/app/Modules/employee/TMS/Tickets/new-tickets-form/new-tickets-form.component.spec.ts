import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTicketsFormComponent } from './new-tickets-form.component';

describe('NewTicketsFormComponent', () => {
  let component: NewTicketsFormComponent;
  let fixture: ComponentFixture<NewTicketsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTicketsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTicketsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
