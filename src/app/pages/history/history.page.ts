import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { EntryModel } from '../../models/entry.model';
import { loadAllEntries } from '../../store/actions/entries.actions';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  entries$: Observable<EntryModel[]>;
  entries: EntryModel[];
  filteredEntries: EntryModel[];
  loading: boolean = true;
  startDate: Date;
  endDate: Date;
  defaultStartDate: string;
  defaultEndDate: string;

  constructor(private store: Store<AppState>) {
    // Set default start and end date
    let defaultStartDate = new Date();
    defaultStartDate.setMonth(0);
    defaultStartDate.setDate(1);
    defaultStartDate.setHours(0);
    defaultStartDate.setMinutes(0);
    defaultStartDate.setSeconds(0);
    this.defaultStartDate = defaultStartDate.toISOString();
    this.defaultEndDate = new Date().toISOString();
    this.startDate = defaultStartDate;
    this.endDate = new Date();

    // Set for the filters
    this.setStartDate(new Date(this.defaultStartDate));
    this.setEndDate(new Date(this.defaultEndDate));

    this.store.select(state => state.entries).subscribe(entries => {
      this.entries = entries.entries;
      this.loading = entries.loading;
      if (entries.loading === false) {
        this.filterEntries();
      }
    });
    this.store.dispatch(loadAllEntries());
  }

  ngOnInit() {
    
  }

  startDateChange(e) {
    this.setStartDate(new Date(e.detail.value));
    this.filterEntries();
  }

  setStartDate(date: Date) {
    if (date) {
      let startDate = date;
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      startDate.setMilliseconds(0);
      this.startDate = startDate;
    }
    else {
      this.startDate = null;
    }
  }

  endDateChange(e) {
    this.setEndDate(new Date(e.detail.value));
    this.filterEntries();
  }

  setEndDate(date: Date) {
    if (date) {
      let endDate = date;
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);
      endDate.setMilliseconds(0);
      this.endDate = endDate;
    }
    else {
      this.endDate = null;
    }
  }

  filterEntries() {
    if (this.startDate && this.endDate && this.entries) {
      this.filteredEntries = this.entries.filter(e => {
        const date = new Date(e.date).valueOf();
        return date >= this.startDate.valueOf() && date < this.endDate.valueOf();
      });
    }
  }
}
