import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListWithoutGenericComponent } from './product-list-without-generic.component';

describe('ProductListWithoutGenericComponent', () => {
  let component: ProductListWithoutGenericComponent;
  let fixture: ComponentFixture<ProductListWithoutGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListWithoutGenericComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListWithoutGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
