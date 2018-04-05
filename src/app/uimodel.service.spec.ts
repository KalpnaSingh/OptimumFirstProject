import { TestBed, inject } from '@angular/core/testing';

import { UimodelService } from './uimodel.service';

describe('UimodelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UimodelService]
    });
  });

  it('should be created', inject([UimodelService], (service: UimodelService) => {
    expect(service).toBeTruthy();
  }));
});
