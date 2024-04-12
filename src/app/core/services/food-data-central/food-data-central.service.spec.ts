import { TestBed } from '@angular/core/testing';

import { FoodDataCentralService } from './food-data-central.service';

describe('FoodDataCentralService', () => {
  let service: FoodDataCentralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodDataCentralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
