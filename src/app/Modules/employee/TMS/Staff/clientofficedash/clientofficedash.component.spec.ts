import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientofficedashComponent } from './clientofficedash.component';

describe('ClientofficedashComponent', () => {
  let component: ClientofficedashComponent;
  let fixture: ComponentFixture<ClientofficedashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientofficedashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientofficedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
