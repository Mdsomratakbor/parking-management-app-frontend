import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-import-wizard-product-create',
  templateUrl: './import-wizard-product-create.component.html',
  styleUrl: './import-wizard-product-create.component.scss'
})
export class ImportWizardProductCreateComponent {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private productService: ProductService,
    public dialogRef: MatDialogRef<ImportWizardProductCreateComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // Step 1: Basic Information
    this.firstFormGroup = this._formBuilder.group({
      productName: ['', Validators.required],
      productCode: ['', Validators.required],
    });

    // Step 2: Price & Brand Information
    this.secondFormGroup = this._formBuilder.group({
      brand: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],  // Accept only numbers
    });

    // Step 3: Product Description
    this.thirdFormGroup = this._formBuilder.group({
      description: ['', Validators.required],
    });
  }


  onCancel(data:any){
    this.dialogRef.close({ event: "close", data });
  }
  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      const productData: Product = {
        title: this.firstFormGroup.value.productName,
        code: this.firstFormGroup.value.productCode,
        brand: this.secondFormGroup.value.brand,
        price: this.secondFormGroup.value.price,
        description: this.thirdFormGroup.value.description,
        categoryId: 1, // Assign categoryId if applicable
        subCategoryId: 1 // Assign subCategoryId if applicable
      };

      this.productService.createProduct(productData).subscribe(
        response => {
          if (response.status) {
            console.log('Product created successfully:', response.data);
            alert(response.message)
            this.onCancel(true)

          } else {
            console.error('Failed to create product:', response.message);
          }
        },
        error => {
          console.error('Error creating product:', error);
        }
      );
    } else {
      console.log('Please fill out all required fields.');
    }
  }
}
