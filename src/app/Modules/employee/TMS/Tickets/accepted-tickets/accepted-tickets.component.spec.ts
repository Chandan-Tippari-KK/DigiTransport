import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedTicketsComponent } from './accepted-tickets.component';

describe('AcceptedTicketsComponent', () => {
  let component: AcceptedTicketsComponent;
  let fixture: ComponentFixture<AcceptedTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
