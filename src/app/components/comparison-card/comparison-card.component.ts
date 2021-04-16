import { Component, Input, OnInit } from '@angular/core';
import { ComparisonDataModel } from 'src/app/models/comparison-data.model';

@Component({
  selector: 'app-comparison-card',
  templateUrl: './comparison-card.component.html',
  styleUrls: ['./comparison-card.component.scss'],
})
export class ComparisonCardComponent implements OnInit {
  @Input() comparisonData: ComparisonDataModel;
  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {}

}
