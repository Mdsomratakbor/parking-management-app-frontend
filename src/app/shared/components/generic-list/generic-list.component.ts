import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent implements AfterViewInit {
  @Input() tableHeaders: string[] = []; // Column names
  @Input() tableData: any[] = []; // Data for the table
  @Input() actions: { label: string; action: (row: any) => void }[] = []; // Action buttons

  displayedColumns: string[] = []; // Columns to display (includes actions)
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    // Initialize data source and displayed columns
    this.dataSource.data = this.tableData;
    this.displayedColumns = [...this.tableHeaders.map(h => h.toLowerCase()), ...(this.actions.length ? ['actions'] : [])];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAction(action: (row: any) => void, row: any): void {
    action(row);
  }
}
