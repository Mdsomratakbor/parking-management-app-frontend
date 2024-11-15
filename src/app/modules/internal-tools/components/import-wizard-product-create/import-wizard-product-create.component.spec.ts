import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWizardProductCreateComponent } from './import-wizard-product-create.component';

describe('ImportWizardProductCreateComponent', () => {
  let component: ImportWizardProductCreateComponent;
  let fixture: ComponentFixture<ImportWizardProductCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportWizardProductCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportWizardProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
