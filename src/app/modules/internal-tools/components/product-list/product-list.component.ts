import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { LanguageService } from '../../services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { ImportWizardProductCreateComponent } from '../import-wizard-product-create/import-wizard-product-create.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'code', 'brand', 'price', 'description', 'createdAt', 'isDeleted', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  totalCount: number = 0;
  currentPage: number = 1;
  titleFilter!: string;
  brandFilter!: string;
  pageTitle:string = "CreateNewItem";
  constructor(private productService: ProductService, private dialog: MatDialog, private languageService: LanguageService) {}

  ngOnInit() {
    this.loadProducts();
  }
  openDialog(component =ImportWizardProductCreateComponent, data?: any) {
    const dialogRef = this.dialog.open(component, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '60%',
      width: '60%',
      panelClass: 'full-screen-modal',
      data
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
        window.location.reload()
      } else {
        console.log("not export", result);
      }
    });
  }
  loadProducts() {
    this.productService.getProducts(this.titleFilter || '', this.brandFilter || '', this.currentPage, 5)
      .subscribe(response => {
        this.dataSource.data = response.data.products;
        this.totalCount = response.data.totalCount;
      });
  }

  editItem(item: Product) {
    // Implement edit functionality
  }

  deleteItem(item: Product) {
    // Implement delete functionality
  }

  changeLanguage(lang: any) {
    this.languageService.setLanguage(lang);
  }

  getTranslation(key: any): string {
    return this.languageService.getTranslation(key);
  }
  onDataChange(event: { page: number; title: string; brand: string }) {
    this.currentPage = event.page;
    this.titleFilter = event.title;
    this.brandFilter = event.brand;
    this.loadProducts(); // Reload data based on the new parameters
  }
  onFilterChange() {
    // When the filter changes, reset to the first page and reload data
    this.currentPage = 1; // Reset to first page on filter change
    this.loadProducts();
  }
}
