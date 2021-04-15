import { Component, OnInit } from '@angular/core';
import { EntryModel } from 'src/app/models/entry.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  data: EntryModel[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAllData().subscribe((data: EntryModel[]) => {
      this.data = data;
    });
  }

}
