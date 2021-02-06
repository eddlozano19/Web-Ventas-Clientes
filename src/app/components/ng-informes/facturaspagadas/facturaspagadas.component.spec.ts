import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaspagadasComponent } from './facturaspagadas.component';

describe('FacturaspagadasComponent', () => {
  let component: FacturaspagadasComponent;
  let fixture: ComponentFixture<FacturaspagadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaspagadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaspagadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
