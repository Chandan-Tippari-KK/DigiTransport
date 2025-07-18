import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLoginsComponent } from './client-logins.component';

describe('ClientLoginsComponent', () => {
  let component: ClientLoginsComponent;
  let fixture: ComponentFixture<ClientLoginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLoginsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
