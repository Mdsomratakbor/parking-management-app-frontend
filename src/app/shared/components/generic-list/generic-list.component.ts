import { Component, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LanguageService } from '../../../modules/internal-tools/services/language.service';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent<T> implements OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  @Input() pageSizeOptions: number[] = [5, 10, 25];
  @Input() totalCount: number = 0;
  @Input() currentPage: number = 1;
  @Input() titleFilter!: string;
  @Input() brandFilter!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Create an Output event emitter
  @Output() dataChange: EventEmitter<{ page: number; title: string; brand: string }> = new EventEmitter();

  constructor(private dialog: MatDialog, private languageService: LanguageService) {}

  ngOnInit() {
    this.updatePaginatedDataSource();
  }

  ngAfterViewInit() {
    this.updatePaginatedDataSource();
  }

  updatePaginatedDataSource() {
    if (this.paginator) {
      this.paginator.length = this.totalCount;
      this.paginator.pageIndex = this.currentPage - 1;
    } else {
      console.error('Paginator is not initialized');
    }
  }

  onPaginateChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.loadFilteredData(); // Call method to load filtered data
    this.emitDataChange(); // Emit the data change event
  }

  loadFilteredData() {
    // This can be modified to filter data as needed
    return this.dataSource.data;
  }

  emitDataChange() {
    this.dataChange.emit({ page: this.currentPage, title: this.titleFilter, brand: this.brandFilter });
  }

  changeLanguage(lang: any) {
    this.languageService.setLanguage(lang);
  }

  getTranslation(key: any): string {
    return this.languageService.getTranslation(key);
  }

  openDialog(component: any, data?: any) {
    const dialogRef = this.dialog.open(component, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '60%',
      width: '60%',
      panelClass: 'full-screen-modal',
      data
    });
    return dialogRef.afterClosed();
  }
}
