import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StencilWrapperComponent } from './stencil-wrapper.component';

describe('StencilWrapperComponent', () => {
  let component: StencilWrapperComponent;
  let fixture: ComponentFixture<StencilWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StencilWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StencilWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
