import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlettmappingdashaddComponent } from './flettmappingdashadd.component';

describe('FlettmappingdashaddComponent', () => {
  let component: FlettmappingdashaddComponent;
  let fixture: ComponentFixture<FlettmappingdashaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlettmappingdashaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlettmappingdashaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
