import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEventoComponent } from './ver-evento.component';

describe('VerEventoComponent', () => {
  let component: VerEventoComponent;
  let fixture: ComponentFixture<VerEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerEventoComponent]
    });
    fixture = TestBed.createComponent(VerEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
