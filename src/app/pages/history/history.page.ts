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
  selected: {startDate: Moment, endDate: Moment};
  loading: boolean = true;

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

  datesUpdated(dateRange: { startDate: Moment, endDate: Moment }) {
    this.selected = dateRange;
    if(this.entries && this.entries.length > 0 && dateRange.startDate && dateRange.endDate) {
      this.filteredEntries = this.entries.filter(e => {
        const date = new Date(e.date).valueOf() / 1000;
        return date >= dateRange.startDate.unix() && date < dateRange.endDate.unix();
      });
    }
  }
}
