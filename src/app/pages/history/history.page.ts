import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadAllEntries());
    this.entries$ = this.store.select(state => state.entries.entries);
  }

  ngOnInit() {
    
  }

}
