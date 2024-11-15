

import { Component, ViewChild } from '@angular/core';
import { ImportWizardProductCreateComponent } from '../import-wizard-product-create/import-wizard-product-create.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-product-list-without-generic',
  templateUrl: './product-list-without-generic.component.html',
  styleUrl: './product-list-without-generic.component.scss'
})
export class ProductListWithoutGenericComponent {
  displayedColumns: string[] = ['title', 'code', 'brand', 'price', 'description', 'createdAt',  'isDeleted', 'actions'];
  items: any[] = [];
  dataSource = new MatTableDataSource<Product>();
  pageSize: number = 5;
  totalCount: number = 0;
  currentPage: number = 1;
  titleFilter!: string;
  brandFilter!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private languageService: LanguageService
  ) {}
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.titleFilter || '', this.brandFilter || '', this.currentPage, this.pageSize)
      .subscribe(response => {
        console.log(response);
        this.dataSource.data = response.data.products;
        this.totalCount = response.data.totalCount;
        this.updatePaginatedDataSource();

      });
  }

  onPaginateChange(event: any) {
    console.log(`Page Index: ${event.pageIndex}, Page Size: ${event.pageSize}`);
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadProducts();
  }

  updatePaginatedDataSource() {

      this.paginator.length = this.totalCount;
      this.paginator.pageIndex = this.currentPage - 1;

  }
changeLanguage(lang: any) {
  this.languageService.setLanguage(lang);
}

  editItem(item: any) {

  }

  deleteItem(item: any) {
  }
  getTranslation(key: any): string {
    return this.languageService.getTranslation(key);
  }
  openTaskCreateWindow() {

    const dialogRef = this.dialog.open(ImportWizardProductCreateComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '60%',
      width: '60%',
      panelClass: 'full-screen-modal'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
        window.location.reload()
      } else {
        console.log("not export", result);
      }
    });
  }
}
