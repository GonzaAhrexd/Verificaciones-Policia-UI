import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarNumeradorComponent } from './mostrar-numerador.component';

describe('MostrarNumeradorComponent', () => {
  let component: MostrarNumeradorComponent;
  let fixture: ComponentFixture<MostrarNumeradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarNumeradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarNumeradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
