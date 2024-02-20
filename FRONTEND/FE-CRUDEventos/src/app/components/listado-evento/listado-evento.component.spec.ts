import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEventoComponent } from './listado-evento.component';

describe('ListadoEventoComponent', () => {
  let component: ListadoEventoComponent;
  let fixture: ComponentFixture<ListadoEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoEventoComponent]
    });
    fixture = TestBed.createComponent(ListadoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
