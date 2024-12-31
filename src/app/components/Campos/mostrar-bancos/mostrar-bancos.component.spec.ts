import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarBancosComponent } from './mostrar-bancos.component';

describe('MostrarBancosComponent', () => {
  let component: MostrarBancosComponent;
  let fixture: ComponentFixture<MostrarBancosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarBancosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
