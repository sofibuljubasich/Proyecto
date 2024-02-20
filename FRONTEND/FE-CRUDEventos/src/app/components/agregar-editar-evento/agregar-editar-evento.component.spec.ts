import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarEventoComponent } from './agregar-editar-evento.component';

describe('AgregarEditarEventoComponent', () => {
  let component: AgregarEditarEventoComponent;
  let fixture: ComponentFixture<AgregarEditarEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarEventoComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
