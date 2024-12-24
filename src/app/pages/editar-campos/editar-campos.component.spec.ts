import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCamposComponent } from './editar-campos.component';

describe('EditarCamposComponent', () => {
  let component: EditarCamposComponent;
  let fixture: ComponentFixture<EditarCamposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCamposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
