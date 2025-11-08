import { TestBed } from '@angular/core/testing';

import { StencilWrapperService } from './stencil-wrapper.service';

describe('StencilWrapperService', () => {
  let service: StencilWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StencilWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
