// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
// import { GenericListComponent } from './generic-list.component';
// import { of } from 'rxjs';

// class MockMyService {
//   getData(page: number, pageSize: number) {
//     // Mock implementation returning dummy data
//     return of({
//       data: [{ id: 1, name: 'Test Item' }, { id: 2, name: 'Another Item' }],
//       totalCount: 2
//     });
//   }
// }

// describe('GenericListComponent', () => {
//   let component: GenericListComponent<any>;
//   let fixture: ComponentFixture<GenericListComponent<any>>;
//   let myService: any;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [GenericListComponent],
//       providers: [
//         { provide: MyService, useClass: MockMyService } // Use the mock service
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(GenericListComponent);
//     component = fixture.componentInstance;
//     myService = TestBed.inject(MyService); // Get the mocked service
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load data on init', () => {
//     // Call ngAfterViewInit manually since we want to test the data loading
//     component.ngAfterViewInit();
//     expect(component.dataSource.data.length).toBe(2); // Check if data loaded correctly
//     expect(component.totalCount).toBe(2); // Check total count
//   });

//   it('should update paginator length and pageIndex after data load', () => {
//     component.ngAfterViewInit(); // Simulate loading data
//     expect(component.paginator.length).toBe(2); // Check paginator length
//     expect(component.paginator.pageIndex).toBe(0); // Check page index (0-based)
//   });

//   it('should change page and load data again', () => {
//     spyOn(component, 'loadData').and.callThrough(); // Spy on loadData method
//     component.onPaginateChange({ pageIndex: 1, pageSize: 5 }); // Simulate page change
//     expect(component.loadData).toHaveBeenCalled(); // Check if loadData was called
//     expect(component.currentPage).toBe(2); // Verify current page is updated
//   });
// });
