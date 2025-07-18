import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmmapComponent } from './agmmap.component';

describe('AgmmapComponent', () => {
  let component: AgmmapComponent;
  let fixture: ComponentFixture<AgmmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgmmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgmmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
