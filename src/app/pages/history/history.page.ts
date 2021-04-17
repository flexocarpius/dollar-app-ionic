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

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadAllEntries());
    this.store.select(state => state.entries).subscribe(entries => {
      this.entries = entries.entries;
      this.loading = entries.loading;
      this.filteredEntries = entries.entries;
    });
  }

  ngOnInit() {

  }

  startDateChange(e) {
    if (e.detail && e.detail.value) {
      this.startDate = new Date(e.detail.value);
    }
    else {
      this.startDate = null;
    }
    this.filterEntries();
  }

  endDateChange(e) {
    if (e.detail && e.detail.value) {
      this.endDate = new Date(e.detail.value);
    }
    else {
      this.endDate = null;
    }
    this.filterEntries();
  }

  filterEntries() {
    if (this.startDate && this.endDate) {
      this.filteredEntries = this.entries.filter(e => {
        const date = new Date(e.date).valueOf();
        return date >= this.startDate.valueOf() && date < this.endDate.valueOf();
      });
    }
  }
}
