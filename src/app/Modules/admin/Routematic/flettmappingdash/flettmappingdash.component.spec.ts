import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlettmappingdashComponent } from './flettmappingdash.component';

describe('FlettmappingdashComponent', () => {
  let component: FlettmappingdashComponent;
  let fixture: ComponentFixture<FlettmappingdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlettmappingdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlettmappingdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
