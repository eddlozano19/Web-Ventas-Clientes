import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdocuentaComponent } from './edocuenta.component';

describe('EdocuentaComponent', () => {
  let component: EdocuentaComponent;
  let fixture: ComponentFixture<EdocuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdocuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdocuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
