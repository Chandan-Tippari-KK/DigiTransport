import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedtripsComponent } from './approvedtrips.component';

describe('ApprovedtripsComponent', () => {
  let component: ApprovedtripsComponent;
  let fixture: ComponentFixture<ApprovedtripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedtripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedtripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
