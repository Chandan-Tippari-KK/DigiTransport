import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientofficeaddComponent } from './clientofficeadd.component';

describe('ClientofficeaddComponent', () => {
  let component: ClientofficeaddComponent;
  let fixture: ComponentFixture<ClientofficeaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientofficeaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientofficeaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
