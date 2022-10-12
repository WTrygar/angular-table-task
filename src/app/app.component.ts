import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'blog';
  rows!: any[];
  filteredRows!: any[];
  headers = [
    'WO ID',
    'Description',
    'Received date',
    'Assigned to',
    'Status',
    'Priority',
  ];
 
  searchControl: FormControl = new FormControl('');
 
  constructor(private _http: HttpClient) {}
 
  ngOnInit(): void {
    this._http
      .get('assets/data.json')
      .pipe(map((data) => (data as any).response.data))
      .subscribe((result) => {
        this.rows = result;
        this.handleSearchChanges();
      });
  }
 
  handleSearchChanges(): void {
    this.searchControl.valueChanges
      .pipe(startWith(''))
      .subscribe((query) => this.filterListElements(query));
  }
 
  filterListElements(query: string): void {
    query = query.toLowerCase();
 
    this.filteredRows = this.rows.filter(
      (el) => el.description.toLowerCase().indexOf(query) !== -1
    );
  }
}