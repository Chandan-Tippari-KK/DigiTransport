import { TestBed } from '@angular/core/testing';

import { DigiofficecorehrService } from './TMS.service';

describe('DigiofficecorehrService', () => {
  let service: DigiofficecorehrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigiofficecorehrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
